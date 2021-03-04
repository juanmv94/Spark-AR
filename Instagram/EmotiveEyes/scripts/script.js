const Patches = require('Patches');
const Textures = require('Textures');
const Materials = require('Materials');
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;
const slider = NativeUI.slider;

const nemojis=15;
const defaultIndex = 1;//Math.floor(Math.random()*nemojis);

Materials.findFirst('material1').then(function(material) {
	Promise.all([...Array(nemojis).keys()].map(i=>Textures.findFirst((i+1).toString()))).then(function(emojis) {
		var configuration = {
		  selectedIndex: defaultIndex,
		  items: emojis.map(i=>{return {image_texture:i};})
		};
		picker.configure(configuration);
		picker.visible = true;

		slider.value=0.1;
		slider.visible=true;

		material.diffuse=emojis[defaultIndex];

		picker.selectedIndex.monitor().subscribe(function(index) {
		  material.diffuse=emojis[index.newValue];
		});

		Patches.inputs.setScalar("saturation",slider.value.mul(2));
	});
});
