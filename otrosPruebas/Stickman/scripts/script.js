const Materials = require('Materials');
const R = require('Reactive');
const Shaders = require('Shaders');
export const Diagnostics = require('Diagnostics');
export const CameraInfo = require('CameraInfo');
export const BodyTracking = require('BodyTracking');

const lineWidth=R.val(0.015);

const screenProp=R.div(CameraInfo.previewSize.x,CameraInfo.previewSize.y);
const uv = Shaders.vertexAttribute({variableName: Shaders.VertexAttribute.TEX_COORDS});
const p2prop=R.pack2(screenProp,1);
const newuv = uv.mul(p2prop);

function middlePoint(p1,p2,d) {
	return (d===undefined) ? R.add(p1,p2).mul(0.5) : R.add(p1,p2.sub(p1).mul(d));
}

function lineSDF(p1,p2) {
	const dist=R.distance(p1,p2), pdif=R.sub(p1,p2);
	const line1=Shaders.sdfLine(p1,R.pack2(pdif.y,R.neg(pdif.x)).div(dist),lineWidth);
	const line2=Shaders.sdfLine(middlePoint(p1,p2),pdif.div(dist),dist.mul(0.5));
	return Shaders.sdfIntersection(line1,line2);
}

function linepSDFp(p1,p2) {
	return lineSDF(p1.mul(p2prop),p2.mul(p2prop));
}

function circpSDFp(p) {
	return Shaders.sdfCircle(p.mul(p2prop),lineWidth);
}


const b0 = BodyTracking.body(0);
Diagnostics.watch("tracked", b0.isTracked);
export const p0 = b0.pose2D;
const pd=middlePoint(p0.torso.leftHip.keyPoint, p0.torso.rightHip.keyPoint);
const points=[
	middlePoint(p0.neck.keyPoint, pd, 0.2),
	p0.leftArm.elbow.keyPoint,
	p0.leftArm.wrist.keyPoint,
	p0.rightArm.elbow.keyPoint,
	p0.rightArm.wrist.keyPoint,
	p0.neck.keyPoint,
	pd,
	p0.leftLeg.knee.keyPoint,
	p0.leftLeg.ankle.keyPoint,
	p0.rightLeg.knee.keyPoint,
	p0.rightLeg.ankle.keyPoint,
];
const geom=[
	linepSDFp(points[0], points[1]),
	linepSDFp(points[1], points[2]),
	circpSDFp(points[1]),
	linepSDFp(points[0], points[3]),
	linepSDFp(points[3], points[4]),
	circpSDFp(points[3]),
	linepSDFp(points[5], points[6]),
	circpSDFp(points[6]),
	linepSDFp(points[6], points[7]),
	linepSDFp(points[7], points[8]),
	circpSDFp(points[7]),
	linepSDFp(points[6], points[9]),
	linepSDFp(points[9], points[10]),
	circpSDFp(points[9]),
];
const joinSDF = geom.reduce(Shaders.sdfUnion);
const finalSDF = Shaders.textureSampler(Shaders.sdfComplement(joinSDF),newuv);
//const finalAlpha = R.step(finalSDF,0)
const finalAlpha = R.smoothStep(finalSDF,-0.01,0.01);
const color1 = R.pack4(0,0,0, finalAlpha);
Materials.findFirst('material0').then(material=>material.setTextureSlot(Shaders.DefaultMaterialTextures.DIFFUSE, color1));
