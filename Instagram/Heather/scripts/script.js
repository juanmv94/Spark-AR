const Scene = require('Scene');
const TouchGestures = require('TouchGestures');
const Textures = require('Textures');
const Materials = require('Materials');
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;
const material = Materials.get('material0');
const rectangulo = Scene.root.find('rectangle0');

const ncolores=11;
const defaultIndex = 0;

const despop = 400;
const minop = 0.1;
const maxop = 0.4;
const defop = 0.25;

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

material.diffuse=colores[defaultIndex];
material.opacity=defop;

picker.selectedIndex.monitor().subscribe(function(index) {
  material.diffuse=colores[index.newValue];
});

TouchGestures.onPan(rectangulo).subscribe(function (gesture) {
	material.opacity=gesture.translation.y.smoothStep(-despop,despop).mul(maxop-minop).add(minop);
});