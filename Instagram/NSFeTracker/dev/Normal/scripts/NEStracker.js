// NEStracker for Meta Spark by @Juanmv94

const Animation = require('Animation');
const Patches = require('Patches');

function getLoader(o, loopCount=Infinity) {
	const timeDriver = Animation.timeDriver({durationMilliseconds: o.mrows*o.mspeed, loopCount, mirror: false});
	const msignals = {}
	for (let d in o.mdata) {
		const s=Animation.samplers.sequence({knots: [...Object.keys(o.mdata[d]).map(x=>parseInt(x)),o.mrows], samplers: Object.values(o.mdata[d]).map(x=>Animation.samplers.constant(x))});
		msignals[d]=Animation.animate(timeDriver, s)
	}
	const load = ()=>{
		for (let s in msignals) Patches.inputs.setScalar(s, msignals[s]);
		return timeDriver;
	};
	return load;
}

module.exports = {getLoader}