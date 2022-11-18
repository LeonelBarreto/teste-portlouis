const fs = require('fs');
const pedidoDirectory = './data/Pedidos';
const noteDirectory = './data/Notas';

function extractData(directory) {
   let extractedFiled = [];

   const files = fs.readdirSync(directory);
   files.forEach(file => {
      let fileObject = { id: Number(file.replace(/\D/g, "")), data: [] };
      let fileDetails = fs.readFileSync(`${directory}/${file}`, "utf-8")

      fileDetails.split(/\r?\n/).forEach(line => {
         fileObject.data.push(
            eval('(' + line + ')')
         );
      });
      extractedFiled.push(fileObject)
   });
   return extractedFiled
};

const leituraNotas = extractData(noteDirectory);

//for (const item of leituraNotas) {
//    console.log(item.data);
//};

const leituraPedidos = extractData(pedidoDirectory);

//for (const item of leituraPedidos) {
//    console.log(item.data);
//};


function formatacaoDePedidos(){
	
	let todosOsItensDoPedido = [];

	for (const pedidos of leituraPedidos) {
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

function lerTodasAsNotas(todosOsItensDoPedido){
	
}


function pedidosPendentes(){
	
	let todosOsItensDoPedido = formatacaoDePedidos();
	
	for (const notas of leituraNotas) {
		for (const nota of notas.data) {
			const procurarItemId = todosOsItensDoPedido.find((item) => {
				return (item.item.número_item === nota.número_item && item.id_pedido === nota.id_pedido);
			})

			if (procurarItemId) {
				procurarItemId.item.saldo_quantidade -= nota.quantidade_produto;
				procurarItemId.item.valor_total_produto = procurarItemId.item.valor_unitário_produto * procurarItemId.item.saldo_quantidade;
			};
		}
	}

	let filtrarItensPendentes = todosOsItensDoPedido.filter((item) => {
		return item.item.saldo_quantidade !== 0; 
	})

	return filtrarItensPendentes;
}

console.log(pedidosPendentes());

function listarPedidosPendentes(){
	let todosPedidosPendentes = [];

	const todasNotas = pedidosPendentes();
	for (const item of todasNotas) {
		let pedido = {
            id_pedido: item.id_pedido,
            valor_total: 0,
            saldo_valor: 0,
            itens: [],
        };

		let pedidoEncontrado = todosPedidosPendentes.find(item => {
			return item.id_pedido === item.id_pedido;
		});

		if (pedidoEncontrado) {
            const { valor_unitário_produto, ...dadosDoItem } = item.item;
            pedidoEncontrado.itens.push(dadosDoItem);
            pedidoEncontrado.saldo_valor += item.item.valor_total_produto;
        } else {
            pedido.saldo_valor += item.item.valor_total_produto;
            const { valor_unitário_produto, ...dadosDoItem } = item.item;
            pedido.itens.push(dadosDoItem);
            todosPedidosPendentes.push(pedido);
        }
	};

	return todosPedidosPendentes;    
}

console.log(listarPedidosPendentes());