const Patches = require('Patches');
const Textures = require('Textures');
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;

const defaultIndex = 0;
const nopciones=4;

var configuration = {
  selectedIndex: defaultIndex,
  items: []
};

for (let i=1;i<=nopciones;i++) {
	configuration.items.push({image_texture: Textures.get(""+i)});
}

picker.configure(configuration);
picker.visible = true;

picker.selectedIndex.monitor().subscribe(function(index) {
  Patches.setScalarValue("opcion",index.newValue);
});