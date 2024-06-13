const Animation = require('Animation');
const Diagnostics = require('Diagnostics');
const Patches = require('Patches');

const chiptune = require('./chiptune');

Patches.outputs.getScalar("frame").then(f=>{
	const dr = Animation.valueDriver(f, 0, chiptune.mrows-1);
	for (let d in chiptune.mdata) {
		const s=Animation.samplers.sequence({knots: [...Object.keys(chiptune.mdata[d]).map(x=>parseInt(x)),chiptune.mrows], samplers: Object.values(chiptune.mdata[d]).map(x=>Animation.samplers.constant(x))});
		Patches.inputs.setScalar(d, Animation.animate(dr, s));
	}
});