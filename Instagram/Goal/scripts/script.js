/***************************************
 * FaceTrackingRecording by @Juanmv94 (C) 2020
 * Free to use only for personal ig accounts
 * Selling filters with FaceTrackingRecording is not allowed!
 * Contact @Juanmv94 for help or bussiness use
 * Don't remove this copyright message
 **************************************/
 
const R = require('Reactive');
const Time = require('Time');
const Scene = require('Scene');
const Textures = require('Textures');
const Animation = require('Animation');
const CameraInfo = require('CameraInfo');

const frameRate = 12.5;
const interpolation=false;

//Insert your recording here!
const recording=[{"posx":0.11265192925930023,"posy":0.28783929347991943,"posz":-1.3508859872817993,"rotx":2.657395839691162,"roty":0.4828057289123535,"rotz":2.364283323287964},{"posx":0.13324734568595886,"posy":0.32006266713142395,"posz":-1.335933804512024,"rotx":4.163671016693115,"roty":-4.181851387023926,"rotz":1.6577497720718384},{"posx":0.15704527497291565,"posy":0.329419881105423,"posz":-1.3417860269546509,"rotx":2.9153692722320557,"roty":2.6249518394470215,"rotz":3.9784016609191895},{"posx":0.15685099363327026,"posy":0.3296787440776825,"posz":-1.3428436517715454,"rotx":2.8306093215942383,"roty":2.2918448448181152,"rotz":3.69667649269104},{"posx":0.2213601917028427,"posy":0.26413723826408386,"posz":-1.3585169315338135,"rotx":-0.12925510108470917,"roty":-4.285754680633545,"rotz":2.6409525871276855},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0.18770645558834076,"posy":0.3123658001422882,"posz":-1.3229798078536987,"rotx":-3.461406946182251,"roty":-4.002910137176514,"rotz":2.0608043670654297},{"posx":0.1507043093442917,"posy":0.2622980773448944,"posz":-1.4171209335327148,"rotx":-3.7225286960601807,"roty":-4.953988075256348,"rotz":4.0230183601379395},{"posx":0.14282430708408356,"posy":0.25022923946380615,"posz":-1.4018616676330566,"rotx":-9.283307075500488,"roty":-1.8213030099868774,"rotz":2.1601145267486572},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0.17353832721710205,"posy":0.3261374831199646,"posz":-1.5162932872772217,"rotx":-6.702680587768555,"roty":2.3503315448760986,"rotz":3.2958626747131348},{"posx":0.15366454422473907,"posy":0.1852051466703415,"posz":-1.1749025583267212,"rotx":-5.6295270919799805,"roty":16.657228469848633,"rotz":4.7396626472473145},{"posx":0.18896643817424774,"posy":0.23047028481960297,"posz":-1.32011878490448,"rotx":0.9926348924636841,"roty":40.22068405151367,"rotz":7.836485862731934},{"posx":0.18139339983463287,"posy":0.2700040936470032,"posz":-1.3540102243423462,"rotx":2.2121315002441406,"roty":39.46977233886719,"rotz":8.574084281921387},{"posx":0.17666129767894745,"posy":0.22007188200950623,"posz":-1.367503046989441,"rotx":10.419295310974121,"roty":44.05169677734375,"rotz":15.498373985290527},{"posx":0.18129491806030273,"posy":0.22351042926311493,"posz":-1.4409611225128174,"rotx":8.037087440490723,"roty":44.36627960205078,"rotz":11.967618942260742},{"posx":0.18129491806030273,"posy":0.26,"posz":-1.4409611225128174,"rotx":8.037087440490723,"roty":44.36627960205078,"rotz":11.967618942260742},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0.18918311595916748,"posy":0.23685811460018158,"posz":-1.5080320835113525,"rotx":13.487574577331543,"roty":48.76450729370117,"rotz":16.329133987426758},{"posx":0.23511941730976105,"posy":0.30959200859069824,"posz":-1.8751620054244995,"rotx":21.34052276611328,"roty":49.49066162109375,"rotz":23.803586959838867},{"posx":0.1877112239599228,"posy":0.2927940785884857,"posz":-1.4829250574111938,"rotx":14.001422882080078,"roty":49.18455505371094,"rotz":15.708191871643066},{"posx":0.18629854917526245,"posy":0.28213322162628174,"posz":-1.4841411113739014,"rotx":14.00340747833252,"roty":48.39141845703125,"rotz":14.780170440673828},{"posx":0.2,"posy":0.24,"posz":-1.48,"rotx":14,"roty":48,"rotz":14},{"posx":0.22,"posy":0.27,"posz":-1.48,"rotx":14,"roty":48,"rotz":14},{"posx":0.25309813022613525,"posy":0.29498130083084106,"posz":-1.39217209815979,"rotx":17.85664939880371,"roty":43.41443634033203,"rotz":17.427541732788086},{"posx":0.2525812089443207,"posy":0.2584322392940521,"posz":-1.4667268991470337,"rotx":14.538204193115234,"roty":16.431615829467773,"rotz":7.499955177307129},{"posx":0.25866812467575073,"posy":0.21384531259536743,"posz":-1.4186029434204102,"rotx":16.293149948120117,"roty":-9.612298965454102,"rotz":-1.1341638565063477},{"posx":0.27,"posy":0.3,"posz":-1.42,"rotx":16.29,"roty":-9.61,"rotz":-1.13},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0.25554776191711426,"posy":0.43878039717674255,"posz":-1.2629486322402954,"rotx":27.589311599731445,"roty":-11.93265438079834,"rotz":-5.936125755310059},{"posx":0.23417384922504425,"posy":0.42792147397994995,"posz":-1.256717562675476,"rotx":29.77971649169922,"roty":-17.910289764404297,"rotz":-7.390899181365967},{"posx":0.20952919125556946,"posy":0.3898151218891144,"posz":-1.2493245601654053,"rotx":29.02315330505371,"roty":-30.83113670349121,"rotz":-10.771507263183594},{"posx":0.14804105460643768,"posy":0.20023013651371002,"posz":-1.2559548616409302,"rotx":20.722740173339844,"roty":-12.605152130126953,"rotz":-2.1571009159088135},{"posx":0.1468728631734848,"posy":0.16601920127868652,"posz":-1.2765228748321533,"rotx":12.090222358703613,"roty":-7.783194541931152,"rotz":-1.5585054159164429},{"posx":0.20279137790203094,"posy":0.11531554162502289,"posz":-1.3852704763412476,"rotx":12.54670524597168,"roty":-8.751129150390625,"rotz":-3.896819829940796},{"posx":0.20492243766784668,"posy":0.10515894740819931,"posz":-1.465826392173767,"rotx":-1.8088428974151611,"roty":-8.238587379455566,"rotz":-6.774657249450684},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0},{"posx":0,"posy":0,"posz":0,"rotx":0,"roty":0,"rotz":0}];

