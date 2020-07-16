const Patches = require('Patches');
const R = require('Reactive');
const NativeUI = require('NativeUI');
const soap=[
"LIGHTBBRCZ",
"KSAMUTEXEA",
"LPEHMKDLCX",
"TAELCITRAP",
"NRIATCEFFE",
"EKRRTCEJBO",
"MTTTEXTURE",
"GAVPSTUDIO",
"UHCTAPAHYM",
"ATARGETMPR"
];
const soapSize=soap.length;

Patches.inputs.setScalar("SoapSize",10).then(function() {
	NativeUI.setText('text0','');
    Patches.outputs.getPulse("tap").then(function(t) {t.subscribe(function() {NativeUI.enterTextEditMode('text0');});});
	NativeUI.getText('text0').monitor().subscribe(function(textUpdate){
		var t=textUpdate.newValue.toUpperCase();
		for (let x=0;x<soapSize;x++) for (let y=0;y<soapSize;y++) {
			if (checkr(x,y,t)) return;
			if (checkd(x,y,t)) return;
			if (checkl(x,y,t)) return;
			if (checku(x,y,t)) return;
			if (checkrd(x,y,t)) return;
			if (checkru(x,y,t)) return;
			if (checkld(x,y,t)) return;
			if (checklu(x,y,t)) return;
		}
		line(0,0,0,0);	//not found
	});
});

function line(x,y,l,a) {
	Patches.inputs.setColor("SoapPosition",R.RGBA(x,y,l*((a%2)?Math.sqrt(2):1),a*45));
}

function checkr(x,y,t) {
	var ox=x,oy=y;
	if ((x+t.length)>soapSize) return false;
	for (let wp=0;wp<t.length;wp++) {
		if (soap[y][x++]!=t[wp]) return false;
	}
	line(ox,oy,t.length,0);
	return true;
}

function checkl(x,y,t) {
	var ox=x,oy=y;
	if ((x+1)<t.length) return false;
	for (let wp=0;wp<t.length;wp++) {
		if (soap[y][x--]!=t[wp]) return false;
	}
	line(ox,oy,t.length,4);
	return true;
}

function checkd(x,y,t) {
	var ox=x,oy=y;
	if ((y+t.length)>soapSize) return false;
	for (let wp=0;wp<t.length;wp++) {
		if (soap[y++][x]!=t[wp]) return false;
	}
	line(ox,oy,t.length,2);
	return true;
}

function checku(x,y,t) {
	var ox=x,oy=y;
	if ((y+1)<t.length) return false;
	for (let wp=0;wp<t.length;wp++) {
		if (soap[y--][x]!=t[wp]) return false;
	}
	line(ox,oy,t.length,6);
	return true;
}

function checkrd(x,y,t) {
	var ox=x,oy=y;
	if ((x+t.length)>soapSize || (y+t.length)>soapSize) return false;
	for (let wp=0;wp<t.length;wp++) {
		if (soap[y++][x++]!=t[wp]) return false;
	}
	line(ox,oy,t.length,1);
	return true;
}

function checkru(x,y,t) {
	var ox=x,oy=y;
	if ((x+t.length)>soapSize || (y+1)<t.length) return false;
	for (let wp=0;wp<t.length;wp++) {
		if (soap[y--][x++]!=t[wp]) return false;
	}
	line(ox,oy,t.length,7);
	return true;
}

function checkld(x,y,t) {
	var ox=x,oy=y;
	if ((x+1)<t.length || (y+t.length)>soapSize) return false;
	for (let wp=0;wp<t.length;wp++) {
		if (soap[y++][x--]!=t[wp]) return false;
	}
	line(ox,oy,t.length,3);
	return true;
}

function checklu(x,y,t) {
	var ox=x,oy=y;
	if ((x+1)<t.length || (y+1)<t.length) return false;
	for (let wp=0;wp<t.length;wp++) {
		if (soap[y--][x--]!=t[wp]) return false;
	}
	line(ox,oy,t.length,5);
	return true;
}