const galleryTex2Scr = require('./galleryTex2Scr.js')
const R = require('Reactive')
const Textures = require('Textures');
const Materials = require('Materials');
const Patches = require('Patches');
const Shaders = require('Shaders');
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;

const nluts=14;
const defaultIndex = 0;

Promise.all([...Array(nluts).keys()].map(i=>Textures.findFirst(""+i))).then(function(t) {
	var configuration = {
	  selectedIndex: defaultIndex,
	  items: t.map(i=>{return {image_texture:i};})
	};
	picker.configure(configuration);
	picker.visible = true;
	Patches.inputs.setScalar("op",picker.selectedIndex);
});

Promise.all([Textures.findFirst("galleryTexture0"), Materials.findFirst('material0')]).then(([gt,mat])=>gt.onMediaChange.subscribe(x=>{
	let [uv]=galleryTex2Scr(gt);
	mat.setTextureSlot(Shaders.DefaultMaterialTextures.DIFFUSE, Shaders.textureSampler(gt.signal, uv));
	Patches.inputs.setBoolean("gt",true);
}));
