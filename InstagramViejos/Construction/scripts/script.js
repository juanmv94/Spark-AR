//const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const TouchGestures = require('TouchGestures');
const Materials = require('Materials');
const Audio = require('Audio');

const anchoPlataforma=8,altoPlataforma=8,nbloques=256,nmateriales=12,ncoloreshud=3;
const tamBloque=0.1;
const dx=-(anchoPlataforma-1)*tamBloque*0.5, dz=-(altoPlataforma-1)*tamBloque*0.5, dybloque=tamBloque*0.5;

//Audios
const audioCambiaColor=Audio.getPlaybackController('cambiaColor');
const audioBoton=Audio.getPlaybackController('boton');
const audioBloque=Audio.getPlaybackController('block');
const audioBorrar=Audio.getPlaybackController('borrar');

//Materiales
var materiales=new Array(nmateriales);
var materialesHUD=new Array(nmateriales);
for (let i=0;i<nmateriales;i++) {
	materiales[i]=Materials.get("material"+i);
	materialesHUD[i]=Materials.get("mhud"+i);
}

//Elementos Escena

const placer=Scene.root.child("planeTracker0").child("placer");
const plataformas=placer.child("plataformas");
const bloques=placer.child("bloques");
const hud=Scene.root.child("Device").child("Camera").child("Focal Distance").child("canvas0").child("HUD");
const labelRestantes=Scene.root.child("Device").child("Camera").child("Focal Distance").child("canvas0").child("restantes");

var coloreshud=new Array(ncoloreshud);
var paginacolores=0;
for (let i=0;i<ncoloreshud;i++) {
	coloreshud[i]=hud.child("c"+i);
	TouchGestures.onTap(coloreshud[i]).subscribe(function(){cTouch(i)});
}

TouchGestures.onTap(hud.child("flecha")).subscribe(function() {
	if ((paginacolores+2)*ncoloreshud>nmateriales) paginacolores=0;
	else paginacolores++;
	cargaColoresHUD();
	audioBoton.play();
});

TouchGestures.onTap(hud.child("goma")).subscribe(gomaTouch);
TouchGestures.onLongPress(hud.child("goma")).subscribe(gomaLongPress);

function cargaColoresHUD() {
	for (let i=0;i<ncoloreshud;i++) coloreshud[i].material=materialesHUD[i+paginacolores*ncoloreshud];
}

cargaColoresHUD();

//var posicionesUsadas=[];
var bloquesUsados=[];
var bloquesNoUsados=new Array(nbloques);
var bloquesList=new Array(nbloques);
var bloquesCarasList=new Array(nbloques);
for (let i=0;i<nbloques;i++) {
	bloquesList[i]=bloques.child("b"+i);
	bloquesCarasList[i]=new Array(6);
	for (let j=0;j<6;j++) {
		bloquesCarasList[i][j]=bloquesList[i].child("c"+j);
		TouchGestures.onTap(bloquesCarasList[i][j]).subscribe(function(){bTouch(i,j)});
	}
	bloquesNoUsados[i]=i;
}

var np=0;
for (let i=0;i<anchoPlataforma;i++) for (let j=0;j<altoPlataforma;j++) {
	let p=plataformas.child("p"+np++);
	let x=dx+i*tamBloque, z=dz+j*tamBloque;
	p.transform.x=x;
	p.transform.z=z;
	TouchGestures.onTap(p).subscribe(function(){pTouch(x,z);});
}

//Dinamica

var modoBorrar=false;
var color=0;

function cTouch(c) {
	modoBorrar=false;
	color=c+paginacolores*ncoloreshud;
	audioCambiaColor.play();
}

function gomaTouch() {
	modoBorrar=true;
	audioBoton.play();
}

function gomaLongPress() {
	while (bloquesUsados.length>0) {
		let b=bloquesUsados.pop();
		bloquesList[b].hidden=true;
		bloquesNoUsados.push(b);
	}
	labelRestantes.text=bloquesNoUsados.length.toString();
	audioBorrar.play();
}

function pTouch(x,z) {
	if (!modoBorrar) ponerBloque(x,dybloque,z);
}

function bTouch(b,c) {
	if (modoBorrar) {
		bloquesList[b].hidden=true;
		bloquesNoUsados.push(b);
		labelRestantes.text=bloquesNoUsados.length.toString();
		audioBorrar.play();
		bloquesUsados.splice(bloquesUsados.indexOf(b),1);
		//var x=bloquesList[b].transform.x.pinLastValue();
		//var y=bloquesList[b].transform.x.pinLastValue();
		//var z=bloquesList[b].transform.x.pinLastValue();
		//posicionesUsadas.splice(posicionesUsadas.indexOf(x+","+y+","+z),1);
	}
	else {
		switch(c) {
			case 0:
			ponerBloque(bloquesList[b].transform.x.pinLastValue(),
			bloquesList[b].transform.y.pinLastValue(),
			bloquesList[b].transform.z.pinLastValue()+tamBloque);
			break;
			case 1:
			ponerBloque(bloquesList[b].transform.x.pinLastValue()+tamBloque,
			bloquesList[b].transform.y.pinLastValue(),
			bloquesList[b].transform.z.pinLastValue());
			break;
			case 2:
			ponerBloque(bloquesList[b].transform.x.pinLastValue()-tamBloque,
			bloquesList[b].transform.y.pinLastValue(),
			bloquesList[b].transform.z.pinLastValue());
			break;
			case 3:
			ponerBloque(bloquesList[b].transform.x.pinLastValue(),
			bloquesList[b].transform.y.pinLastValue(),
			bloquesList[b].transform.z.pinLastValue()-tamBloque);
			break;
			case 4:
			ponerBloque(bloquesList[b].transform.x.pinLastValue(),
			bloquesList[b].transform.y.pinLastValue()-tamBloque,
			bloquesList[b].transform.z.pinLastValue());
			break;
			case 5:
			ponerBloque(bloquesList[b].transform.x.pinLastValue(),
			bloquesList[b].transform.y.pinLastValue()+tamBloque,
			bloquesList[b].transform.z.pinLastValue());
			break;
		}
	}
}

function ponerBloque(x,y,z) {
	if (bloquesNoUsados.length==0) {}
	else {
		let b=bloquesNoUsados.pop();
		bloquesList[b].transform.x=x;
		bloquesList[b].transform.z=z;
		bloquesList[b].transform.y=y;
		for (let i=0;i<6;i++)
			bloquesCarasList[b][i].material=materiales[color];
		bloquesList[b].hidden=false;
		labelRestantes.text=bloquesNoUsados.length.toString();
		audioBloque.play();
		bloquesUsados.push(b);
		//posicionesUsadas.push(x+","+y+","+z);
	}
}