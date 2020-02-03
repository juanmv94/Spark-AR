const Materials = require('Materials')
const Textures = require('Textures')
const Time = require('Time')
const Shaders = require('Shaders')
//const CameraInfo = require('CameraInfo')
const R = require('Reactive')
const Animation = require('Animation')
//const Diagnostics = require('Diagnostics')
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;

const sharpness=256;

const mat=Materials.get('material0')
const cameraColor = Textures.get('cameraTexture0').signal
const uv = Shaders.fragmentStage(Shaders.vertexAttribute({ variableName: Shaders.VertexAttribute.TEX_COORDS }))

//const resol = R.pack2(CameraInfo.previewSize.width, CameraInfo.previewSize.height)

function limit(v) {
	return R.max(R.min(v,1),0)
}

function tile(resx,resy,x,y,nx,ny)
{
	var sx=(1/resx)
	var sy=(1/resy)
	var newuv=uv.add(R.pack2(R.sub(x,nx).mul(sx),R.sub(y,ny).mul(sy)))
	var newtex=Shaders.textureSampler(cameraColor, newuv )
	newtex=newtex.mul(R.sub(1,limit(Shaders.sdfRectangle(R.pack2(R.mul(sx,nx).sum(sx/2),R.mul(sy,ny).sum(sy/2)),R.pack2(0.98*sx/2,0.98*sy/2),{sdfVariant: Shaders.SdfVariant.EXACT}).mul(sharpness))))
	return newtex
}

//Dinamica
var arrpos

function inicializa(nresx,nresy,ntime,nmovs,vmovs) {
	var ntiles=nresx*nresy-1
	
	function toMatr(i)
	{
		return [i%nresx,Math.floor(i/nresx)]
	}
	
	//calculamos movimientos
	var movimientos=new Array(ntiles)
	for (let i=0;i<ntiles;i++) movimientos[i]=[]
	var tablero=new Array(nresx*nresy)
	for (let i=0;i<=ntiles;i++) tablero[i]=i
	var lastpieza=null;
	for (let i=0;i<nmovs;i++) {
		var posvacia=tablero.indexOf(ntiles)
		var posvaciam=toMatr(posvacia)
		var posiblesmovimientos=[]
		
		if (posvaciam[0]>0 && tablero[posvacia-1]!==lastpieza)
			posiblesmovimientos.push({pieza: tablero[posvacia-1], origen: posvacia-1, destino: posvacia, mov: 'r'})
		if (posvaciam[0]<(nresx-1) && tablero[posvacia+1]!==lastpieza)
			posiblesmovimientos.push({pieza: tablero[posvacia+1], origen: posvacia+1, destino: posvacia, mov: 'l'})
		if (posvaciam[1]>0 && tablero[posvacia-nresx]!==lastpieza)
			posiblesmovimientos.push({pieza: tablero[posvacia-nresx], origen: posvacia-nresx, destino: posvacia, mov: 'd'})
		if (posvaciam[1]<(nresx-1) && tablero[posvacia+nresx]!==lastpieza)
			posiblesmovimientos.push({pieza: tablero[posvacia+nresx], origen: posvacia+nresx, destino: posvacia, mov: 'u'})
		
		var movimiento=posiblesmovimientos[Math.floor(Math.random()*posiblesmovimientos.length)]
		tablero[movimiento.destino]=movimiento.pieza
		tablero[movimiento.origen]=ntiles
		lastpieza=movimiento.pieza;
		movimientos[movimiento.pieza].push({time: i, mov: movimiento.mov})
	}
	
	/////////////////
	
	var timeDriver = Animation.timeDriver({durationMilliseconds: ntime, loopCount: Infinity, mirror: true})
    var linearSampler = Animation.samplers.easeInOutQuad(0,nmovs+vmovs*2)
	var timeline = Animation.animate(timeDriver,linearSampler)

	var finalColor=null;
	for (let i=0;i<ntiles;i++) {
		defpos=toMatr(i)
		var nx=R.val(defpos[0])
		var ny=R.val(defpos[1])
		//Diagnostics.log("-"+i)
		movimientos[i].forEach(function (v){
			//Diagnostics.log(v)
			switch(v.mov) {
				case 'r':
				nx=nx.sum(limit(timeline.sub(v.time+vmovs)))
				break
				case 'l':
				nx=nx.sub(limit(timeline.sub(v.time+vmovs)))
				break
				case 'd':
				ny=ny.sum(limit(timeline.sub(v.time+vmovs)))
				break
				case 'u':
				ny=ny.sub(limit(timeline.sub(v.time+vmovs)))
				break
			}
		})
		var newtex=tile(nresx,nresy,defpos[0],defpos[1],nx,ny)
		finalColor=(finalColor==null) ? newtex : Shaders.blend(finalColor,newtex,{mode: Shaders.BlendMode.NORMAL})
	}
	finalColor=Shaders.blend(finalColor,R.pack4(0,0,0,1),{mode: Shaders.BlendMode.NORMAL})
	mat.setTexture(finalColor, { textureSlotName: Shaders.DefaultMaterialTextures.DIFFUSE })
	timeDriver.start()
}

function inicializaPar(p) {
	switch(p) {
		case 0:
		inicializa(3,3,7000,20,2)
		break
		case 1:
		inicializa(3,4,7000,25,2)
		break
		case 2:
		inicializa(4,4,10000,40,3)
		break
		case 3:
		inicializa(4,5,10000,45,3)
		break
	}
}

picker.configure({
  selectedIndex: 1,
  items: [{image_texture: '33'},{image_texture: '34'},{image_texture: '44'},{image_texture: '45'}]
})

picker.selectedIndex.monitor().subscribe(function(index) {
  inicializaPar(index.newValue);
});

inicializaPar(1)
picker.visible = true;