const Animation = require('Animation');
const Audio = require('Audio');
const Blocks = require('Blocks');
//const Diagnostics = require('Diagnostics');
const NativeUI = require('NativeUI');
const Patches = require('Patches');
const Persistence = require('Persistence');
const R = require('Reactive');
const Scene = require('Scene');
const Time = require('Time');
const Textures = require('Textures');

const songs=[
	{duration: 144000, speed: 0.00035, highscore: 1000, keys: [[1000,0.2],[1600,0.5],[2400,0.7],[3200,0.5],[4400,0.5],[6400,0.5],[7800,0.2],[8400,0.5],[9200,0.7],[10000,0.5],[11600,0.5],[12400,0.8],[13400,0.8],[14400,0.3],[15000,0.3],[16000,0.8],[16600,0.8],[17400,0.6],[18000,0.6],[19000,0.2],[19600,0.5],[20400,0.7],[21200,0.5],[22400,0.5],[24000,0.5],[30000,0],[36200,1],[42200,0],[48200,1],[54000,0.5],[60000,0.2],[62800,0.6],[66000,1],[67600,0.1],[69000,0.7],[69800,0.7],[70600,0.7],[72200,0.4],[72400,0.4],[72800,0.5],[73000,0.5],[73600,0.6],[73800,0.6],[74400,0.7],[74600,0.7],[75000,0.6],[75200,0.6],[75800,0.5],[76000,0.5],[76600,0.5],[76800,0.5],[77000,0.5],[77400,0.5],[78200,0.5],[78400,0.6],[78600,0.7],[79200,0.7],[80000,0.7],[80200,0.6],[80800,0.5],[81600,0.3],[81800,0.3],[82400,0.3],[84000,0.6],[85600,0.6],[87000,0.6],[88400,0.6],[90000,0],[90800,0.3],[91600,0.6],[92400,0.3],[93200,0.6],[93400,0.6],[93600,0.6],[93800,0.6],[94000,0.6],[94200,0.6],[94400,0.6],[96200,0.4],[96600,0.6],[97000,0.8],[97400,0.9],[97600,0.9],[98000,0.8],[98400,0.6],[98800,0.5],[99000,0.5],[99400,0.6],[99800,0.8],[100200,0.9],[100400,0.9],[100800,0.8],[101200,0.6],[101600,0.5],[101800,0.5],[102200,0.6],[102600,0.8],[103000,0.9],[103200,0.9],[103600,0.8],[104000,0.6],[104400,0.5],[104600,0.5],[105000,0.6],[105400,0.8],[105800,0.9],[106000,0.9],[106400,0.9],[107200,0.6],[107400,0.6],[107600,0.6],[108000,0.6],[108400,0.8],[108800,1],[109200,0.9],[109600,0.8],[110000,0.7],[110400,0.6],[110800,0.5],[111200,0.6],[111600,0.7],[112000,0.8],[112200,0.9],[112600,0.8],[113000,0.7],[113400,0.6],[113600,0.5],[114000,0.5],[114400,0.5],[114800,0.5],[115200,0.5],[115600,0.7],[116000,0.7],[116400,0.7],[116800,0.7],[120000,0],[120400,0.1],[120800,0.2],[121200,0.3],[121600,0.2],[122000,0.1],[122400,0],[122800,0.1],[123200,0.2],[123400,0.2],[123800,0.2],[124200,0.3],[124600,0.3],[124800,0.4],[125000,0.4],[125200,0.4],[125600,0.4],[126000,0.3],[126400,0.2],[126800,0.1],[127200,0.1],[127600,0.1],[128000,0.2],[128400,0.3],[128800,0.4],[129200,0.3],[129400,0.3],[129800,0.2],[130000,0.2],[130400,0.1],[130600,0.1],[132000,1],[133600,0.2],[135000,0.8],[136400,0],[138000,1],[139600,0.5],[140200,0.5],[141200,0.5],[141400,0.5],[141600,0.5],[141800,0.5],[142000,0.5],[142200,0.5],[142400,0.5]]},
	{duration: 180000, speed: 0.0004, highscore: 1200, keys: [[4600,0.4],[5400,0.6],[6000,0.8],[7200,0.8],[10800,0.8],[11600,0.6],[12200,0.4],[12400,0.4],[12600,0.4],[12800,0.4],[13000,0.4],[13200,0.4],[13400,0.4],[13600,0.4],[13800,0.4],[14000,0.4],[15400,1],[15800,0.8],[16200,0.6],[16600,0.4],[17000,0.2],[17400,0],[17800,0.2],[18200,0.4],[18600,0.6],[19000,0.8],[19400,1],[19800,0.8],[20200,0.6],[20600,0.8],[21000,1],[21400,0.8],[21800,0.6],[22200,0.8],[22600,1],[23000,0.8],[23400,0.6],[23800,0.6],[24400,0.6],[24800,0.6],[26000,0.6],[27000,0.6],[27400,0.4],[27800,0.2],[29200,0.6],[30200,0.3],[30600,0.4],[31000,0.4],[31200,0.4],[32200,0.5],[32600,0.7],[32800,0.7],[33000,0.7],[33400,0.7],[33800,0.7],[34200,0.7],[35400,0.7],[36800,0],[38200,1],[40000,0.5],[40400,0.7],[40800,0.9],[41200,0.9],[41600,0.7],[42000,0.5],[42400,0.3],[42800,0.1],[43200,0.3],[43600,0.5],[44000,0.7],[44400,0.7],[44800,0.5],[45200,0.3],[45600,0.1],[46000,0.1],[46400,0.1],[46800,0.1],[47400,0.3],[47800,0.3],[48200,0.3],[48600,0.3],[49200,0],[49600,0],[50000,0],[50400,0.1],[50800,0.1],[51200,0.1],[51600,0.1],[52000,0.1],[53800,0.4],[55200,0],[56800,1],[58200,0.6],[59800,0.6],[61200,0.6],[62800,0.6],[67200,0],[73200,0.6],[75000,0.3],[76800,0.8],[79800,0.8],[83000,1],[86000,0],[88600,1],[93200,1],[94000,0.9],[95000,0.8],[95400,0.8],[99600,0],[100000,0.1],[100800,0.2],[101000,0.2],[101200,0.2],[101400,0.2],[101600,0.2],[101800,0.2],[102000,0.2],[102200,0.2],[102400,0.2],[102600,0.2],[104000,0.6],[105600,0.3],[107000,0],[108600,0.8],[110000,0.3],[110200,0.3],[111600,0.7],[111800,0.7],[113200,0.1],[113400,0.1],[114800,0.9],[115000,0.9],[116200,0.5],[116600,0.5],[117000,0.5],[117400,0.5],[117800,0.6],[118200,0.6],[118600,0.6],[119000,0.6],[119200,0.5],[119600,0.5],[120000,0.5],[120400,0.5],[120800,0.4],[121200,0.4],[121600,0.4],[122000,0.4],[122400,0.5],[122600,0.5],[122800,0.5],[123000,0.5],[123200,0.5],[123400,0.5],[123600,0.5],[123800,0.5],[124000,0.5],[124200,0.5],[124400,0.5],[124600,0.5],[124800,0.5],[125000,0.5],[125200,0.5],[125400,0.5],[125600,0.5],[125800,0.5],[126000,0.5],[126200,0.5],[126400,0.5],[127000,0.5],[128400,0.5],[128800,0.7],[129200,0.9],[129600,0.9],[130000,0.7],[130400,0.5],[130800,0.3],[131200,0.1],[131600,0.1],[132000,0.3],[132400,0.5],[132800,0.7],[133200,0.9],[133800,1],[134200,1],[134600,1],[135000,1],[135400,1],[135800,1],[136200,0.9],[136600,0.9],[137000,0.9],[137400,0.9],[137800,0.8],[138200,0.8],[138600,0.8],[139000,0.8],[139400,0.7],[139800,0.7],[140200,0.7],[140600,0.6],[141000,0.6],[141400,0.6],[141800,0.6],[142200,0.6],[142600,0.6],[143000,0.6],[143400,0.6],[143800,0.6],[144200,0.6],[144600,0.6],[145200,0.6],[153000,0],[153600,0],[154200,0],[154800,0.2],[155600,0.3],[156200,0.3],[156800,0.5],[157400,0.5],[158000,0.3],[158600,0.3],[159200,0.5],[159800,0.5],[160400,0.3],[161000,0.3],[161600,0.2],[162200,0.2],[162800,0.4],[163400,0.4],[164200,0.4],[164800,0.2],[165400,0.2],[166000,0.2],[166600,0.2],[167400,0.2],[168400,0.2],[171200,0.2]]},
	{duration: 199000, speed: 0.00045, highscore: 1250, keys: [[2800,0.5],[5400,0.7],[8200,0.5],[10800,0],[13600,0.5],[16200,1],[19000,0.3],[21800,0.8],[24600,0.1],[27200,1],[30000,0.1],[30400,0.3],[30800,0.5],[32800,0.9],[33200,0.7],[33600,0.5],[35600,0],[36000,0.2],[36400,0.4],[46400,0.5],[46800,0.5],[47200,0.5],[47600,0.5],[48000,0.8],[48400,0.8],[48800,0.8],[49200,0.8],[49600,0.5],[50000,0.5],[50400,0.5],[50800,0.5],[51200,0.2],[51600,0.2],[52000,0.2],[52400,0.2],[52800,0.5],[53200,0.5],[53600,0.5],[54000,0.5],[54400,0.7],[54800,0.7],[55200,0.7],[55600,0.7],[56000,0.7],[56400,0.7],[56800,0.7],[57200,0.7],[57600,0.7],[58000,0.7],[58400,0.7],[58800,0.5],[59200,0.5],[59600,0.5],[60000,0.5],[60400,0.5],[60800,0.5],[61200,0.5],[61600,0.3],[62000,0.3],[62400,0.3],[62800,0.3],[63200,0.1],[63600,0.1],[64000,0.1],[64400,0.1],[64800,0.1],[65200,0.1],[65600,0.1],[66000,0.1],[66400,0.1],[68400,0.5],[68800,0.7],[69200,0.9],[69600,1],[70000,0.9],[70400,0.7],[70800,0.5],[71200,0.3],[71600,0.1],[72000,0],[72400,0.1],[72800,0.3],[73200,0.5],[73600,0.7],[74000,0.9],[74400,1],[74800,0.9],[75200,0.7],[75600,0.5],[76000,0.3],[76400,0.1],[76800,0],[77200,0.1],[77600,0.3],[78000,0.5],[78400,0.7],[78800,0.9],[79200,1],[79600,1],[80000,1],[80400,1],[80800,1],[81200,1],[81600,1],[82000,1],[82400,0.7],[82800,0.7],[83200,0.7],[83600,0.7],[84000,0.7],[84400,0.7],[84800,0.7],[85200,0.7],[85600,0.4],[86000,0.4],[86400,0.4],[86800,0.4],[87200,0.4],[87600,0.4],[88000,0.4],[88400,0.4],[90000,1],[90400,0.8],[90800,0.6],[91200,0.4],[91600,0.4],[92000,0.4],[92400,0.6],[92800,0.8],[93200,1],[93600,1],[94000,1],[94400,0.8],[94800,0.6],[95200,0.4],[95600,0.4],[96000,0.4],[96400,0.4],[96800,0.4],[97200,0.4],[97600,0.4],[98000,0.4],[98400,0.4],[98800,0.4],[99200,0.4],[100800,0.3],[101000,0.3],[101400,0.5],[101600,0.5],[102000,0.7],[102200,0.7],[102600,0.9],[102800,0.9],[103400,0.7],[103600,0.7],[104000,0.5],[104200,0.5],[104600,0.3],[104800,0.3],[105400,0.2],[105600,0.2],[106200,0.5],[106600,0.5],[107000,0.5],[107400,0.5],[107800,0.5],[108200,0.5],[108600,0.5],[109000,0.5],[109200,0.5],[109400,0.5],[109600,0.5],[109800,0.5],[110000,0.5],[110200,0.5],[111800,0.9],[114400,0],[117000,1],[119800,0],[122400,0.6],[125400,0.2],[128000,0.7],[130800,0],[133400,1],[136000,0.4],[139000,0.7],[139400,0.5],[139800,0.3],[141600,0.7],[142000,0.5],[142400,0.3],[144200,0.3],[144600,0.5],[145000,0.7],[145400,0.7],[145800,0.7],[146200,0.7],[146600,0.7],[155400,1],[156800,1],[158000,0.8],[159400,0.3],[160800,0.6],[162200,0],[163400,0.6],[164800,1],[166200,0.7],[167600,0.7],[169000,0.5],[170200,0.1],[171600,0.2],[173000,1],[174400,0.4],[175800,0.6],[177000,0.3],[178400,0.9],[179800,0.5],[181000,1],[182600,1],[183800,0.1],[185200,1],[186600,0.3],[188000,1],[188200,1],[188400,1],[188600,0.9],[188800,0.9]]}
];

