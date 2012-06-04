var findNextRequire = require('./helper/findnextrequire');

module.exports = function(parameters, src, context) {
  nextReq = findNextRequire(src);
  if(nextReq !== null)
    context.bundle.ignore(nextReq.module);
};