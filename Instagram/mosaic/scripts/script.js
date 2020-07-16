const FaceTracking = require('FaceTracking');
const Patches = require('Patches');

Patches.inputs.setScalar("mo",FaceTracking.face(0).mouth.openness);