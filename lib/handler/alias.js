var findNextRequire = require('./helper/findnextrequire');

module.exports = function(parameters, src, context) {
  nextReq = findNextRequire(src);
  var alias = parameters.split(' ')[0];

  if(nextReq !== null)
    context.bundle.alias(nextReq.module, alias);
};