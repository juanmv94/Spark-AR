function rSwitch(opt,vals,idx=0) {
	if (vals.length==1) return vals[0];
	else {
		const mid=vals.length>>1;
		const subvals=[vals.slice(0,mid),vals.slice(mid)];
		return opt.lt(idx+mid).ifThenElse(rSwitch(opt,subvals[0],idx),rSwitch(opt,subvals[1],idx+mid));
	}
}
