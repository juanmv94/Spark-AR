const Scene = require('Scene');
const Time = require('Time');
const Materials = require('Materials');
const Textures = require('Textures');
const NativeUI = require('NativeUI');
const Patches = require('Patches');
const R = require('Reactive');

Promise.all([Promise.all(["3dText0","3dText1"].map(x=>Scene.root.findFirst(x))),
		Materials.getAll(),
		Promise.all(["hhmmss1","hhmm1","c1","hhmmss2","hhmm2","c2"].map(tn=>Textures.findFirst(tn))),
		Patches.outputs.getScalar("chronoState")]).then(([objs,mats,t,chronoState])=>{
	changeFun(0);
	
	//Init chrono
	const chronoTime = R.scalarSignalSource("ScalarSource2");
	chronoTime.set(R.ifThenElse(chronoState.eq(0), 0,
			R.ifThenElse(chronoState.eq(1), Time.deltaTimeMS.add(chronoTime.signal.history(1).frame(-1)),
			chronoTime.signal.history(1).frame(-1))));
	const ms=chronoTime.signal.div(10).floor().mod(100).format("{:02.0f}");
	const ss=chronoTime.signal.div(1000).floor().mod(60).format("{:02.0f}:");
	const mm=chronoTime.signal.div(60000).floor().mod(100).format("{:02.0f}:");
	const chronoString=mm.concat(ss).concat(ms);
	
	const picker = NativeUI.picker;
	picker.configure({selectedIndex: 0, items: t.map(i=>({image_texture:i}))});
	picker.visible = true;
	picker.selectedIndex.monitor().subscribe(function(index) {
		const mat=Math.floor(index.newValue/3)
		objs.forEach(o=>o.backMaterial=o.sideMaterial=o.frontMaterial=mats[mat]);
		changeFun(index.newValue%3);
	});

	function changeFun(fn) {
		Patches.inputs.setBoolean("chronoEnabled",fn==2);
		switch(fn) {
			case 0: objs.forEach(o=>o.text="${DATE[timelong]:titlecase}"); break;
			case 1: objs.forEach(o=>o.text="${DATE[timeshort]:titlecase}"); break;
			case 2: objs.forEach(o=>o.text=chronoString); break;
		}
	}
});
