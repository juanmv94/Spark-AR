const galleryTex2Scr = require('./galleryTex2Scr.js');
const Materials = require('Materials');
const Scene = require('Scene');
const Shaders = require('Shaders');
const Textures = require('Textures');

Promise.all([Textures.findFirst("galleryTexture0"), Materials.findFirst('material0'), Scene.root.findFirst('rectangle0')]).then(([gt,mat,rec])=>gt.onMediaChange.subscribe(x=>{
	let [uv]=galleryTex2Scr(gt);
	mat.setTextureSlot(Shaders.DefaultMaterialTextures.DIFFUSE, Shaders.textureSampler(gt.signal, uv));
	rec.hidden=false;
}));