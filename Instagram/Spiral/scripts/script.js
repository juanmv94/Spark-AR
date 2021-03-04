const Patches = require('Patches');
const NativeUI = require('NativeUI');
const slider = NativeUI.slider;
const picker = NativeUI.picker;
const colorMap = [0,0.1,0.3,0.55,0.65,0.8,0.9];
const defIndex=Math.floor(Math.random()*7);

slider.value=0.5;
slider.value.monitor().subscribe(function(v) {
	Patches.inputs.setScalar("slider",v.newValue);
});
Patches.inputs.setScalar("slider",0.5);

picker.configure({
  selectedIndex: defIndex,
  items: [{image_texture: 'c1'},{image_texture: 'c2'},{image_texture: 'c3'},{image_texture: 'c4'},{image_texture: 'c5'},{image_texture: 'c6'},{image_texture: 'c7'}]
});
picker.selectedIndex.monitor().subscribe(function(v) {
  Patches.inputs.setScalar("color",colorMap[v.newValue]);
});
Patches.inputs.setScalar("color",colorMap[defIndex]);

slider.visible=true;
picker.visible=true;