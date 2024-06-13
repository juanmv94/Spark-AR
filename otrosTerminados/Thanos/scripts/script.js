const Textures = require('Textures');
const Patches = require('Patches');
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;

const nfondos=3;
const defaultIndex = 0;

(async function() {
	var configuration = {
	  selectedIndex: defaultIndex,
	  items: [{image_texture: await Textures.findFirst("camara")}]
	};

	for (let i=1;i<=nfondos;i++) {
		configuration.items.push({image_texture: await Textures.findFirst("b"+i)});
	}

	picker.configure(configuration);
	picker.visible = true;

	picker.selectedIndex.monitor().subscribe(function(index) {
	  Patches.inputs.setScalar("fondo",index.newValue);
	});
})();
