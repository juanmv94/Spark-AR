const FaceTracking = require('FaceTracking');
//const Diagnostics = require('Diagnostics');
const Patches = require('Patches');
const Scene = require('Scene');
const Time = require('Time');
const Audio = require('Audio');

const face = FaceTracking.face(0);
const fuegos = [Scene.root.find('fuego1'),Scene.root.find('fuego2'),Scene.root.find('fuego3')];

for (var i=0; i< fuegos.length; i++) {
	fuegos[i].position=face.mouth.center;
	fuegos[i].initialVelocityMagnitude=face.mouth.openness.mul(0.75);
	fuegos[i].scale=face.mouth.openness.mul(0.015);
}

Scene.root.find('motor').volume=face.mouth.openness.mul(5);
const sKonami = Audio.getPlaybackController('konami');
const sEndok = Audio.getPlaybackController('endok');
const sCrash = Audio.getPlaybackController('crash');

//KONAMI

var kp=0;
Patches.getPulseValue("t").subscribe(function() {touch(Patches.getScalarValue("tx").pinLastValue(), Patches.getScalarValue("ty").pinLastValue());});

function touch(x,y) {
	const xs=Patches.getScalarValue("sx").pinLastValue();
	const ys=Patches.getScalarValue("sy").pinLastValue();
	if (typeof ys === "undefined" || typeof xs === "undefined") return; //no inicializado
	const ty = y/ys;
	const tx = x/xs;
	const opy=Math.floor(ty*2);
	const opx=Math.floor(tx*2);
	switch(kp) {
		case 0:
		case 1:
		if (opy==0) kp++; else kp=0;
		break;
		case 2:
		if (opy==1) kp++; else if (opy!=0) kp=0;
		break;
		case 3:
		if (opy==1) kp++; else kp=0;
		break;
		case 4:
		case 6:
		if (opx==0) kp++; else kp=0;
		break;
		case 5:
		case 7:
		if (opx==1) kp++; else kp=0;
		break;
		default:
		if (opy==0) kp=1; else kp=0;
	}
	if (kp==8) konami();
}


//DINAMICA

const tamNave=0.65;
const propNave=0.60;
const fr=0.95;
const powerMult=0.003;
const maxLandSpeed=0.006;
const g=0.0005;
const nrv=-0.02;
var posx,posy,oldx,oldy,vx,vy,nr;

const levels=3;
var level=0;
var wait=0;
var restart;
const spawnPoints=[[0.7,0.1],[0.1,0.1],[0.90,0.1]];
const endPoints=[[0.42,0.73,0.18,0.73],[0.23,0.73,0.39,0.73],[0.37,0.44,0.53,0.44]];
const walls=[[[0,0.73,1,0.73]],
[[0,0.45,0.69,0.21],[0.69,0.21,0.69,0.50],[0.69,0.50,0.15,0.64],[0.15,0.64,0.20,0.73],[0.20,0.73,0.56,0.75],[0.56,0.75,0.85,0.53],[0.85,0.53,0.84,0.25],[0.84,0.25,1,0.09]],
[[0,0.71,1,0.71],[0.09,0,0.09,1],[0.71,0,0.76,0.05],[0.76,0.05,0.76,0.60],[0.76,0.60,0.22,0.60],[0.22,0.60,0.22,0.22],[0.22,0.22,0.37,0.22],[0.37,0.22,0.37,0.41],[0.53,0.41,0.53,0.12],[0.53,0.12,0,0.12]]];

function fint() {
	if (wait>1) {
		if (restart) Patches.setScalarValue("frameExp",Math.min(24,25-wait));
		wait--;
		return;
	}
	else if (wait==1) {
		wait--;
		if (restart) crashf();
		else nlf();
		return;
	}
	
	if (!face.isTracked.pinLastValue()) return;
	const rDeg=Patches.getScalarValue("rotacionCara").pinLastValue();
	const r=rDeg*Math.PI/180;
	Scene.root.find("nave").transform.rotationZ=r;
	const power=powerMult*face.mouth.openness.pinLastValue();
	const accx=power*Math.sin(r);
	const accy=g-power*Math.cos(r);
	vx=(vx+accx)*fr;
	vy=(vy+accy)*fr;
	
	posy += vy;
	posx += vx;
	
	if (posx<0.01) {
		posx=0.01; vx=0;
	} else if (posx>0.99) {
		posx=0.99; vx=0;
	}
	if (posy<0.01) {
		posy=0.01; vy=0;
	}
	nr=(nr+nrv)%(2*Math.PI);
	
	const xs=Scene.root.find("canvas0").width.pinLastValue();
	const ys=Scene.root.find("canvas0").height.pinLastValue();
	
	Scene.root.find("nave").transform.x=-posx*xs;
	Scene.root.find("nave").transform.y=-posy*ys;
	Scene.root.find("nave").transform.rotationY=nr;
	Scene.root.find("nave").transform.scaleX=xs*tamNave;
	Scene.root.find("nave").transform.scaleY=ys*tamNave*propNave;
	Scene.root.find("nave").transform.scaleZ=xs*tamNave;
	
	if (intersects(oldx,oldy,posx,posy,endPoints[level][0],endPoints[level][1],endPoints[level][2],endPoints[level][3])) {
		var v=Math.sqrt(vx*vx+vy*vy);
		//Diagnostics.log(v);
		if (v>maxLandSpeed) crash();
		else nextLevel();
	} else 
		for (var i=0; i<walls[level].length; i++) 
			if (intersects(oldx,oldy,posx,posy,walls[level][i][0],walls[level][i][1],walls[level][i][2],walls[level][i][3])) {
			//Diagnostics.log("crash pos:"+oldx+","+oldy+","+posx+","+posy+","+walls[level][i]);
			crash();
			return;
		}
	oldx=posx;
	oldy=posy;
}

function crash() {
	sCrash.play();
	restart=true;
	wait=25;
}

function nextLevel() {
	sEndok.play();
	Scene.root.find("nave").transform.rotationZ=0;
	restart=false;
	wait=25;
}

function crashf() {
	startLevel();
}

function nlf() {
	level=(level+1)%levels;
	startLevel();
}

function konami() {
	sKonami.play();
	nlf();
}

function startLevel() {
	Patches.setScalarValue("layout",level);
	nr=0;
	vx=0;
	vy=0;
	posx=spawnPoints[level][0];
	posy=spawnPoints[level][1];
	oldx=posx;
	oldy=posy;
}

// returns true iff the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
function intersects(a,b,c,d,p,q,r,s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};

startLevel();
const intervalo=Time.setInterval(fint,40);