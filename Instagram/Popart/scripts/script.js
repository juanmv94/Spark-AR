const Patches = require('Patches');
const Textures = require('Textures');
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;

const defaultIndex = 0;
const nopciones=4;

Promise.all([...Array(nopciones).keys()].map(i=>Textures.findFirst(""+(i+1)))).then(function(t) {
	var configuration = {
	  selectedIndex: defaultIndex,
	  items: t.map(i=>{return {image_texture:i};})
	};
	picker.configure(configuration);
	picker.visible = true;
});

picker.selectedIndex.monitor().subscribe(function(index) {
  Patches.inputs.setScalar("opcion",index.newValue);
});