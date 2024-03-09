const Shaders = require('Shaders')
const CameraInfo = require('CameraInfo');
const R = require('Reactive');
const TouchGestures = require('TouchGestures');

var tx = R.scalarSignalSource("tx");
var ty = R.scalarSignalSource("ty");
var panSubscription = null;

module.exports = function(inp) {
	if (panSubscription) panSubscription.unsubscribe();
	tx.set(0); ty.set(0);
	if (!inp) return;
	
	let prop = R.div(CameraInfo.previewSize.width.div(inp.width), CameraInfo.previewSize.height.div(inp.height));
	let prop2 = R.pack2(prop.lt(1).ifThenElse(prop,1), prop.lt(1).ifThenElse(1,R.div(1,prop)));
	let uv = Shaders.vertexAttribute({variableName: Shaders.VertexAttribute.TEX_COORDS})
		.sub(0.5).mul(prop2).add(0.5).add(R.pack2(tx.signal,ty.signal));
		
	panSubscription = TouchGestures.onPan().subscribe(g=>{
		let oldx=tx.signal.pinLastValue(), oldy=ty.signal.pinLastValue();
		tx.set(R.clamp(g.translation.x.mul(-0.0005).add(oldx), R.sub(1,prop2.x).mul(-0.5), R.sub(1,prop2.x).mul(0.5)));
		ty.set(R.clamp(g.translation.y.mul(-0.0005).add(oldy), R.sub(1,prop2.y).mul(-0.5), R.sub(1,prop2.y).mul(0.5)));
	});
	
	return [uv,prop2,panSubscription];
}