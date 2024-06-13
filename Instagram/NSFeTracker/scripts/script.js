const tracker = require('./NEStracker');
const chiptunes = [...Array(17).keys()].map(x=>require('./chiptune'+(x+1)));

const Animation = require('Animation');
const Textures = require('Textures');
const Patches = require('Patches');
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;

const loaders = chiptunes.map(x=>tracker.getLoader(x));
const inisong = Math.floor(Math.random()*chiptunes.length);
let m = loaders[inisong]();
Patches.inputs.setScalar("progress", Animation.animate(m, Animation.samplers.linear(0, 1)));
m.start();

Promise.all(chiptunes.map((x,i)=>Textures.findFirst(""+(i+1)))).then(function(t) {
	picker.configure({
		selectedIndex: inisong,
		items: t.map(i=>{return {image_texture:i};})
	});
	picker.visible = true;
	Patches.inputs.setBoolean("extended", picker.selectedIndex.gt(12));
	picker.selectedIndex.monitor().subscribe(function(index) {
		m.stop();
		m = loaders[index.newValue]();
		Patches.inputs.setScalar("progress", Animation.animate(m, Animation.samplers.linear(0, 1)));
		m.start();
	});
});