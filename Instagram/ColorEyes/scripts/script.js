const Patches = require('Patches');
const Textures = require('Textures');
const Materials = require('Materials');
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;
const slider = NativeUI.slider;

slider.value=0.25;
Patches.inputs.setScalar("eyesize",slider.value);
slider.visible=true;

Materials.findFirst('material0').then(material=>{
	Promise.all(["green","blue","red","purple","brown","magic","heart","cat"].map(x=>Textures.findFirst(x))).then(eyetextures=>{
		var configuration = {
		  selectedIndex: 0,
		  items: eyetextures.map(function(x){return {image_texture:x};})
		};

		picker.selectedIndex.monitor().subscribe(function(index) {
		  material.diffuse=eyetextures[index.newValue];
		});

		picker.configure(configuration);
		picker.visible = true;
	});
});
