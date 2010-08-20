var mongoose = require('mongoose').Mongoose;
var sys = require('sys');

mongoose.model('User', {

    properties: ['name', 'updated_at'],

    cast: {
      age: Number,
      'nested.path': String
    },

    indexes: ['first'],

    setters: {
        first: function(v){
            return this.v.capitalize();
        }
    },

    getters: {
        full_name: function(){ 
            return this.first + ' ' + this.last 
        }
    },

    methods: {
        save: function(fn){
            this.updated_at = new Date();
            this.__super__(fn);
        }
    },

    static: {
        findOldPeople: function(){
            return this.find({age: { '$gt': 70 }});
        }
    }

});

var db = mongoose.connect('mongodb://localhost/mongoose_db');

var User = db.model('User');

var u = new User();
u.name = 'John';
u.save(function(){
    sys.puts('Saved!');
});

var user = User.find({ name: 'john' });
sys.puts(sys.inspect(user));

