var require_reg = /(.*require\(['"])(.*)(['"]\).*)/g;

module.exports = function(src) {

  //consider only the first line for matching
  var line = src.split('\n')[0];
  var match = line.split(require_reg);

  if(!match[1])
    return null;

  return {
    line   : 0, // line number of require
    module : match[2], //require argument
    match  : match // result of exec
  };
};