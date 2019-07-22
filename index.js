var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");

var server = require("http").createServer(app);

server.listen(process.env.PORT || 3000);
var io =require("socket.io")(server);

var manggiaoluu = [];
var mangnodejs = [];
var mangasp= [];
var mangandroid = [];
io.on("connection",function(socket) {
	console.log(socket.ID);
	socket.on("Join-room",function(data) {
		socket.join(data);
		socket.Phong=data;
		socket.emit("Room-ps",data);
		
		if(socket.Phong == "Chat room,giao lưu"){
			io.sockets.in(socket.Phong).emit("Danh-sach",manggiaoluu);
		}
		else
			if(socket.Phong == "Lập trình Nodejs"){
				io.sockets.in(socket.Phong).emit("Danh-sach",mangnodejs);
			}
			else
				if(socket.Phong == "Lập trình ASP")
				{
					io.sockets.in(socket.Phong).emit("Danh-sach",mangasp);
				}
				else
					if(socket.Phong == "Lập trình Android"){
						io.sockets.in(socket.Phong).emit("Danh-sach",mangandroid);
					}
	})
	socket.on("send-client",function(data){
		
		if(socket.Phong == "Chat room,giao lưu"){
			manggiaoluu.push(data);
			io.sockets.in(socket.Phong).emit("Danh-sach",manggiaoluu);
		}
		else
			if(socket.Phong == "Lập trình Nodejs"){
				mangnodejs.push(data)
				io.sockets.in(socket.Phong).emit("Danh-sach",mangnodejs);
			}
			else
				if(socket.Phong == "Lập trình ASP")
				{
					mangasp.push(data);
					io.sockets.in(socket.Phong).emit("Danh-sach",mangasp);
				}
				else
					if(socket.Phong == "Lập trình Android"){
						mangandroid.push(data);
						io.sockets.in(socket.Phong).emit("Danh-sach",mangandroid);
					}

	})

})

app.get("/",function(req,res){
	res.render("trangchu");
})