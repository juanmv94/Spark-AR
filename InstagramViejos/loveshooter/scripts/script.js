const Patches = require('Patches');

var puntos=0;

function printPuntos() {
	Patches.setStringValue("points",("points: "+puntos));
}

printPuntos();
Patches.setStringValue("tiempo","0:10");

function dos_digitos(num) 
{
	if (num<10) return "0".concat(num);
	else return num;
}

Patches.getScalarValue("segundos").monitor().subscribe(function(event) {
	var segundos=event.newValue;
	var s=segundos%60;
	var m=(segundos-s)/60;
	Patches.setStringValue("tiempo",(m+":"+dos_digitos(s)));
});

Patches.getScalarValue("puntos").monitor().subscribe(function(event) {
	puntos=event.newValue;
	printPuntos();
});

function calcSpeed(visible,vx,vy,sx,sy) {
	if (visible) {
		Patches.setScalarValue(vx,15+Math.random()*puntos*5);
		Patches.setScalarValue(vy,15+Math.random()*puntos*5);
		Patches.setScalarValue(sx,Math.random());
		Patches.setScalarValue(sy,Math.random());
	} else {
		Patches.setScalarValue(vx,-1);
		Patches.setScalarValue(vy,-1);
	}
}

calcSpeed(false,"vx1","vy1","sx1","sy1");
calcSpeed(false,"vx2","vy2","sx2","sy2");
calcSpeed(false,"vx3","vy3","sx3","sy3");

Patches.getBooleanValue("visible1").monitor().subscribe(function(event) {
	calcSpeed(event.newValue,"vx1","vy1","sx1","sy1");
});

Patches.getBooleanValue("visible2").monitor().subscribe(function(event) {
	calcSpeed(event.newValue,"vx2","vy2","sx2","sy2");
});

Patches.getBooleanValue("visible3").monitor().subscribe(function(event) {
	calcSpeed(event.newValue,"vx3","vy3","sx3","sy3");
});