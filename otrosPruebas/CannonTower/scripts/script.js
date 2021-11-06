const Scene = require('Scene');
const Time = require('Time');
const Diagnostics = require('Diagnostics');
const R = require('Reactive');
const Patches = require('Patches');
export const CANNON = require('./cannon.js');

const G = 0.25
const FRICTION = 0.5;
const RESTITUTION = 0;
const PLATF_MOVE_MULT = 0.25;
const PLATF_MAX_MOVE = 0.002;
const SPAWNTIMES = [0,2000,3800,5400,6800,8000];
const N = SPAWNTIMES.length;

(async function () {
	const hrot = await Patches.outputs.getScalar("hrot");
    const platform = await Scene.root.findFirst('Cube');
	const cube = await Promise.all([...Array(N).keys()].map(x=>Scene.root.findFirst('Cube'+x)));
    const world = new CANNON.World();
    world.gravity.set(0, -G, 0);
	
	const boxMat = new CANNON.Material();
    const platfBody = new CANNON.Body({mass: 0, position: new CANNON.Vec3(0,-0.2,0), shape: new CANNON.Box(new CANNON.Vec3(0.0375,0.00625,0.0375)), material: boxMat});
	const cubeBody=[];
	for (let i=0;i<N;i++) cubeBody.push(new CANNON.Body({mass: 1, position: new CANNON.Vec3(0,0.3,0), shape: new CANNON.Box(new CANNON.Vec3(0.025,0.0125,0.025)), material: boxMat}));
	world.addContactMaterial(new CANNON.ContactMaterial(boxMat,boxMat,{friction:FRICTION,restitution:RESTITUTION}));
    world.addBody(platfBody);

	var nplatforms=0;
    //let lastTime;
    Time.setInterval(function (time) {
        //if (lastTime !== undefined) {
            //let dt = (time - lastTime) / 1000;
		world.step(1/20);
		
		var d=hrot.pinLastValue()-platfBody.position.x;
		var fd=Math.max(-PLATF_MAX_MOVE,Math.min(PLATF_MAX_MOVE,d*PLATF_MOVE_MULT));
		platfBody.velocity.x=fd*20;
		platfBody.position.x+=fd;
		platform.transform.x=platfBody.position.x;
		
		for (let i=0;i<nplatforms;i++) if (cubeBody[i]!=null) {
			if (cubeBody[i].position.y<-0.4) {
				world.removeBody(cubeBody[i]);
				cubeBody[i]=null;
			} else {
				cube[i].transform.position=R.point(cubeBody[i].position.x,cubeBody[i].position.y,cubeBody[i].position.z);
				cube[i].transform.rotation=R.quaternion(cubeBody[i].quaternion.w,cubeBody[i].quaternion.x,cubeBody[i].quaternion.y,cubeBody[i].quaternion.z);
			}
		}
		
		if (nplatforms<N && SPAWNTIMES[nplatforms]<=time) world.addBody(cubeBody[nplatforms++]);
        //}
        //lastTime = time
    }, 50);
})();