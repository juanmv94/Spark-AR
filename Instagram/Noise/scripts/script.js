const Materials = require('Materials');
const NativeUI = require('NativeUI');
const slider = NativeUI.slider;

const material = Materials.get('material0');

const minop = 0.3;
const maxop = 0.7;
const defop = 0.5;

slider.value=defop;
slider.visible=true;

material.opacity=slider.value.mul(maxop-minop).add(minop);
