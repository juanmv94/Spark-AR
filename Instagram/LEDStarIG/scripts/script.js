const Patches = require('Patches');
const Textures = require('Textures');
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;
const slider = NativeUI.slider;
slider.value=0.5;

const defaultIndex = 1;
const nopciones=5;

Promise.all([Textures.findFirst("textinp"),...[...Array(nopciones).keys()].map(i=>Textures.findFirst("c"+(i+1)))]).then(function(t) {
	var configuration = {
	  selectedIndex: defaultIndex,
	  items: t.map(i=>{return {image_texture:i};})
	};
	picker.configure(configuration);
	picker.visible = true;
});

var editmode=false;
var texto='';

Patches.outputs.getString("kbtext").then(kbtext=>kbtext.monitor().subscribe(t=>{
	texto=t.newValue;
	if (editmode) actualizatextoedicion();
}));

function actualizatextoedicion() {
	let i=0;
	let substrtext=texto.length>4?texto.substr(texto.length-4):texto;
	while (i<4 && i<substrtext.length) Patches.inputs.setScalar("char"+i,substrtext.charCodeAt(i++)-32);
	Patches.inputs.setScalar("char"+i,"_".charCodeAt(0)-32);
	while (++i<5) Patches.inputs.setScalar("char"+i,0);
}

function rSwitch(opt,vals,idx=0) {
	if (vals.length==1) return vals[0];
	else {
		const mid=vals.length>>1;
		const subvals=[vals.slice(0,mid),vals.slice(mid)];
		return opt.lt(idx+mid).ifThenElse(rSwitch(opt,subvals[0],idx),rSwitch(opt,subvals[1],idx+mid));
	}
}

Patches.outputs.getScalar("animprogress").then(ap=> picker.selectedIndex.monitor().subscribe(function(index) {
	if (index.newValue) Patches.inputs.setScalar("opcion",index.newValue-1);
	if (!index.newValue !== editmode) {
		editmode=!editmode;
		
		if (editmode) {
			Patches.inputs.setScalar("offset",0);
			Patches.inputs.setBoolean("animenabled",false);
			actualizatextoedicion();
			Patches.inputs.setBoolean("modotexto",true);
			slider.visible=false;
		} else {
			if (texto.length) {
				mitexto="     "+texto+" ";
				var timeline = ap.mul(mitexto.length);
				Patches.inputs.setScalar("offset",timeline.mod(1));
				var chararrs=[[],[],[],[],[],[]];
				for (let i=0;i<mitexto.length;i++) for (let j=Math.min(i,5);j>=0;j--) chararrs[j].push(mitexto.charCodeAt(i)-32); 
				for (i=0;i<6;i++) Patches.inputs.setScalar("char"+i,rSwitch(timeline,chararrs[i]));
				Patches.inputs.setScalar("animduration",slider.value.mul(0.35).add(0.15).mul(mitexto.length));
				Patches.inputs.setBoolean("animenabled",true);
				slider.visible=true;
			} else {
				Patches.inputs.setBoolean("modotexto",false);
			}
		}
	}
}));