const Time = require('Time');
const Patches = require('Patches');

const intervalo=Time.setInterval(fint,20);
Patches.getPulseValue("t").subscribe(function() {touch(Patches.getScalarValue("tx").pinLastValue(), Patches.getScalarValue("ty").pinLastValue());});

var acc=0;
var accSpeed=0.0015;
var accMax=0.006;

var turn=0;
var turnSpeed=0.5;
var turnMax=1;

var fr=0.90;

var posx=0;
var posy=0;
var v=0;
var a=Math.PI/2;

function fint() {
	v=(v+acc)*fr;
	a=(a+turn*v);
	
	posy -= v*Math.sin(a);
	posx -= v*Math.cos(a);
	
	//Diagnostics.log(v);
	Patches.setScalarValue("posx",posx);
	Patches.setScalarValue("posy",posy);
	Patches.setScalarValue("a",a*(180/Math.PI));
}

function touch(x,y) {
	const sx=Patches.getScalarValue("sx").pinLastValue();
	const sy=Patches.getScalarValue("sy").pinLastValue();
	if (typeof sy === "undefined" || typeof sx === "undefined") return; //no inicializado
	const ty = y/sy;
	const tx = x/sx;
	const opy=Math.floor(ty*3);
	const opx=Math.floor(tx*3);
	//Diagnostics.log(opx + ',' + opy);
	if (opy==2)	{	//aceleracion
		switch (opx) {
			case 0:
			var nacc=acc-accSpeed;
			acc= (nacc <= -accMax) ? -accMax : nacc;
			break;
			
			case 2:
			var nacc=acc+accSpeed;
			acc= (nacc >= accMax) ? accMax : nacc;
			break;
			
			case 1:
			acc=0;
		}
	}
	else if (opy==1) {	//giro
		switch (opx) {
			case 0:
			var nturn=turn-turnSpeed;
			turn= (nturn <= -turnMax) ? -turnMax : nturn;
			break;
			
			case 2:
			var nturn=turn+turnSpeed;
			turn= (nturn >= turnMax) ? turnMax : nturn;
			break;
			
			case 1:
			turn=0;
		}
	}
	else {	//reset
		acc=0;
		turn=0;
		posx=0;
		posy=0;
		v=0;
		a=Math.PI/2;
	}
}