var browserify_tag = '@browserify';
var reg = new RegExp(); //to be defined

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

        //retrieve handler coreresponding to command
        var handler = handlers[command];

        if(handler) {
          //call it
          var returned = handler.call(null,
            parameters,
            bundle,
            //give source starting from line+1 after tag
            src.slice(l+1).join('\n'));

          //transform returned
          if(typeof returned === 'string')
            returned = returned.split('\n');

          //modify source according to what was returned
          if(Array.isArray(returned))
            src = src.slice(l).concat(returned);
        }
      }
    };

    return src.join('\n');
  });
};