//star rotations
const starTimedriver=Animation.timeDriver({durationMilliseconds: 2000, loopCount: Infinity});
const starAnim=Animation.animate(starTimedriver, Animation.samplers.linear(0,360));
starTimedriver.start();


var highscores=songs.map(x=>x.highscore);

//Picker & scores & Start handler
Promise.all([Promise.all(songs.map((_,i)=>Textures.findFirst(""+i))),
		Promise.all(songs.map((_,i)=>Audio.getAudioPlaybackController("l"+i))), Audio.getAudioPlaybackController("gameover"),
		Promise.all(["score","hiscore","evaluation","level"].map(x=>Scene.root.findFirst(x))),
		Patches.outputs.getScalar("score"),Patches.outputs.getPulse("noEnergy")]
		).then(([t,a,agameover,[score,hiscore,evaluation,level],signalScore,signalnoenergy])=>{
	const picker = NativeUI.picker;
	picker.configure({selectedIndex: 0, items: t.map(x=>({image_texture: x}))});
	picker.visible = true;
	Patches.inputs.setScalar("pickerOption", picker.selectedIndex);
	
	score.text=signalScore.format("- {:04.0f}0");
	const userScope = Persistence.userScope;
	var pickerIdxSubs;
	userScope.get('highscores').then(x=>{
		highscores=x||highscores;
	}).finally(()=>{
		pickerIdxSubs = picker.selectedIndex.monitor({fireOnInitialValue: true}).subscribe(x=>{
			hiscore.text=R.max(R.val(highscores[x.newValue]),signalScore).format("HI: {:04.0f}0 -");
		});	
	});
	
	Patches.outputs.getPulse("start").then(p=>p.subscribe(()=>{
		const song=picker.selectedIndex.pinLastValue();
		pickerIdxSubs.unsubscribe();
		picker.configure({selectedIndex: 0, items: [{image_texture: t[song]}]});
		
		const timeDriver = Animation.timeDriver({durationMilliseconds: songs[song].duration});
		const starX = Animation.animate(timeDriver, Animation.samplers.polyline({
			keyframes: [0,...songs[song].keys.map(x=>(x[1]-0.5)*0.15),0],
			knots: [0,...songs[song].keys.map(x=>x[0]),songs[song].duration]
		}));
		const starY = Animation.animate(timeDriver, Animation.samplers.polyline({
			keyframes: [...Array(songs[song].keys.length+2).keys()],
			knots: [0,...songs[song].keys.map(x=>x[0]),songs[song].duration]
		}));
		const durationPos=Animation.animate(timeDriver,Animation.samplers.linear(0,1));
		const onStarY=R.andList([starY.floor().ne(0),starY.ne(songs[song].keys.length+1),starY.floor().history(1).frame(-1).ne(starY.floor())]);
		Patches.inputs.setScalar("starX",starX);
		Patches.inputs.setBoolean("onStarY",onStarY);
		Patches.inputs.setScalar("durationPos",durationPos);
		level.transform.y=Animation.animate(timeDriver,Animation.samplers.linear(0, -songs[song].duration * songs[song].speed));
		loadSong(song,level,timeDriver);
		timeDriver.onCompleted().subscribe(()=>{
			const finalscore=signalScore.pinLastValue();
			let evtext="Superado!\nPuntuacion:\n"+finalscore*10;
			if (finalscore>highscores[song]) {
				highscores[song]=finalscore;
				evtext+="\n\nNuevo record!"
				userScope.set('highscores',highscores);
			}
			popuptext(evaluation,evtext);
		});
		signalnoenergy.subscribe(()=>{
			timeDriver.stop();
			a[song].setPlaying(false);
			agameover.setPlaying(true);
			popuptext(evaluation,"Te quedaste\nsin energia\n\nGame Over");
		});
		a[song].setPlaying(true);
		timeDriver.start();
	}));
});

