/* Improved from http://davidwalsh.name/pubsub-javascript
- Improved readability
- Friendlier naming conventions
- Generic data for publishing
*/

var pubsub = (function () {
  var topic = {};
  return {
    subscribe: function(name, listener) {
      if ( topic[name] === undefined ) {
        topic[name] = { queue: [] };
      }
      var index = topic[name].queue.push(listener) - 1;

      return {
        remove: function() {
          delete topic[name].queue[index];
        }
      };
    },
     
    publish: function(name, data) {
      if( topic[name] === undefined || topic[name].queue.length === 0) {
        return;
      } 

      topic[name].queue.forEach(function(callback) {
        callback((data === undefined ? null : data ));
      });
    }
  };
})()
