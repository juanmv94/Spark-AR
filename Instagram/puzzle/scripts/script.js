const galleryTex2Scr = require('./galleryTex2Scr.js')
const Materials = require('Materials')
const Textures = require('Textures')
const Shaders = require('Shaders')
const R = require('Reactive')
const Animation = require('Animation')
const NativeUI = require('NativeUI')
const picker = NativeUI.picker

var uv = Shaders.vertexAttribute({variableName: Shaders.VertexAttribute.TEX_COORDS}), prop2=R.pack2(1,1)
const sharpness=256
var mat, cameraColor
Promise.all([Materials.findFirst('material0'),Textures.findFirst('cameraTexture0'),Textures.findFirst("galleryTexture0")]).then(function(pr){
	mat=pr[0]
	cameraColor=pr[1].signal
	pr[2].onMediaChange.subscribe(function(x){
		cameraColor=pr[2].signal;
		[uv,prop2]=galleryTex2Scr(pr[2])
		inicializaPar(1)
	})
	inicializaPar(1)
	
	picker.configure({
	  selectedIndex: 0,
	  items: [/*{image_texture: '33'},*/{image_texture: '34'},{image_texture: '44'},{image_texture: '45'}]
	})
	picker.selectedIndex.monitor().subscribe(function(index) {
	  inicializaPar(index.newValue+1)
	})
	picker.visible = true
})

function limit(v) {
	return R.clamp(v,0,1)
}

function tile(resx,resy,x,y,nx,ny) {
	var sx=(1/resx)
	var sy=(1/resy)
	var newuv=uv.add(R.pack2(R.sub(x,nx).mul(prop2.x.mul(sx)),R.sub(y,ny).mul(prop2.y.mul(sy))))
	var newtex=Shaders.textureSampler(cameraColor, newuv)
	newtex=newtex.mul(R.sub(1,limit(Shaders.sdfRectangle(R.pack2(R.mul(sx,nx).sum(sx/2),R.mul(sy,ny).sum(sy/2)),R.pack2(0.98*sx/2,0.98*sy/2),{sdfVariant: Shaders.SdfVariant.EXACT}).mul(sharpness))))
	return newtex
}

//Dinamica
var arrpos

function inicializa(nresx,nresy,ntime,nmovs,vmovs) {
	var ntiles=nresx*nresy-1
	
	function toMatr(i) {
		return [i%nresx,Math.floor(i/nresx)]
	}
	
	//calculamos movimientos
	var movimientos=new Array(ntiles)
	for (let i=0;i<ntiles;i++) movimientos[i]=[]
	var tablero=new Array(nresx*nresy)
	for (let i=0;i<=ntiles;i++) tablero[i]=i
	var lastpieza=null
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
		if (posvaciam[1]<(nresy-1) && tablero[posvacia+nresx]!==lastpieza)
			posiblesmovimientos.push({pieza: tablero[posvacia+nresx], origen: posvacia+nresx, destino: posvacia, mov: 'u'})
		
		var movimiento=posiblesmovimientos[Math.floor(Math.random()*posiblesmovimientos.length)]
		tablero[movimiento.destino]=movimiento.pieza
		tablero[movimiento.origen]=ntiles
		lastpieza=movimiento.pieza
		movimientos[movimiento.pieza].push({time: i, mov: movimiento.mov})
	}
	
	/////////////////
	
	var timeDriver = Animation.timeDriver({durationMilliseconds: ntime, loopCount: Infinity, mirror: true})
    var linearSampler = Animation.samplers.easeInOutQuad(0,nmovs+vmovs*2)
	var timeline = Animation.animate(timeDriver,linearSampler)

	var finalColor=null
	for (let i=0;i<ntiles;i++) {
		var defpos=toMatr(i)
		var nx=R.val(defpos[0])
		var ny=R.val(defpos[1])
		movimientos[i].forEach(function (v){
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
	mat.setTextureSlot(Shaders.DefaultMaterialTextures.DIFFUSE, finalColor)
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
