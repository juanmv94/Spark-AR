const Animation = require('Animation');
const Blocks = require('Blocks');
const Materials = require('Materials');
const Scene = require('Scene');
const R = require('Reactive');
const Shaders = require('Shaders');
const Textures = require('Textures');
const TouchGestures = require('TouchGestures');

const sampler = Animation.samplers.easeOutQuad(-1,1);
const tdkeys=[];
var result="";

const mattexcolP=Promise.all([Materials.getAll(),Textures.findFirst("keytexture"),Blocks.inputs.getColor("color1"),Blocks.inputs.getColor("color2")]);
Scene.root.findFirst("base").then(base=>{
	base.findByPath("*").then(nokeys=>{
		nokeys.sort((a,b)=>a.name>b.name?1:-1);
		Promise.all(nokeys.map(nk=>nk.findFirst("tkey"))).then(tkeys=>{
			mattexcolP.then(([mats,texture,color1,color2])=>{
				const tsignal=texture.signal, c1=color1.toVec4(), c2=color2.toVec4(), texturecmask=R.pack4(1,1,1,0), textureamask=tsignal.w.mul(R.pack4(0,0,0,1));
				mats.sort((a,b)=>a.name>b.name?1:-1);
				nokeys.forEach((nk,i)=>{
					switch (nk.name) {
						case "nokey45_shift": break;
						case "nokey44_del":
							initMaterial(i);
							TouchGestures.onTap(nk).subscribe(function(){
								if (result) {
									result=result.substr(0,result.length-1);
									Blocks.outputs.setString("text",result);
								}
								tdkeys[i].reset(); tdkeys[i].start();
							});
							break;
						default:
							initMaterial(i);
							TouchGestures.onTap(nk).subscribe(function(){
								result+=tkeys[i].text.pinLastValue();
								Blocks.outputs.setString("text",result);
								tdkeys[i].reset(); tdkeys[i].start();
							});
					}
				});
				base.hidden=false;
				
				function initMaterial(i) {
					tdkeys[i]=Animation.timeDriver({durationMilliseconds: 500});
					var timeline=Animation.animate(tdkeys[i],sampler);
					var c2a=R.mix(c1,c2,R.abs(timeline));
					var m=R.mix(c1,c2a,tsignal.x).mul(texturecmask).add(textureamask);
					mats[i].setTextureSlot(Shaders.DefaultMaterialTextures.DIFFUSE, m);
				}
			});
		});
	});
});