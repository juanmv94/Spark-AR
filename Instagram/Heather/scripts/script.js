const Textures = require('Textures');
const Materials = require('Materials');
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
