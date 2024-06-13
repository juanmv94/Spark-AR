const tracker = require('./NEStracker');
const chiptune1 = require('./chiptune1');
const chiptune2 = require('./chiptune2');
const chiptune3 = require('./chiptune3');
const chiptune4 = require('./chiptune4');

const Textures = require('Textures');
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;

const loaders = [chiptune1,chiptune2,chiptune3,chiptune4].map(x=>tracker.getLoader(x));
let m = loaders[0]();
m.start();

Promise.all([...Array(4).keys()].map(i=>Textures.findFirst(""+i))).then(function(t) {
	picker.configure({
		selectedIndex: 0,
		items: t.map(i=>{return {image_texture:i};})
	});
	picker.visible = true;

	picker.selectedIndex.monitor().subscribe(function(index) {
		m.stop();
		m = loaders[index.newValue]();
		m.start();
	});
});