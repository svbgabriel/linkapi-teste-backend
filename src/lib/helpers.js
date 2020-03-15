module.exports = {
  makeXML(order) {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <pedido>
        <cliente>
            <nome>${order.org_name}</nome>
            <data>${order.won_time}</data>
        </cliente>
        <itens>
          <item>
              <codigo>001</codigo>
              <descricao>${order.title}</descricao>
              <un>un</un>
              <qtde>1</qtde>
              <vlr_unit>${order.value}</vlr_unit>
          </item>
        </itens>
    </pedido>
    `;
  },
};
