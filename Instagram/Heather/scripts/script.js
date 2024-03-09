const galleryTex2Scr = require('./galleryTex2Scr.js')
const Textures = require('Textures');
const Materials = require('Materials');
const Scene = require('Scene');
const Shaders = require('Shaders');
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;
const slider = NativeUI.slider;

const ncolores=11;
const defaultIndex = 0;

const minop = 0.1;
const maxop = 0.4;
const defop = 0.5;

Materials.findFirst('material0').then(function(material) {
	Promise.all([...Array(ncolores).keys()].map(i=>Textures.findFirst(""+i))).then(function(t) {
		var configuration = {
		  selectedIndex: defaultIndex,
		  items: t.map(i=>{return {image_texture:i};})
		};
		picker.configure(configuration);
		picker.visible = true;
		
		slider.value=defop;
		slider.visible=true;

		material.diffuse=t[defaultIndex];
		material.opacity=slider.value.mul(maxop-minop).add(minop);
		
		picker.selectedIndex.monitor().subscribe(function(index) {
		  material.diffuse=t[index.newValue];
		});
	});
});

Promise.all([Textures.findFirst("galleryTexture0"), Materials.findFirst('material1'), Scene.root.findFirst('rectangle1')]).then(([gt,mat,rec])=>gt.onMediaChange.subscribe(x=>{
	let [uv]=galleryTex2Scr(gt);
	mat.setTextureSlot(Shaders.DefaultMaterialTextures.DIFFUSE, Shaders.textureSampler(gt.signal, uv));
	rec.hidden=false;
}));