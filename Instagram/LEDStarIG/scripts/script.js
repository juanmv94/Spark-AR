const Patches = require('Patches');
const Textures = require('Textures');
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;

const defaultIndex = 0;
const nopciones=5;

Promise.all([...Array(nopciones).keys()].map(i=>Textures.findFirst("c"+(i+1)))).then(function(t) {
	var configuration = {
	  selectedIndex: defaultIndex,
	  items: t.map(i=>{return {image_texture:i};})
	};
	picker.configure(configuration);
	picker.visible = true;
	Patches.inputs.setScalar("opcion",picker.selectedIndex);
});
