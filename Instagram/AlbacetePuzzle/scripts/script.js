//const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const NativeUI = require('NativeUI');
const Materials = require('Materials');
const Textures = require('Textures');
const Shaders = require('Shaders');
const R = require('Reactive');
const Animation = require('Animation');
const TouchGestures = require('TouchGestures');
const Patches = require('Patches');
const Audio = require('Audio');

const puzzles=[{t:"ta",ico:"ta",x:4,y:3},{t:"mo",ico:"mo",x:5,y:4},{t:"cd",ico:"cd",x:5,y:5},{t:"ab2",ico:"ab2",x:7,y:9},{t:"bx",ico:"bx",x:10,y:6},{t:"ps",ico:"ps",x:10,y:6},{t:"ru",ico:"ru",x:12,y:7},{t:"ab1",ico:"ab1",x:10,y:10},{t:"hn3",ico:"hn3",x:13,y:8},{t:"hn2",ico:"hn2",x:15,y:8},{t:"hn1",ico:"hn1",x:16,y:8}];

const sonidos=["boton","block","terminado"].reduce(function(a,b){a[b]=Audio.getPlaybackController(b);return a},{});
const tamPuzzle=0.8;
const sepBloque=0.5;

const animacionesp=new Array(128), posicionespiezas=new Array(128);
const linearSampler = Animation.samplers.easeInOutQuad(0,1);
for (let i=0;i<128;i++) {
	var timeDriver = Animation.timeDriver({durationMilliseconds: 300});
	var timeline = Animation.animate(timeDriver,linearSampler);
	animacionesp[i]={td:timeDriver, tl:timeline};
}

export var materiales,plataformas,piezas;
const materialesP=Promise.all([...Array(128).keys()].map(function(n){return Materials.findFirst("material"+n);}));
const placerP=Scene.root.findFirst("placer");
placerP.then(function(placer) {
	Promise.all([placer.findFirst("plataformas",{recursive:false}), placer.findFirst("bloques",{recursive:false})]).then(function(placerChild) {
		var plataformasP=Promise.all([...Array(256).keys()].map(function(n){return placerChild[0].findFirst("p"+n,{recursive:false});}));
		var piezasP=Promise.all([...Array(128).keys()].map(function(n){return placerChild[1].findFirst("b"+n,{recursive:false});}));
		Promise.all([materialesP,plataformasP,piezasP]).then(function(arr) {
			materiales=arr[0]; plataformas=arr[1], piezas=arr[2];
			for (let i=0;i<256;i++) TouchGestures.onTap(plataformas[i]).subscribe(function(){plTouch(i);});
			for (let i=0;i<128;i++) TouchGestures.onTap(piezas[i]).subscribe(function(){piTouch(i);});
			for (let i=0;i<128;i++) piezas[i].findFirst("c5").then(function(c){c.material=materiales[i];});
			inicializaPuzzle(0);
			picker.visible = true;
		});
	});
});
var piezaSeleccionada=null;
var terminado;

/////Creacion de bordes
const borderPuzzle=noalpha(R.sub(1,R.clamp(Shaders.sdfRectangle(R.pack2(0.5,0.5),R.pack2(0.46,0.46),{sdfVariant: Shaders.SdfVariant.EXACT}).mul(256),0,1)));
const borderPieza=R.clamp(Shaders.sdfRectangle(R.pack2(0.5,0.5),R.pack2(0.2,0.2),{sdfVariant: Shaders.SdfVariant.EXACT}).mul(2).add(R.pack4(0.5,0.2,0.1,0)),0,1);

function noalpha(v) {
	return R.pack4(v,v,v,1);
}

const bordersPieza=new Array(128);
for (let i=0;i<128;i++) {
	bordersPieza[i]=R.mul(borderPieza,R.pack4(1,1,1,animacionesp[i].tl));
}

//////Inicializacion
var tamBloque;
var anchoPuzzle;
var altoPuzzle;


//Texturas Bloques
const uv = Shaders.fragmentStage(Shaders.vertexAttribute({ variableName: Shaders.VertexAttribute.TEX_COORDS }));

function texturizaPiezas(t) {
	//Piezas
	var nm=0;
	var newuv=uv.div(R.pack2(anchoPuzzle,altoPuzzle));
	for (let i=0;i<anchoPuzzle;i++) for (let j=0;j<altoPuzzle;j++) {
		var newtex=Shaders.textureSampler(t,newuv.add(R.pack2(i/anchoPuzzle,j/altoPuzzle)));
		newtex=Shaders.blend(bordersPieza[nm],newtex,{mode: Shaders.BlendMode.NORMAL});
		materiales[nm++].setTextureSlot(Shaders.DefaultMaterialTextures.DIFFUSE,newtex);
	}
	//Caja
	var p=anchoPuzzle/altoPuzzle*8/10;
	var newuv=(p>=1) ? uv.add(R.pack2(0,-0.5)).mul(R.pack2(1,p)).add(R.pack2(0,0.5)) : uv.add(R.pack2(-0.5,0)).mul(R.pack2(1/p,1)).add(R.pack2(0.5,0));
	Materials.findFirst("materialCajaT").then(function(materialCajaT){
		materialCajaT.setTextureSlot(Shaders.DefaultMaterialTextures.DIFFUSE, Shaders.textureSampler(t,newuv).add(R.pack4(0.1,0.1,0.1,0)));
	});
	
}

