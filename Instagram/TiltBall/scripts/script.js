const Scene = require('Scene');
const Time = require('Time');
//const Diagnostics = require('Diagnostics');
const R = require('Reactive');
const Patches = require('Patches');
export const CANNON = require('./cannon.js');
const Boards = require('./boards.js');

const INTERVALMS = 40;
const G = 30
const FRICTION = 0.95;
const RESTITUTION = 0.6;
const NLEVELS = 5;

Promise.all([Patches.outputs.getPoint2D("hrot"),Patches.outputs.getPulse("loadNextLevel"),Scene.root.findFirst('Sphere'),Scene.root.findFirst('Board')]).then(function ([hrot,loadNextLevel,sphere,board]) {
    const world = new CANNON.World();
    world.gravity.set(0, -G, 0);
	
	const sphbMat = new CANNON.Material();
	world.addContactMaterial(new CANNON.ContactMaterial(sphbMat,sphbMat,{friction:FRICTION,restitution:RESTITUTION}));
	
	const sphbprops={mass: 1, position: new CANNON.Vec3(0,4,0), shape: new CANNON.Sphere(1), material: sphbMat};
    var sphb = null;	//We will initialize it later;

	var currentLevelObj=null, currentLevel=-1, loadNextLevelRequested=true, levelcompleted;
	loadNextLevel.subscribe(()=>loadNextLevelRequested=true);
    Time.setInterval(function (time) {
        //if (lastTime !== undefined) {
            //let dt = (time - lastTime) / 1000;
		if (loadNextLevelRequested || sphb.position.y<-4) {
			if (sphb!==null) world.removeBody(sphb);
			sphb = new CANNON.Body(sphbprops);
			world.addBody(sphb);
		}
		if (loadNextLevelRequested) {
			if (currentLevelObj!==null) world.removeBody(currentLevelObj);
			currentLevel=(currentLevel+1)%NLEVELS;
			currentLevelObj=new CANNON.Body({mass: 0, position: new CANNON.Vec3(0,0,0), shape: new CANNON.Trimesh(Boards.data[currentLevel][2],Boards.data[currentLevel][3]), material: sphbMat});
			world.addBody(currentLevelObj);
			Patches.inputs.setString("levelName",`LEVEL ${currentLevel}:\n${Boards.data[currentLevel][0]}`).then(()=>Patches.inputs.setPulse("showLevelName",R.once()));
			levelcompleted=loadNextLevelRequested=false;
		}
			
		world.gravity.set(hrot.y.pinLastValue(), -G, hrot.x.pinLastValue())
		world.step(INTERVALMS/1000);

		sphere.transform.position=R.point(sphb.position.x,sphb.position.y,sphb.position.z);
		sphere.transform.rotation=R.quaternion(sphb.quaternion.w,sphb.quaternion.x,sphb.quaternion.y,sphb.quaternion.z);
			
		board.transform.position=R.point(-sphb.position.x,sphb.position.z,0);
		
		if (!levelcompleted && (Math.abs(Boards.data[currentLevel][1][0]-sphb.position.x)+Math.abs(Boards.data[currentLevel][1][1]-sphb.position.z))<2) {
			levelcompleted=true;
			Patches.inputs.setPulse("levelCompleted",R.once());
		}
        //lastTime = time
    }, INTERVALMS);
});