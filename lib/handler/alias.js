var findNextRequire = require('./helper/findnextrequire');

module.exports = function(parameters, src, context) {
  nextReq = findNextRequire(src);

  if(nextReq !== null) {
    parameters = parameters.split(' ');
    var alias = parameters[0];

    if(parameters.indexOf('-r')!==-1        ||
       parameters.indexOf('--replace')!==-1) {

      var lines = src.split('\n');
      var line = nextReq.match[1]+alias+nextReq.match[3];
      lines.splice(nextReq.line, 1, line);

      src = lines.join('\n');
      return src;
    } else {
      context.bundle.alias(nextReq.module, alias);
    }
  }
};