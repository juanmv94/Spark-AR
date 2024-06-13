// NEStracker for Meta Spark by @Juanmv94

const Animation = require('Animation');
const Patches = require('Patches');

function getLoader(o, loopCount=Infinity) {
	const mdata = {sq3f:{0:0},sq3v:{0:0},sq3d:{0:0},sq3e:{0:0},sq4f:{0:0},sq4v:{0:0},sq4d:{0:0},sq4e:{0:0},sawf:{0:0},sawv:{0:0},sawe:{0:0},...o.mdata};
	const timeDriver = Animation.timeDriver({durationMilliseconds: o.mrows*o.mspeed, loopCount, mirror: false});
	const msignals = {}
	for (let d in mdata) {
		const s=Animation.samplers.sequence({knots: [...Object.keys(mdata[d]).map(x=>parseInt(x)),o.mrows], samplers: Object.values(mdata[d]).map(x=>Animation.samplers.constant(x))});
		msignals[d]=Animation.animate(timeDriver, s)
	}
	const load = ()=>{
		for (let s in msignals) Patches.inputs.setScalar(s, msignals[s]);
		return timeDriver;
	};
	return load;
}

module.exports = {getLoader}