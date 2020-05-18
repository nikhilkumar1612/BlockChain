const fs = require('fs');
const path = require('path');
const solc = require('solc');

const pathName = path.resolve(__dirname, 'contracts', 'myProject.sol');
const contents = fs.readFileSync(pathName,'utf8');
console.log(solc.compile(contents,1));
module.exports = solc.compile(contents,1).contracts[':myProject'];
