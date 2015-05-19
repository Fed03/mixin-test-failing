import Ember from "ember";

var objectValues = function (object) {
  var values = Ember.A([]);
  
  var keys = Ember.keys(object);
  keys.forEach((key) => {
    if(typeof object[key] === 'object') {
      let results = objectValues(object[key]);
      Array.prototype.push.apply(values, results);
    } else {
      values.push(object[key]);
    }
  });

  return values;
};

export default objectValues;
