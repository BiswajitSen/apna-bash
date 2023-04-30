const {pwd, ls, cd} = require('./commands.js');
const operations = {pwd, ls, cd};

const executeCommands = function(commands, environment) {
  const outputs = [];
  for(const command of commands) {
    const [operation, argument] = command;
    const output = operations[operation](environment, argument);

    outputs.push(operation, output);
  }

  return outputs;
};

exports.executeCommands = executeCommands;