//Base
function plataforma() {
	//Casillas puzzle
	const dx=-(anchoPuzzle-1)*tamBloque*0.5, dz=-(altoPuzzle-1)*tamBloque*0.5;
	var np=0,nb=0;
	for (let i=0;i<anchoPuzzle;i++) for (let j=0;j<altoPuzzle;j++) {
		let p=plataformas[np++];
		let x=dx+i*tamBloque, z=dz+j*tamBloque;
		p.hidden=false;
		p.transform.x=x;
		p.transform.z=z;
		p.transform.scaleX=tamBloque*10;
		p.transform.scaleY=tamBloque*10;
	}
	
	//sort aleatorio de las piezas
	const rpiezas=new Array(np);
	for (let i=0;i<np;i++) rpiezas[i]=i;
	rpiezas.sort(function(x,y){return Math.random()-0.5});
	
	//Casillas a los lados
	const sep=tamBloque*(1+sepBloque)
	const sdx=dx-sep, sdz=-(altoPuzzle-1)*sep*0.5+tamBloque*sepBloque/2;
	
	for (let i=0;i<anchoPuzzle*altoPuzzle;i++) {
		let p=plataformas[np];
		let x=(i%2?1:-1)*(sdx-Math.floor(Math.floor(i/2)/altoPuzzle)*sep), z=sdz+(Math.floor(i/2)%altoPuzzle)*sep;
		p.hidden=false;
		p.transform.x=x;
		p.transform.z=z;
		p.transform.scaleX=tamBloque*10;
		p.transform.scaleY=tamBloque*10;
		var npieza=rpiezas[nb++]
		var b=piezas[npieza];
		b.transform.x=x;
		b.transform.y=tamBloque/20;
		b.transform.z=z;
		b.transform.scaleX=tamBloque*10;
		b.transform.scaleY=tamBloque;
		b.transform.scaleZ=tamBloque*10;
		posicionespiezas[npieza]=np++;
		b.hidden=false;
	}
	
	while (np < 256) plataformas[np++].hidden=true;
	while (nb < 128) piezas[nb++].hidden=true;
}

//Inicializacion todo
function inicializaPuzzle(index) {
	terminado=false;
	anchoPuzzle=puzzles[index].x;
	altoPuzzle=puzzles[index].y;
	tamBloque=tamPuzzle/Math.min(anchoPuzzle,altoPuzzle);
	Textures.findFirst(puzzles[index].t).then(function(texp) {
		texturizaPiezas(texp.signal.mul(borderPuzzle));
		plataforma();
	});
}

//////Pantalla Iphone
const defigdesp=-0.155;
const defigdmul=0.5;

Promise.all([Textures.findFirst("ig1"),Textures.findFirst("ig2"),Patches.outputs.getScalar("iphscryo")]).then(function(ig) {
	const iguv=uv.mul(R.pack2(1,defigdmul)).add(R.pack2(0,ig[2].add(defigdesp))).mod(1);
	var newtex=Shaders.textureSampler(ig[1].signal,iguv);
	newtex=Shaders.blend(ig[0].signal,newtex,{mode: Shaders.BlendMode.NORMAL});
	Materials.findFirst("materialPantalla").then(function(mp){mp.setTextureSlot(Shaders.DefaultMaterialTextures.DIFFUSE,newtex);});
});

placerP.then(function(placer){placer.findFirst("pantalla").then(function(pantalla) {
	Patches.outputs.getScalar("iphscryo").then(function(scal){
		TouchGestures.onPan(pantalla).subscribe(function(gesture){
			var prev=scal.pinLastValue()-defigdesp;
			Patches.inputs.setScalar("iphscry",R.max(0,gesture.translation.y.div(-512).add(prev)));
		});
	});
});});

///////Dinamica
function piTouch(n) {
	if (terminado) return;
	if (piezaSeleccionada!=null) {
		animacionesp[piezaSeleccionada].td.stop();
		animacionesp[piezaSeleccionada].td.reset();
		if (piezaSeleccionada==n) {
			piezaSeleccionada=null;
			return;
		}
	}
	piezaSeleccionada=n;
	animacionesp[piezaSeleccionada].td.start();
	sonidos.boton.reset();
	sonidos.boton.setPlaying(true);
}

function plTouch(n) {
	if (piezaSeleccionada==null) return;
	animacionesp[piezaSeleccionada].td.stop();
	animacionesp[piezaSeleccionada].td.reset();
	piezas[piezaSeleccionada].transform.x=plataformas[n].transform.x;
	piezas[piezaSeleccionada].transform.z=plataformas[n].transform.z;
	posicionespiezas[piezaSeleccionada]=n;
	piezaSeleccionada=null;
	sonidos.block.reset();
	sonidos.block.setPlaying(true);
	verificaTerminado();
}

function verificaTerminado() {
	for (let i=0;i<anchoPuzzle*altoPuzzle;i++) {if (posicionespiezas[i]!=i) return;}
	terminado=true;
	sonidos.terminado.reset();
	sonidos.terminado.setPlaying(true);
	Patches.inputs.setPulse("finished",R.once());
}

//Picker
const picker = NativeUI.picker;
picker.configure({
  selectedIndex: 0,
  items: puzzles.map(function(x){return {image_texture: x.ico};})
})

picker.selectedIndex.monitor().subscribe(function(index) {
  inicializaPuzzle(index.newValue);
});