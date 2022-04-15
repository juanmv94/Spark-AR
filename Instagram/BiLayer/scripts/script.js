const Textures = require('Textures');
const Patches = require('Patches');

Textures.findFirst("galleryTexture0").then(function(gt){
	Patches.inputs.setBoolean("gt",gt.state.eq("AVAILABLE"));
});