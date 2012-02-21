var mongoose = require('mongoose'),
    sechash  =require('sechash');
var db = mongoose.connect('mongodb://localhost:27017/test');


var Schema = mongoose.Schema;

var post = new Schema({
    username : String,
    password : String,
    date : Date
});

mongoose.model('post',post);

var Post = mongoose.model('post');

var s = new Post();

s.username = "takumi";
s.password = sechash.strongHashSync('md5',"baba");
s.date = Date.now();

s.save(function(err){
    if(!err)console.log("pokkkkkk!");
});

Post.find({username : "hoge"},function(err,docs){
   if(!err){
       for(var i=0;i<docs.length;i++){
           console.log(docs[i]);
       }
   }
});
