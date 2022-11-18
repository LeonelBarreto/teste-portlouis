const todasNotas = require('./readNotes.js');
const formatacaoDePedidos = require('./formatRequests');

function pedidosPendentes(){
	
    const leituraNotas = todasNotas();
	let todosOsItensDoPedido = formatacaoDePedidos();
	
	for (const notas of leituraNotas) {
		for (const nota of notas.data) {
			const procurarItemId = todosOsItensDoPedido.find((item) => {
			    return (item.item.número_item === nota.número_item && item.id_pedido === nota.id_pedido);
		    });
            
			if (procurarItemId) {
			procurarItemId.item.saldo_quantidade -= nota.quantidade_produto;
			procurarItemId.item.valor_total_produto = procurarItemId.item.valor_unitário_produto * procurarItemId.item.saldo_quantidade;
			};
		}
	}

	let filtrarItensPendentes = todosOsItensDoPedido.filter((item) => {
	return item.item.saldo_quantidade !== 0; 
	})
    //return todosOsItensDoPedido;
	return filtrarItensPendentes;
}

console.log(pedidosPendentes());