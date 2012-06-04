var findNextRequire = require('./helper/findnextrequire');

module.exports = function(bundle, parameters, src) {
  nextReq = findNextRequire(src);
  bundle.ignore(nextReq.module);
};