var findNextRequire = require('./findnextrequire');

module.exports = function(bundle, parameters, src) {
  nextReq = findNextRequire(src);
  bundle.ignore(nextReq.module);
};