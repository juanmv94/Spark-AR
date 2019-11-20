const Patches = require('Patches');
const Materials = require('Materials');
const Textures = require('Textures');

Patches.getPulseValue("tap").subscribe(function() {Materials.get('material0').diffuse=Textures.get('cameraTexture0').signal});