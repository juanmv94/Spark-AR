const Materials = require('Materials');
const Time = require('Time');
const qr = require('./qr');

Materials.findFirst("material0").then(mat=>{
	function updateQR() {
		const d = new Date();
		const day=d.getDate().toString().padStart(2,'0');
		const month=(d.getMonth()+1).toString().padStart(2,'0');
		const year=d.getFullYear().toString();
		const hour=d.getHours().toString().padStart(2,'0');
		const minute=d.getMinutes().toString().padStart(2,'0');
		//const second=d.getSeconds().toString().padStart(2,'0');
		const str = `@Juanmv94: It's ${day}/${month}/${year} ${hour}:${minute}`;
		const qrdata = qr(str,{errorCorrectLevel:1}).modules;
		for (let y=0 ; y<25 ; y++) {
			var v=0;
			for (let x=0 ; x<24 ; x++) v+=qrdata[y][x]<<x;
			if (qrdata[y][24]) v=-v;
			mat.setParameter("r"+y,v);
		}
	}
	updateQR();
	Time.setInterval(updateQR, 60000);
});

