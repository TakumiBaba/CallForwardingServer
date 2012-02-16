/**
 * Created by JetBrains WebStorm.
 * User: takumibaba
 * Date: 12/02/11
 * Time: 21:43
 * To change this template use File | Settings | File Templates.
 *
 *
 *
**/

var user = {};

var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
    //user.push(socket);
    console.log(socket);
   
    socket.on('call',function(msg){
        socket.emit("call","hoge");
        socket.broadcast.emit("call","hoge");
        console.log("着信！");
    });


    socket.on('discall',function(){
        console.log("着信切れたよ。");
    });

    socket.on('disconnect',function(){
        console.log("着信切れたよ。");
    });
});
