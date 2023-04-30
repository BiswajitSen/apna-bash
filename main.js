const {parse} = require('./parser.js');
const {executeCommands} = require('./executeCommands.js');
const fs = require('fs');

const fetchCode = function(commandFile) {
  return fs.readFileSync(commandFile, 'utf-8').trim().split('\n');
};

const display = function(outputs) {
  console.log(outputs);
};

const main = function() {
  const environment = {PWD: process.env.PWD}; 
  const commandFile = process.argv[2];
  const sourceCode = fetchCode(commandFile);
  const commands = parse(sourceCode);
  const outputs = executeCommands(commands, environment);

  display(outputs);
};

main();
