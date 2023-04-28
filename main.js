const fs = require('fs');

const pwd = function({PWD}) {
  return PWD;
};

const ls = function({PWD}) {
  return fs.readdirSync(PWD);
};

const cd = function(environment, dirName) {
  const {PWD} = environment;
  const fileList = fs.readdirSync(PWD);
  if(fileList.includes(dirName)) {
    environment.PWD += `/${dirName}`;
  }

  return PWD;
};

const operations = {pwd, ls, cd};

const isNotUndefined = function(a) {
  return a !== undefined;
};

const parse = function(sourceCode) {
  return sourceCode.reduce(function(commands, command) {
    commands.push(command.split(' ').filter(isNotUndefined));
    return commands;
  }, []);
};

const executeCommands = function(commands, environment) {
  for(const command of commands) {
    const [operation, argument] = command;
    const output = operations[operation](environment, argument);
    console.log(output);
  }
};

const main = function() {
  const environment = {PWD: process.env.PWD}; 
  const sourceCode = fs.readFileSync('./apna-script.ab', 'utf-8').trim().split('\n');
  const commands = parse(sourceCode);
  executeCommands(commands, environment);
};

main();
