const fs = require('fs');
const contract = JSON.parse(fs.readFileSync('./build/contracts/StarNotary.json', 'utf8'));
fs.writeFile('./build/abi.json',JSON.stringify(contract.abi),()=>{
console.log('Abi Created');
});