const NSTARS = 10, stars=[];
async function loadSong(s,level,timeDriver) {
	for (let i=0;i<NSTARS;i++) {
		stars[i] = await Blocks.instantiate('star',{name: "s"+i, });
		const ikeys=songs[s].keys.filter((_,x)=>x%NSTARS==i);
		const knots=[...ikeys.map((x,i)=>i?x[0]-1400:0),songs[s].duration];
		stars[i].transform.x=Animation.animate(timeDriver,Animation.samplers.sequence({
			samplers: ikeys.map(x=>Animation.samplers.constant((x[1]-0.5)*0.15+0.025)),
			knots
		}));
		stars[i].transform.y=Animation.animate(timeDriver,Animation.samplers.sequence({
			samplers: ikeys.map(x=>Animation.samplers.constant(x[0]*songs[s].speed)),
			knots
		}));
		stars[i].inputs.setScalar("rotation",starAnim);
		stars[i].hidden=true;
		level.addChild(stars[i]);
		Time.setTimeout(()=>stars[i].hidden=false, 0);
	}
}

function popuptext(scenetext,mytext) {
	scenetext.text=mytext;
	const timedriver=Animation.timeDriver({durationMilliseconds: 1000});
	const anim=Animation.animate(timedriver, Animation.samplers.easeOutBounce(0,0.0012));
	scenetext.transform.scaleX=scenetext.transform.scaleY=scenetext.transform.scaleZ=anim;
	timedriver.start();
}