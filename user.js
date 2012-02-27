var mongoose = require('mongoose'),
    sechash  =require('sechash');
var db = mongoose.connect('mongodb://localhost:27017/test');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;

var UserData = new Schema({
    username : String,
    password : String,
    uuid : String,
    date : Date
});

mongoose.model('userdata',UserData);

var User = mongoose.model('userdata');
/*
var s = new User();

s.username = "takumi";
s.password = sechash.strongHashSync('md5',"baba");
s.uuid = uuid.v4();
s.date = Date.now();
*/
exports.UserData = User;