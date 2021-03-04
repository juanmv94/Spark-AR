const Materials = require('Materials');
const Textures = require('Textures');
const Scene = require('Scene');
const Shaders = require('Shaders');
const R = require('Reactive');
const Patches = require('Patches');

const res=[8,8];
const elbychan=4;

const resdivpack=R.pack2(1/res[0],1/res[1]);
const uv = Shaders.fragmentStage(Shaders.vertexAttribute({ variableName: Shaders.VertexAttribute.TEX_COORDS }));

function valuemask(channel,from,to) {
	return R.min(R.clamp(R.fromRange(channel,from,from),0,1),R.sub(1,R.clamp(R.fromRange(channel,to,to),0,1)));
}

export var a=2;
Promise.all([Materials.findFirst('material0'),Textures.findFirst('ios'),Textures.findFirst('cameraTexture0'),
		Patches.outputs.getScalar("screenx"),Patches.outputs.getScalar("screeny"),Patches.outputs.getScalar("pinch")]).then(function(e) {	
	const prop=R.pack2(e[3].div(e[4]),1);
	const pinch=e[5];
	const pinchuv=uv.div(pinch).mul(prop);
	
	const mat=e[0];
	const tex=e[1].signal;
	const camtex=e[2].signal;
	const pixcamtex=Shaders.textureSampler(camtex, R.floor(pinchuv.div(resdivpack)).mul(resdivpack).div(prop).mul(pinch));
				
	function getEmojiUV(p) {
		var x=p%res[0];
		var y=Math.floor(p/res[0]);
		return pinchuv.mod(resdivpack).add(resdivpack.mul(R.pack2(x,y)));
	}

	//Create layers
	var lay=new Array(elbychan*elbychan*elbychan);
	var div=1/elbychan;
	var n=0;
	for (let a=0;a<elbychan;a++) {
		var laya=valuemask(pixcamtex.z,div*a,div*(a+1));
		for (let b=0;b<elbychan;b++) {
			var layb=valuemask(pixcamtex.y,div*b,div*(b+1)).mul(laya);
			for (let c=0;c<elbychan;c++) {
				var layc=valuemask(pixcamtex.x,div*c,div*(c+1)).mul(layb);
				//var emoji=getEmojiTex(n);
				//lay[n++]=R.pack4(emoji.x,emoji.y,emoji.z,emoji.w.mul(layc));
				lay[n]=layc.mul(getEmojiUV(n));
				n++;
			}
		}
	}
	
	//Blend2n
	n=elbychan*elbychan*elbychan;
	var ori=lay;
	while (n>1) {
		n/=2;
		var dest=new Array(n);
		for (var i=0;i<n;i++) dest[i]=R.max(ori[i],ori[i+n]);
		ori=dest;
	}
	var blend2n=Shaders.composition(tex,ori[0]);
	
	//var finalColor=Shaders.blend(blend2n(),pixcamtex,{mode: Shaders.BlendMode.NORMAL})
	var finalColor=Shaders.blend(blend2n,R.pack4(1,1,1,0.85),{mode: Shaders.BlendMode.NORMAL});
	mat.setTextureSlot(Shaders.DefaultMaterialTextures.DIFFUSE,finalColor);
});