const Patches = require('Patches');
const Textures = require('Textures');
const Materials = require('Materials');
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;
const slider = NativeUI.slider;

slider.value=0.25;
Patches.setScalarValue("eyesize",slider.value);
slider.visible=true;

const eyetextures=["green","blue","red","purple","brown","magic","heart","cat"].map(function(x){return Textures.get(x);});

var configuration = {
  selectedIndex: 0,
  items: eyetextures.map(function(x){return {image_texture:x};})
};

const material = Materials.get('material0');

picker.selectedIndex.monitor().subscribe(function(index) {
  material.diffuse=eyetextures[index.newValue];
});

picker.configure(configuration);
picker.visible = true;