const timeDriver=Animation.timeDriver({durationMilliseconds: recording.length/frameRate*1000, loopCount: Infinity,  mirror: false});

recording.push(recording[recording.length-1]);
var vis=recording.map(x=>(x.posx==0 && x.posy==0 && x.posz==0)?0:1);

function sampler(keyf) {
	return interpolation ? Animation.samplers.polyline({keyframes:keyf}) : Animation.samplers.sequence({samplers:keyf.map(x=>Animation.samplers.constant(x))});
}

Promise.all([Textures.findFirst("animationSequence0"),Scene.root.findByPath("**/faceMesh*")]).then(function(arr) {
	const animationSequence=arr[0], faceMeshes=arr[1];
	const frameSampler=Animation.samplers.frame(recording.length), frameAnimation=Animation.animate(timeDriver, frameSampler);
	const fspx=sampler(recording.map(x=>x.posx)),fapx=Animation.animate(timeDriver, fspx);
	const fspy=sampler(recording.map(x=>x.posy)),fapy=Animation.animate(timeDriver, fspy);
	const fspz=sampler(recording.map(x=>x.posz)),fapz=Animation.animate(timeDriver, fspz);
	const fsrx=sampler(recording.map(x=>x.rotx*Math.PI/180)),farx=Animation.animate(timeDriver, fsrx);
	const fsry=sampler(recording.map(x=>x.roty*Math.PI/180)),fary=Animation.animate(timeDriver, fsry);
	const fsrz=sampler(recording.map(x=>x.rotz*Math.PI/180)),farz=Animation.animate(timeDriver, fsrz);
	const fsv=sampler(vis),fav=Animation.animate(timeDriver, fsv);
	animationSequence.currentFrame=frameAnimation;
	faceMeshes.forEach(function(fm) {
		fm.transform.position=R.point(fapx,fapy,fapz);
		fm.transform.rotationX=farx; fm.transform.rotationY=fary; fm.transform.rotationZ=farz;
		fm.hidden=fav.lt(1);
	});
	timeDriver.start();
});

CameraInfo.isRecordingVideo.monitor().subscribe(function(v){if (v.newValue) timeDriver.reset();});
