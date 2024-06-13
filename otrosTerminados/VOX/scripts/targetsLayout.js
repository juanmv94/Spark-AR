const Diagnostics = require('Diagnostics');
const CameraInfo = require('CameraInfo');
const Reactive = require('Reactive');
const Scene = require('Scene');

(async function() { // Enables async/await in JS [part 1]


    // arrange targets in an arc facing user
    const radius = 1;
    const spread = 25;
    const numTargets = 8;
    const halfTargets = numTargets * 0.5;
    const yRow1 = 0.3;
    const yRow2 = -0.2;

    const pg = await Scene.root.findFirst('game');

    for (var i = 0; i < numTargets; i++) {

        let index = i % halfTargets - halfTargets * 0.5 + 0.5;

        let point = getPointOnCircle(
            radius,
            index * spread,
            i < halfTargets ? yRow1 : yRow2);

        pg.inputs.setPoint(`Target 0${i + 1}`, point);
        pg.inputs.setPoint2D(`Target 2D 0${i + 1}`, Scene.projectToScreen(point).div(CameraInfo.previewScreenScale));
        pg.inputs.setPoint(`Target Rotate 0${i + 1}`, Reactive.pack3(0, -index * spread, 0));
    }

    function getPointOnCircle(radius, angle, y) {

        return Reactive.pack3(
            radius * Math.cos(degToRad(angle - 90)),
            y,
            radius * Math.sin(degToRad(angle - 90)));
    }

    function degToRad(degrees) {

        var pi = Math.PI;
        return degrees * (pi / 180);
    }

})();