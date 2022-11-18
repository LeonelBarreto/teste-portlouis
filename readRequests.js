const fs = require('fs');
const pedidosDiretorio = './data/Pedidos';

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

function retornarTodosOsPedidos() {
    const leituraPedidos = extractData(pedidosDiretorio);
    return leituraPedidos
    
    //for (const item of leituraPedidos) {
    //  console.log(item);
    //};
}

//console.log(retornarTodosOsPedidos());

module.exports = retornarTodosOsPedidos;