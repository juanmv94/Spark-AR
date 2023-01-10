const Scene = require('Scene');
const Time = require('Time');
const Materials = require('Materials');
const Textures = require('Textures');
const NativeUI = require('NativeUI');
const TouchGestures = require('TouchGestures');
const Patches = require('Patches');

const ns=[[false,false,false,false,false,false,true],
		  [true,false,false,true,true,true,true],
		  [false,false,true,false,false,true,false],
		  [false,false,false,false,true,true,false],
		  [true,false,false,true,true,false,false],
		  [false,true,false,false,true,false,false],
		  [false,true,false,false,false,false,false],
		  [false,false,false,true,true,true,true],
		  [false,false,false,false,false,false,false],
		  [false,false,false,false,true,false,false],
		  [true,true,true,true,true,true,true]];

Promise.all([Scene.root.findByPath('planeTracker0/placer/d*'),Scene.root.findByPath('planeTracker0/placer/n*'),
	Materials.getAll()]).then(([dots,nums,materials])=>{
	Promise.all(nums.map(x=>x.findByPath('*'))).then(segments=>{
		const setn=(n,v)=>{for (let i=0;i<7;i++) segments[n][i].hidden=ns[v][i];}
		var interval,time=new Date(),curf=0,dotsvis=false;
		
		function fhhmmss() {
			time=new Date(time.getTime()+500);
			setn(5,time.getSeconds()%10);
			setn(4,Math.floor(time.getSeconds()/10));
			setn(3,time.getMinutes()%10);
			setn(2,Math.floor(time.getMinutes()/10));
			setn(1,time.getHours()%10);
			setn(0,Math.floor(time.getHours()/10));
			dots[0].hidden=dots[1].hidden=dotsvis=!dotsvis;
		}
		
		function fhhmm() {
			time=new Date(time.getTime()+500);
			setn(5,10);
			setn(4,10);
			setn(3,time.getMinutes()%10);
			setn(2,Math.floor(time.getMinutes()/10));
			setn(1,time.getHours()%10);
			setn(0,Math.floor(time.getHours()/10));
			dots[0].hidden=dotsvis=!dotsvis;
			dots[1].hidden=true;
		}
		
		function fhhmmd() {
			Time.clearInterval(interval);
		}
		
		var touchsub,runst;
		function fc() {
			runst=0;
			dots[0].hidden=dots[1].hidden=false;
			Patches.inputs.setBoolean("tts",true);
			touchsub=TouchGestures.onTap().subscribe(()=>{runst=(runst+1)%3; Patches.inputs.setBoolean("tts",!runst);});
			interval=Time.setInterval(function() {
				switch (runst) {
					case 0: {
						time= new Date();
						setn(5,0);
						setn(4,0);
						setn(3,0);
						setn(2,0);
						setn(1,0);
						setn(0,0);
						break;
					}
					case 1: {
						var now = new Date(new Date()-time);
						setn(5,Math.floor(now.getMilliseconds()/10)%10);
						setn(4,Math.floor(now.getMilliseconds()/100)%10);
						setn(3,now.getSeconds()%10);
						setn(2,Math.floor(now.getSeconds()/10));
						setn(1,now.getMinutes()%10);
						setn(0,Math.floor(now.getMinutes()/10));
						break;
					}
				}
			},80);
		}
		
		function fcd() {
			Time.clearInterval(interval);
			touchsub.unsubscribe();
			Patches.inputs.setBoolean("tts",false);
		}
		
		const changemat=(m)=>{for (let j=0;j<6;j++) for (let i=0;i<7;i++) segments[j][i].material=materials[m]; dots[0].material=materials[m]; dots[1].material=materials[m];}
		const changef=(f)=>{
			[fhhmmd,fhhmmd,fcd][curf]();
			[()=>{time=new Date();fhhmmss();interval=Time.setInterval(fhhmmss,500);}, ()=>{time=new Date();fhhmm();interval=Time.setInterval(fhhmm,500);}, fc][curf=f]();
		}
		fhhmmss();
		interval=Time.setInterval(fhhmmss,500);
		
		Promise.all(["hhmmss1","hhmm1","c1","hhmmss2","hhmm2","c2"].map(tn=>Textures.findFirst(tn))).then(function(t) {
			const picker = NativeUI.picker;
			var configuration = {
			  selectedIndex: 0,
			  items: t.map(i=>({image_texture:i}))
			};
			picker.configure(configuration);
			picker.visible = true;
			picker.selectedIndex.monitor().subscribe(function(index) {
			  var [oldmat,newmat,oldf,newf]=[Math.floor(index.oldValue/3),Math.floor(index.newValue/3),index.oldValue%3,index.newValue%3];
			  if (oldmat!=newmat) changemat(newmat);
			  if (oldf!=newf) changef(newf);
			});
		});
	});
});