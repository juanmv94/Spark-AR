const FaceTracking = require('FaceTracking');
const Patches = require('Patches');

Patches.setScalarValue("mo",FaceTracking.face(0).mouth.openness);