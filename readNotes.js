const fs = require('fs');
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

function retornarTodasAsNotas() {
    const leituraNotas = extractData(noteDirectory);
    return leituraNotas

    //for (const item of leituraNotas) {
    //    console.log(item.data);
    //};
}

module.exports = retornarTodasAsNotas;