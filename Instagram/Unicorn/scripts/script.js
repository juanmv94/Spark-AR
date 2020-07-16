export const FaceTracking = require('FaceTracking');
const Patches = require('Patches');
export const Scene = require('Scene');
export const R = require('Reactive');

Patches.inputs.setScalar("mo",FaceTracking.face(0).mouth.openness);

Scene.root.findFirst("emitter0").then(function(em) {
	em.transform.position=FaceTracking.face(0).mouth.center;
	;
});