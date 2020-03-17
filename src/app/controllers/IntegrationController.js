const axios = require('axios').default;
const { format, parseISO } = require('date-fns');
const Opportunities = require('../../models/Opportunities');
const helpers = require('../../lib/helpers');

class IntegrationController {
  async store(req, res) {
    // Recupera as oportunidades com status igual a ganho (won) no Pipedrive
    const { data: deals } = await axios.get(
      `https://${process.env.PIPEDRIVE_COMPANY}.pipedrive.com/v1/deals?api_token=${process.env.PIPEDRIVE_TOKEN}&status=won`
    );

    // Insere as oportunidades ganhas como pedido no Bling
    const orders = await Promise.all(
      deals.data.flatMap(async order => {
        const xml = helpers.makeXML(order);
        const params = new URLSearchParams();
        params.append('apikey', process.env.BLING_TOKEN);
        params.append('xml', xml);
        const { data } = await axios.post(
          'https://bling.com.br/Api/v2/pedido/json/',
          params,
          {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        );
        return data.retorno.pedidos;
      })
    );

    const ordersFlat = orders.flat();

    // Grava os dados consolidados no banco
    ordersFlat.forEach(async order => {
      const number = order.pedido.numero;
      const { data: retrivedOrder } = await axios.get(
        `https://bling.com.br/Api/v2/pedido/${number}/json&apikey=${process.env.BLING_TOKEN}`
      );

      const retrivedOrderPedido = retrivedOrder.retorno.pedidos[0].pedido;
      const formatedDate = format(
        parseISO(retrivedOrderPedido.data),
        'yyyy-MM-dd'
      );

      await Opportunities.create({
        date: formatedDate,
        value: retrivedOrderPedido.totalvenda,
      });
    });

    return res.json({ total: orders.length });
  }

  async list(req, res) {
    const opportunities = await Opportunities.aggregate([
      {
        $group: {
          _id: { date: '$date' },
          total: {
            $sum: '$value',
          },
        },
      },
    ]);
    return res.json({
      data: opportunities[0]._id.date,
      valorTotal: opportunities[0].total,
    });
  }
}

module.exports = new IntegrationController();
