var findNextRequire = require('./helper/findnextrequire');

module.exports = function(parameters, src, context) {
  nextReq = findNextRequire(src);
  if(nextReq !== null) {
    parameters = parameters.split(' ');

    if(parameters.indexOf('-c')!==-1        ||
       parameters.indexOf('--comment')!==-1) {
    //source commenting ignore
      var lines = src.split('\n');
      var line = lines[nextReq.line];

      //comment elegament the line
      line = line.replace(/^(\s*)/g, '$1//');

      lines.splice(nextReq.line, 1, line);
      src = lines.join('\n');
      return src;

    } else {
    //traditional ignore
      context.bundle.ignore(nextReq.module);
    }
  }
};