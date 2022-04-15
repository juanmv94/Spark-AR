export const Patches = require('Patches')
const nsongs=21

function rSwitch(opt,vals,idx=0) {
	if (vals.length==1) return vals[0];
	else {
		const mid=vals.length>>1;
		const subvals=[vals.slice(0,mid),vals.slice(mid)];
		return opt.lt(idx+mid).ifThenElse(rSwitch(opt,subvals[0],idx),rSwitch(opt,subvals[1],idx+mid));
	}
}

var s=[...Array(nsongs).keys()]
s.sort((a,b)=>!a?-1:!b?1:Math.random()-0.5)
Patches.outputs.getScalar("counter0").then(c0=>Patches.inputs.setScalar("random0",rSwitch(c0.mul(2),s)))
Patches.outputs.getScalar("counter1").then(c1=>Patches.inputs.setScalar("random1",rSwitch(c1.mul(2).add(1),s)))

