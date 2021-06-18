const FaceTracking = require('FaceTracking');
//const Diagnostics = require('Diagnostics');
const Patches = require('Patches');
const Scene = require('Scene');
const Time = require('Time');
const Audio = require('Audio');
export const CameraInfo = require('CameraInfo')

const face = FaceTracking.face(0);
Promise.all([Scene.root.findFirst('fuego1'),Scene.root.findFirst('fuego2'),Scene.root.findFirst('fuego3')]).then(function(fuegos) {
fuegos.forEach(function(f) {
	f.position=face.mouth.center;
	f.initialVelocityMagnitude=face.mouth.openness.mul(0.75);
	f.scale=face.mouth.openness.mul(0.015);
});
});

Scene.root.findFirst('motor').then(function(m){m.volume=face.mouth.openness.mul(5);});
const sKonami = Audio.getPlaybackController('konami');
const sEndok = Audio.getPlaybackController('endok');
const sCrash = Audio.getPlaybackController('crash');

//KONAMI

Promise.all([Patches.outputs.getPulse("t"),Patches.outputs.getScalar("tx"),Patches.outputs.getScalar("ty")]).then(function(t) {
t[0].subscribe(function() {touch(t[1], t[2]);});});
var kp=0;

function touch(x,y) {
	const ty = y.div(CameraInfo.previewSize.height).pinLastValue();
	const tx = x.div(CameraInfo.previewSize.width).pinLastValue();
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

var rDegs,nave,xs,ys;
function fint() {
	if (wait>1) {
		if (restart) Patches.inputs.setScalar("frameExp",Math.min(24,25-wait));
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
	const rDeg=rDegs.pinLastValue();
	const r=rDeg*Math.PI/180*1.35;
	nave.transform.rotationZ=r;
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
	
	nave.transform.x=xs.mul(0.5-posx);
	nave.transform.y=ys.mul(0.5-posy);
	nave.transform.rotationY=nr;
	nave.transform.scaleX=xs.mul(tamNave);
	nave.transform.scaleY=ys.mul(tamNave*propNave);
	nave.transform.scaleZ=xs.mul(tamNave);
	
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
	sCrash.reset();
	sCrash.setPlaying(true);
	restart=true;
	wait=25;
}

function nextLevel() {
	sEndok.reset();
	sEndok.setPlaying(true);
	nave.transform.rotationZ=0;
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
	sKonami.reset();
	sKonami.setPlaying(true);
	nlf();
}

function startLevel() {
	Patches.inputs.setScalar("layout",level);
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

Promise.all([Patches.outputs.getScalar("rotacionCara"),Scene.root.findFirst("nave"),Scene.root.findFirst("canvas0")]).then(function(arr) {
	rDegs=arr[0]; nave=arr[1]; xs=arr[2].width; ys=arr[2].height;
	startLevel();
	const intervalo=Time.setInterval(fint,40);
});