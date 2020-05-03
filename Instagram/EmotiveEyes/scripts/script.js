const Patches = require('Patches');
const Textures = require('Textures');
const Materials = require('Materials');
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;
const slider = NativeUI.slider;

const material = Materials.get('material1');

const nemojis=15;
const defaultIndex = 1;//Math.floor(Math.random()*nemojis);

var emojis=[];
var configuration = {
  selectedIndex: defaultIndex,
  items: []
};


for (let i=0;i<nemojis;i++) {
	emojis.push(Textures.get((i+1).toString()));
	configuration.items.push({image_texture: emojis[i]});
}

picker.configure(configuration);
picker.visible = true;

slider.value=0.1;
slider.visible=true;

material.diffuse=emojis[defaultIndex];

picker.selectedIndex.monitor().subscribe(function(index) {
  material.diffuse=emojis[index.newValue];
});

Patches.setScalarValue("saturation",slider.value.mul(2));
