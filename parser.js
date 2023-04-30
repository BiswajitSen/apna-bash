const isNotUndefined = function(a) {
  return a !== undefined;
};

const parse = function(sourceCode) {
  return sourceCode.reduce(function(commands, command) {
    commands.push(command.split(' ').filter(isNotUndefined));

    return commands;
  }, []);
};

exports.parse = parse;
