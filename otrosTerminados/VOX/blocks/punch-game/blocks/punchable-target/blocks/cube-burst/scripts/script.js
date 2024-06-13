const Diagnostics = require('Diagnostics');

const Animation = require('Animation');
const Patches = require('Patches');
const Scene = require('Scene');

(async function() {

    let cubes = {};
    let samplers = {};
    let numCubes, size, force, start, xMax,yMax, zMax, xSpinMax, ySpinMax, zSpinMax, duration;

    [
        cubes[1],
        cubes[2],
        cubes[3],
        cubes[4],
        cubes[5],
        cubes[6],
        cubes[7],
        cubes[8],
        start,
        numCubes,
        size,
        xMax,
        yMax,
        zMax,
        xSpinMax,
        ySpinMax,
        zSpinMax,
        duration
    ] = await Promise.all([
        Scene.root.findFirst('Cube1'),
        Scene.root.findFirst('Cube2'),
        Scene.root.findFirst('Cube3'),
        Scene.root.findFirst('Cube4'),
        Scene.root.findFirst('Cube5'),
        Scene.root.findFirst('Cube6'),
        Scene.root.findFirst('Cube7'),
        Scene.root.findFirst('Cube8'),
        Patches.outputs.getPulse('START'),
        Patches.outputs.getScalar('NUM_CUBES'),
        Patches.outputs.getScalar('SIZE'),
        Patches.outputs.getScalar('MAX_X'),
        Patches.outputs.getScalar('MAX_Y'),
        Patches.outputs.getScalar('MAX_Z'),
        Patches.outputs.getScalar('MAX_SPIN_X'),
        Patches.outputs.getScalar('MAX_SPIN_Y'),
        Patches.outputs.getScalar('MAX_SPIN_Z'),
        Patches.outputs.getScalar('DURATION')
    ]);

    numCubes = numCubes.pinLastValue();
    size = size.pinLastValue();
    xMax = xMax.pinLastValue();
    yMax = yMax.pinLastValue();
    zMax = zMax.pinLastValue();
    xSpinMax = degToRad(xSpinMax.pinLastValue());
    ySpinMax = degToRad(ySpinMax.pinLastValue());
    zSpinMax = degToRad(zSpinMax.pinLastValue());
    duration = duration.pinLastValue() * 1000;

    // // Create a time driver using the parameters
    const timeDriver = Animation.timeDriver({ durationMilliseconds: duration });

    start.subscribe(() => {

        for (var i = 0; i < numCubes; i++) {
            burst(`${i + 1}`);
        }

        // // Start the time driver (unlike value drivers this needs to be done explicitly)
        timeDriver.reset();
        timeDriver.start();
    });

    function burst(cubeId) {

        samplers[cubeId] = {
            x: Animation.samplers.linear(0, randomNumber(-xMax, xMax)),
            y: Animation.samplers.easeOutQuad(0, randomNumber(0, yMax)),
            z: Animation.samplers.linear(0, randomNumber(-zMax, zMax)),
            rotX: Animation.samplers.linear(0, randomNumber(-xSpinMax, xSpinMax)),
            rotY: Animation.samplers.linear(0, randomNumber(-ySpinMax, ySpinMax)),
            rotZ: Animation.samplers.linear(0, randomNumber(-zSpinMax, zSpinMax)),
            scale: Animation.samplers.linear(size, 0),
        }

        cubes[cubeId].transform.x = Animation.animate(timeDriver, samplers[cubeId].x)
        cubes[cubeId].transform.y = Animation.animate(timeDriver, samplers[cubeId].y)
        cubes[cubeId].transform.z = Animation.animate(timeDriver, samplers[cubeId].z)
        cubes[cubeId].transform.scaleX = Animation.animate(timeDriver, samplers[cubeId].scale)
        cubes[cubeId].transform.scaleY = Animation.animate(timeDriver, samplers[cubeId].scale)
        cubes[cubeId].transform.scaleZ = Animation.animate(timeDriver, samplers[cubeId].scale)
        cubes[cubeId].transform.rotationX = Animation.animate(timeDriver, samplers[cubeId].rotX)
        cubes[cubeId].transform.rotationY = Animation.animate(timeDriver, samplers[cubeId].rotY)
        cubes[cubeId].transform.rotationZ = Animation.animate(timeDriver, samplers[cubeId].rotZ)
    }

    function randomNumber(min, max) {

        return Math.random() * (max - min) + min;
    }

    function degToRad(degrees) {

        return degrees * (Math.PI / 180);
    }

})();