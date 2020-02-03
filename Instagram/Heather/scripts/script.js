const Scene = require('Scene');
const Textures = require('Textures');
const Materials = require('Materials');
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;
const slider = NativeUI.slider;

const material = Materials.get('material0');
const rectangulo = Scene.root.find('rectangle0');

const ncolores=11;
const defaultIndex = 0;

const minop = 0.1;
const maxop = 0.4;
const defop = 0.5;

var colores=[];
var configuration = {
  selectedIndex: defaultIndex,
  items: []
};


for (let i=0;i<ncolores;i++) {
	colores.push(Textures.get(i.toString()));
	configuration.items.push({image_texture: colores[i]});
}

picker.configure(configuration);
picker.visible = true;

slider.value=defop;
slider.visible=true;

material.diffuse=colores[defaultIndex];
material.opacity=defop;

picker.selectedIndex.monitor().subscribe(function(index) {
  material.diffuse=colores[index.newValue];
});

material.opacity=slider.value.mul(maxop-minop).add(minop);
