// 
// - a test object
var testobject = {
  'id': "12345",
	'date': new Date()
},
// - slightly more evil, nested object.
nestedTestobject = {
  'id': "12345",
	'date': new Date(),
  'foo': 178,
  'bar': {
    'abc': new Date(),
    'wtf': {
      'date': (new Date(Math.random() * 10000000000))
    }
  }
};

// `JSON_goodify` takes object and return it 'cleaned'.
var JSON_goodify = function (data) {
  // the work is done in the `packObject` function, 
  // which takes an object and returns a new object 
  function packObject(obj) {
    // first, we save the object we've got (so it is in our scope).
    var o = obj,
        good = {};
    // for every property of the object `o`,
    for (var prop in o) {
      
      // if it is not an inherited property
      if (o.hasOwnProperty(prop)) {

        // if it is a 'good' type,
        if (typeof o[prop] === "string" || 
            typeof o[prop] === "number" ||
            typeof o[prop] === "boolean") {

          // we can just use it
          good[prop] = o[prop];
          
        // Otherwise, we have some kind of object.
        // If it is, we check for types of objects we now how to sanitize.
        } else if (typeof o[prop] === "object") {

          // if it is a date,                   // TODO: better
          if (o[prop].getTime !== undefined) {
            
            // we get the unix time from the date object and put that into a string
            good[prop] = o[prop].getTime().toString();
            
          } else if (false) {
            // TODO: check for every other evil type
            "not implemented";
            
          } else {
            // we give up. recursion!
            good[prop] = packObject(o[prop]);
          };
        };
      };
    }
    return good;
  };
  return packObject(data);
}

// Lastly, we export it so we can use it as a `node_module`.
exports = JSON_goodify

// Now test it!
console.log(JSON_goodify(testobject));
console.log(JSON_goodify(nestedTestobject));