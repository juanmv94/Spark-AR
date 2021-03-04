const Scene = require('Scene');
const Textures = require('Textures');
const R = require('Reactive');

Promise.all([Textures.findFirst("galleryTexture0"),Scene.root.findByPath('planeTracker0/placer/pict/plane*'),Scene.root.findFirst('shadow')]).then(([gt,pls,shd])=>{
	const w=gt.width.div(gt.height);
	pls.forEach(x=>x.transform.scaleX=w);
	shd.transform.scaleX=R.max(w,1);
});
