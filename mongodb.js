var mongo = require('mongodb');
var sys = require('sys');

var db = new mongo.Db('node-mongo-8LU', new mongo.Server('localhost', 27017, {}), {});

db.open(function(err, db) {
	db.collection('records', function(err, collection) {
		
		sys.puts(sys.inspect(collection));
    // Remove all existing documents in collection
    collection.remove(function(err, collection) {
      
      // Insert 3 records
      for(var i = 0; i < 3; i++) {
				user = {
					"name": "user" + i,
					"data": "some data"
				}
        collection.insert(user);
      }
			
			// Inspect records
			collection.find(function(err,cursor){
			  cursor.each(function(err,doc){
				  if(doc != null){
						sys.puts(sys.inspect(doc));
				  }
			  });
			});
			
			// Count records
			collection.count(function(err, count) {
				sys.puts(count + " records.");
			});
			
			db.close();
    });
  });
});

// mongo
// use node-mongo-8LU
// show collections
// db.records.find();