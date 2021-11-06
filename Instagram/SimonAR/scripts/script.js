const Scene = require('Scene');
const TouchGestures = require('TouchGestures');
const Patches = require('Patches');
const R = require('Reactive');
const Diagnostics = require('Diagnostics');
const Time = require('Time');

//TOUCH HANDLER
var firsttouch = false;
var touchf = ()=>firsttouch=true;
Promise.all([...Array(4).keys()].map(x=>Scene.root.findFirst('quart'+x))).then(qs=>{
	qs.forEach((q,i)=>{
		TouchGestures.onTap(q).subscribe(gesture=>touchf(i));
	});
});
const getTouch = ()=>new Promise((resolve,reject)=>touchf=resolve);

const sleep = t=>new Promise((resolve,reject)=>Time.setTimeout(resolve, t)); 

(async function() { // Enable async/await in JS [part 1]
	await Patches.inputs.setString("text0","Tap face\nto start");
	var i=0;
	while (!firsttouch) {
		await Patches.inputs.setString("text1","Simon AR\nby @Juanmv94".substr(0,i));
		await sleep(50);
		i=(i+1)%48;
	}
	var correct=true, moves=[Math.floor(Math.random()*4), Math.floor(Math.random()*4)];
	i=0;
	while (correct) {
		await Patches.inputs.setString("text0","Level "+(++i));
		await Patches.inputs.setString("text2","Simon's\nturn");
		await Patches.inputs.setString("text1","x0");
		await sleep(200);
		moves.push(Math.floor(Math.random()*4));
		for (let m=0 ; m<moves.length ; m++) {
			await Patches.inputs.setPulse("quart"+moves[m], R.once());
			await Patches.inputs.setString("text1","x"+(m+1));
			await sleep(800);
		}
		await Patches.inputs.setString("text2","Your\nturn");
		await Patches.inputs.setString("text1","x0");
		for (let m=0 ; m<moves.length ; m++) {
			var touched=await getTouch();
			await Patches.inputs.setPulse("quart"+touched, R.once());
			if (moves[m]==touched) {
				await Patches.inputs.setString("text1","x"+(m+1));
			} else {
				await Patches.inputs.setString("text1","Oops!");
				await Patches.inputs.setString("text2","Game\nOver");
				correct=false;
				break;
			}
		}
		await sleep(800);
	}
	while (1) {
		var touched=await getTouch();
		await Patches.inputs.setPulse("quart"+touched, R.once());
	}
})();