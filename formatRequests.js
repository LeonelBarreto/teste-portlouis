const leituraPedidos = require('./readRequests')

function formatacaoDePedidos(){
	const lerPedidos = leituraPedidos();
	let todosOsItensDoPedido = [];

	for (const pedidos of lerPedidos) {
		for (const pedido of pedidos.data) {
			const itensDoPedido = {
				id_pedido: pedidos.id,
				item: {
					número_item: pedido.número_item,
					saldo_quantidade: pedido.quantidade_produto,
					valor_unitário_produto: Number(pedido.valor_unitário_produto.replace(',', '.')),
					valor_total_produto: Number(pedido.valor_unitário_produto.replace(',', '.')) * pedido.quantidade_produto,
				},			
			};
			todosOsItensDoPedido.push(itensDoPedido);
		};
	};
	
	return todosOsItensDoPedido;
};
//console.log(formatacaoDePedidos());

module.exports = formatacaoDePedidos;