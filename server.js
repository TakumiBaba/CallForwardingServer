var users = {};

var io = require('socket.io').listen(8080);
var express = require('express');
var uuid = require('node-uuid');

var mongoose = require('mongoose');
var sechash = require('sechash');
var db = mongoose.connect('mongodb://localhost:27017/userdata');
var Schema = mongoose.Schema;
var UserData = new Schema({
    username : String,
    password : String,
    uuid : String,
    date : Date
});

mongoose.model('user',UserData);

var app = express.createServer();
app.use(express.bodyParser());

//from phone access

app.get('/',function(req,res){
   res.send("hello!");
});
app.get('/:user/:password/calling',function(req,res){
    console.log("------------caling--------");

    res.send(req.params.user + "/" + req.params.password);
    var name = req.params.user.toString();
    var pass = sechash.strongHashSync("md5",req.params.password,"takumibaba");
    var User = mongoose.model('user');
    User.find({username:name,password:pass},function(err,docs){
        if(!err && docs[0]){
            users[docs[0].uuid].emit("call","私だ！");
            console.log("set");
        }else{
            console.log("undefined");
          
        }
    });
});

app.get('/:user/:password/callend',function(req,res){
    res.send(req.params.user + "/" + req.params.password);
    var name = req.params.user.toString();
    var pass = sechash.strongHashSync("md5",req.params.password,"takumibaba");
    var User = mongoose.model('user');
    User.find({username:name,password:pass},function(err,docs){
        if(!err && docs[0]){

            users[docs[0].uuid].emit("discall","私だ！");
            console.log("set");
        }else{
            console.log("undefined");
        }
    });
});

app.get('/:user/:password/signup',function(req,res){

    var User = mongoose.model('user');
    var u = new User();

    u.username = req.params.user;
    u.password = sechash.strongHashSync('md5',req.params.password,"takumibaba");
    u.uuid = uuid.v4();
    u.date = Date.now();

    User.find({username:u.username},function(err,docs){
        if(!docs[0]){
            u.save(function(err){
                if(!err)console.log("登録した！");
            });
        }else{
            console.log("登録済みです");
        }
    })
   res.send("サインアップ！");

});

app.post('/call',function(req,res){
    var username = req.body.user.toString();
    var password = sechash.strongHashSync("md5",req.body.pass,"takumibaba");
    var User = mongoose.model('user');
    User.find({username:username,password:password},function(err,docs){
        console.log(docs);
        if(!err && docs[0]){
            if(users[docs[0].uuid]){
                users[docs[0].uuid].emit("call","私だよ〜");
            }else{
                console.log("ないよ！");
                }
      
       }else{
           console.log("該当しません。");
       }
    });

    res.send("ok");
});

app.post('/discall',function(req,res){
    var username = req.body.user.toString();
    var password = sechash.strongHashSync("md5",req.body.pass,"takumibaba");
    var User = mongoose.model('user');
    User.find({username:username,password:password},function(err,docs){
        console.log(docs);
        if(!err && docs[0]){
            if(users[docs[0].uuid]){
                users[docs[0].uuid].emit("discall","私だよ〜");
            }

        }
    });

    res.send("ok");
});

app.listen(4567);

//from chrome client access


io.sockets.on('connection', function (socket) {
    var user;
    socket.on('call',function(msg){
 //       socket.emit("call","hoge");
        console.log("着信！");
    });


    socket.on("login",function(data){
        var name = data.username.toString(),
            pass = sechash.strongHashSync("md5",data.pass,"takumibaba");
        var User = mongoose.model('user');
        User.find({username:name,password:pass},function(err,docs){
            if(!err && docs[0]){
                console.log("ログインしたよ！");
                users[docs[0].uuid] = socket;
                console.log(docs[0]);
            }else{
                console.log("ログイン出来ません！");
            }
        });
    });
    socket.on('discall',function(){
        console.log("着信切れたよ。");
    });

    socket.on('logout',function(data){
        var User = mongoose.model('user');
        var name = data.username.toString(),
            pass = sechash.strongHashSync("md5",data.pass,"takumibaba");
        User.find({username:name,password:pass},function(err,docs){
           if(!err && docs[0]){
               users[docs[0].uuid] = null;
           }
        });
    })

    socket.on('disconnect',function(){

        user = null;

    });
});
