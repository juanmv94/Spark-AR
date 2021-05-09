const R = require('Reactive')
const Textures = require('Textures');
const Patches = require('Patches');
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

Textures.findFirst("galleryTexture0").then(function(gt){
	Patches.inputs.setBoolean("gt",gt.state.eq("AVAILABLE"));
});
