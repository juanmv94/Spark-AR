const Scene = require('Scene');
const Patches = require('Patches');
const Textures = require('Textures');
const Materials = require('Materials');

const material=Materials.get('material0');

var nfondos=7;
var fondos=[];
var index=0;


for (let i=0;i<nfondos;i++) {
	fondos.push(Textures.get((i+1).toString()));
}
/*
Array.prototype.mezclar = function () {
	var n = this.length;
	while (n--) {
		var i = Math.floor(n * Math.random());
		var tmp = this[i];
		this[i] = this[n];
		this[n] = tmp;
		}
	return this;
}

fondos.mezclar();
*/
material.diffuse=fondos[index];
Patches.getPulseValue("tap").subscribe(function() {
	index=(++index%nfondos);
	material.diffuse=fondos[index];
});

