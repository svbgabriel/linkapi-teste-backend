const axios = require('axios').default;
const helpers = require('../../lib/helpers');

class IntegrationController {
  async store(req, res) {
    // Recupera as oportunidades com status igual a ganho (won) no Pipedrive
    const { data: deals } = await axios.get(
      `https://${process.env.PIPEDRIVE_COMPANY}.pipedrive.com/v1/deals?api_token=${process.env.PIPEDRIVE_TOKEN}&status=won`
    );

    // Insere as oportunidades ganhas como pedido no Bling
    const orders = await Promise.all(
      deals.data.map(async order => {
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
        return data;
      })
    );

    return res.json({ total: orders.length });
  }
}

module.exports = new IntegrationController();
