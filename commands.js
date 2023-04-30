const fs = require('fs');

const removExtraTokens = function(path, pathToken){
  if(pathToken === '..') {
    path.pop();
  }else if(pathToken !== '.') {
    path.push(pathToken);
  }

  return path;
}; 

const resolvePath = function(path) {
  const tokens = path.split('/');
  return tokens.reduce(removExtraTokens, []).join('/');
};

const pwd = function({PWD}) {
  return PWD;
};

const ls = function({PWD}) {
  return fs.readdirSync(PWD);
};

const cd = function(environment, path) {
  let currentPath = path.startsWith('/') ? path : environment.PWD + `/${path}`;

  if(!fs.existsSync(currentPath)) {
    return `cd: no such file or directory: ${path}`;
    process.exit(1);
  }
  currentPath = resolvePath(currentPath);
  environment.PWD = currentPath;

  return currentPath;
};

exports.pwd = pwd; 
exports.ls = ls;
exports.cd = cd;
