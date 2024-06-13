const Animation = require('Animation');
const Patches = require('Patches');
const R = require('Reactive');
//export const Diagnostics = require('Diagnostics');

const cpos = [[45,-26],[46,-26],[46,-26],[47,-26],[47,-26],[48,-26],[48,-26],[48,-26],[48,-26],[48,-26],[48,-26],[47,-26],[46,-26],[44,-26],[43,-26],[41,-26],[39,-26],[37,-26],[35,-26],[33,-26],[32,-26],[31,-26],[30,-26],[29,-26],[28,-26],[28,-26],[28,-26],[28,-26],[28,-26],[28,-26],[28,-26],[27,-26],[26,-26],[25,-26],[24,-26],[23,-26],[23,-26],[22,-26],[21,-26],[20,-26],[20,-26],[19,-26],[19,-26],[19,-26],[19,-26],[18,-26],[18,-26],[17,-26],[16,-26],[16,-26],[15,-26],[14,-26],[14,-26],[13,-26],[13,-26],[12,-25],[11,-25],[11,-25],[10,-25],[9,-25],[9,-25],[8,-25],[8,-25],[7,-25],[7,-25],[5,-25],[4,-25],[2,-25],[0,-25],[0,-25],[-1,-25]];

const l = cpos.length * 2;

const timeDriver=Animation.timeDriver({durationMilliseconds: 10000, loopCount: Infinity,  mirror: true});

const frameSampler=Animation.samplers.frame(l);
const cposxSampler = Animation.samplers.sequence({samplers:cpos.map(([x,y])=>Animation.samplers.constant(x/550))});
const cposySampler = Animation.samplers.sequence({samplers:cpos.map(([x,y])=>Animation.samplers.constant(y/550))});

Patches.outputs.getScalar("desp").then(desp=>{
	const d = R.ifThenElse(desp.ge(0), desp, Animation.animate(timeDriver, Animation.samplers.easeInOutSine(-0.1,1.1)));
	const valueDriver = Animation.valueDriver(d, 0, 1);
	Patches.inputs.setPoint2D("cpos", R.point2d(Animation.animate(valueDriver, cposxSampler), Animation.animate(valueDriver, cposySampler)));
	Patches.inputs.setScalar("frame", Animation.animate(valueDriver, frameSampler));
	timeDriver.start();
});
