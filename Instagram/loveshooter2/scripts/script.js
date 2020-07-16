const Patches = require('Patches');

var puntos=0;

function printPuntos() {
	Patches.inputs.setString("points",dos_digitos(puntos));
}

printPuntos();
Patches.inputs.setString("tiempo","0:10");

function dos_digitos(num) 
{
	if (num<10) return "0".concat(num);
	else return num.toString();
}

Patches.outputs.getScalar("segundos").then(function(seg) {seg.monitor().subscribe(function(event) {
	var segundos=event.newValue;
	var s=segundos%60;
	var m=(segundos-s)/60;
	Patches.inputs.setString("tiempo",(m+":"+dos_digitos(s)));
});});

Patches.outputs.getScalar("puntos").then(function(pun) {pun.monitor().subscribe(function(event) {
	puntos=event.newValue;
	printPuntos();
});});

function calcSpeed(visible,vx,vy,sx,sy) {
	if (visible) {
		Patches.inputs.setScalar(vx,15+(Math.random()+0.6)*puntos*1.4);
		Patches.inputs.setScalar(vy,15+(Math.random()+0.6)*puntos*1.4);
		Patches.inputs.setScalar(sx,Math.random());
		Patches.inputs.setScalar(sy,Math.random());
	} else {
		Patches.inputs.setScalar(vx,-1);
		Patches.inputs.setScalar(vy,-1);
	}
}

calcSpeed(false,"vx1","vy1","sx1","sy1");
calcSpeed(false,"vx2","vy2","sx2","sy2");
calcSpeed(false,"vx3","vy3","sx3","sy3");

Patches.outputs.getBoolean("visible1").then(function(v) {v.monitor().subscribe(function(event) {
	calcSpeed(event.newValue,"vx1","vy1","sx1","sy1");
});});

Patches.outputs.getBoolean("visible2").then(function(v) {v.monitor().subscribe(function(event) {
	calcSpeed(event.newValue,"vx2","vy2","sx2","sy2");
});});

Patches.outputs.getBoolean("visible3").then(function(v) {v.monitor().subscribe(function(event) {
	calcSpeed(event.newValue,"vx3","vy3","sx3","sy3");
});});