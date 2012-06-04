var reg = /^\s*\/\/\s*@browserify[\s-](\w*)\s*(.*)/g;

module.exports.handlers = {
  'ignore' : require('./handler/ignore')
};

module.exports = function(bundle) {
  var handlers = module.exports.handlers;
  
  bundle.register(function(body, file) {
    var src = body.split('\n');

    for(var l = 0; l < src.length; l++) {
      if(match = reg.exec(src.line)) {
        var command = match[1];
        var parameters = match[2];
        //context for calling handler
        var context = {
          bundle  : bundle,
          line    : l,
          file    :file,
          command : command
        };

        //retrieve handler coreresponding to command
        var handler = handlers[command];

        if(handler) {
          //call it
          var returned = handler.call(null,
            parameters,
            //give source starting from line+1 after tag
            src.slice(l+1).join('\n'),
            context);

          //transform returned
          if(typeof returned === 'string')
            returned = returned.split('\n');

          //modify source according to what was returned
          if(Array.isArray(returned))
            src = src.slice(l).concat(returned);
        }
      }
    }

    return src.join('\n');
  });
};