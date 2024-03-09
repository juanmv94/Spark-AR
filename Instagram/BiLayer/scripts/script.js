const galleryTex2Scr = require('./galleryTex2Scr.js');
const Materials = require('Materials');
const Shaders = require('Shaders');
const Textures = require('Textures');
const Patches = require('Patches');

Promise.all([Textures.findFirst("galleryTexture0"), Materials.findFirst('material0')]).then(([gt,mat])=>gt.onMediaChange.subscribe(x=>{
	Patches.inputs.setBoolean("gt",true);
	let [uv]=galleryTex2Scr(gt);
	mat.setTextureSlot(Shaders.DefaultMaterialTextures.DIFFUSE, Shaders.textureSampler(gt.signal, uv));
}));