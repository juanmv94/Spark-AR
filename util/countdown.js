const Time = require('Time');
//const Patches =require('Patches');
const Diagnostics = require('Diagnostics');

var countDownDate = new Date("Fri, 1 Jan 2022 00:00:00 GMT");

function update(){
	var now = new Date().getTime() - new Date().getTimezoneOffset() * 60000;
	var distance = Math.max(countDownDate - now,0);
	var Days = Math.floor(distance/(1000*60*60*24));
	var Hours = Math.floor((distance %(1000*60*60*24))/(1000*60*60));
	var Minutes = Math.floor((distance %(1000*60*60))/(1000*60));
	var Seconds = Math.floor((distance %(1000*60))/(1000));

	Diagnostics.log("Days: " + Days + ", Hours: " + Hours + ", Minutes: " + Minutes + ", Seconds: " + Seconds);
		
	/*Patches.inputs.setString('DayString', pad(Days,3));
    Patches.inputs.setString('HoursString', pad(Hours,2));
    Patches.inputs.setString('MinutesString', pad(Minutes,2));
    Patches.inputs.setString('SecondsString', pad(Seconds,2));*/
}

function pad (number, length) {
	var str = number.toString();
	while(str.length<length){
		str = "0" + str.toString();
	}
	return str;
}

Time.setInterval(update,1000);
