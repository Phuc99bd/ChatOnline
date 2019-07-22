var socket = io("localhost:8888");
$('#Join').click(function() {
	socket.emit("Join-room","Chat room,giao lưu");
})
$('#Join2').click(function() {
	socket.emit("Join-room","Lập trình Nodejs");
})
$('#Join3').click(function() {
	socket.emit("Join-room","Lập trình ASP");
})
$('#Join4').click(function() {
	socket.emit("Join-room","Lập trình Android");
})
socket.on("Room-ps",function(data){
	$('#TENROM').html(data);
	$('.room-chat').show(500);
	$('.join-random').hide(500);
	$('.noidung-chat').scrollTop($('.noidung-chat')[0].scrollHeight);
	
})
$(document).ready(function(){
	$('.join-random').show(500);
	$('.room-chat').hide(500);
})
$('#submit-noidung').click(function(){
	if($('#tenhienthi').val() == "" ||  $('#nd').val() == "")
	{
		alert("Vui lòng không để trống thông tin");
	}else{
	var time = new Date();
	var datestring = time.getDate()  + "/" + (time.getMonth()+1) + "/" + time.getFullYear() +"  " +time.getHours() +"h-"+time.getMinutes()+"p-" +time.getSeconds() +"s";
	var s = {un: $('#tenhienthi').val(),nd: $('#nd').val(),time: datestring};
	socket.emit("send-client",s)
	$('#nd').val("");
	}
})
socket.on("Danh-sach",function(data){
	$('.noidung-chat').html("");
	data.forEach(function(i){
		var p = (i.un).charAt(0);
		$('.noidung-chat').append("<div class='icon'>" +p+"</div>" +"<div class='noidung-messenger'>" + i.un + "  ᴥ  "+ i.time +"<br>"+"<p class='noidung-item'>" + i.nd + "</p> </div>"
			);
	})
	$('.noidung-chat').scrollTop($('.noidung-chat')[0].scrollHeight);
})
$('#logout').click(function(){
	$('.join-random').show(500);
	$('.room-chat').hide(500);
})
