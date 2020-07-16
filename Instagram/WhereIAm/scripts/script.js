//FaceTrackingRecording by @Juanmv94
export const R = require('Reactive');
const Time = require('Time');
const Scene = require('Scene');
const Textures = require('Textures');
const CameraInfo = require('CameraInfo');

const frameRate = 18;
const numFrames = 97;
const intervalms = 1000/frameRate;

//Insert your recording here!
const recording=[{"posx":-0.2226669043302536,"posy":0.2801131308078766,"posz":-1.230573058128357,"rotx":-7.9084367752075195,"roty":-69.61524200439453,"rotz":16.086381912231445},{"posx":-0.22550556063652039,"posy":0.2776199281215668,"posz":-1.220561146736145,"rotx":0.04080696776509285,"roty":-65.9147720336914,"rotz":10.44759750366211},{"posx":-0.22706952691078186,"posy":0.27424633502960205,"posz":-1.2062914371490479,"rotx":1.1074552536010742,"roty":-63.2901725769043,"rotz":10.666459083557129},{"posx":-0.22758279740810394,"posy":0.27052342891693115,"posz":-1.1917957067489624,"rotx":-0.055647265166044235,"roty":-59.61262893676758,"rotz":13.125794410705566},{"posx":-0.22579820454120636,"posy":0.26242485642433167,"posz":-1.157732605934143,"rotx":0.892640233039856,"roty":-60.46595001220703,"rotz":12.048812866210938},{"posx":-0.22921667993068695,"posy":0.25773856043815613,"posz":-1.1345455646514893,"rotx":-2.1218066215515137,"roty":-55.53181076049805,"rotz":14.713289260864258},{"posx":-0.23515142500400543,"posy":0.25323736667633057,"posz":-1.1188607215881348,"rotx":2.7245302200317383,"roty":-52.30708694458008,"rotz":10.688962936401367},{"posx":-0.23484712839126587,"posy":0.24715813994407654,"posz":-1.094573974609375,"rotx":2.2453196048736572,"roty":-50.180904388427734,"rotz":11.412073135375977},{"posx":-0.24269725382328033,"posy":0.2512798309326172,"posz":-1.1079275608062744,"rotx":8.626899719238281,"roty":-44.760475158691406,"rotz":7.738608360290527},{"posx":-0.24099014699459076,"posy":0.2509859800338745,"posz":-1.1014389991760254,"rotx":10.139363288879395,"roty":-39.076507568359375,"rotz":8.046117782592773},{"posx":-0.22781801223754883,"posy":0.2459886074066162,"posz":-1.0708320140838623,"rotx":11.492996215820312,"roty":-37.00554656982422,"rotz":8.158961296081543},{"posx":-0.21584154665470123,"posy":0.25438424944877625,"posz":-1.082491397857666,"rotx":8.541642189025879,"roty":-31.721113204956055,"rotz":9.40622615814209},{"posx":-0.2054281383752823,"posy":0.25844037532806396,"posz":-1.0793654918670654,"rotx":8.759906768798828,"roty":-28.905868530273438,"rotz":8.211813926696777},{"posx":-0.18538863956928253,"posy":0.2702993154525757,"posz":-1.098955750465393,"rotx":11.920434951782227,"roty":-21.20917510986328,"rotz":7.762848854064941},{"posx":-0.17537295818328857,"posy":0.2789094150066376,"posz":-1.1250665187835693,"rotx":10.488539695739746,"roty":-15.539172172546387,"rotz":10.202503204345703},{"posx":-0.14867857098579407,"posy":0.282841295003891,"posz":-1.1425106525421143,"rotx":11.177248001098633,"roty":-3.6134250164031982,"rotz":15.239176750183105},{"posx":-0.1193334311246872,"posy":0.29012152552604675,"posz":-1.1554129123687744,"rotx":12.113312721252441,"roty":4.286815643310547,"rotz":17.703859329223633},{"posx":-0.10047437995672226,"posy":0.28734055161476135,"posz":-1.1289730072021484,"rotx":11.136439323425293,"roty":7.924028396606445,"rotz":19.024328231811523},{"posx":-0.0667809247970581,"posy":0.3034544587135315,"posz":-1.1726858615875244,"rotx":16.83741569519043,"roty":17.86545753479004,"rotz":21.977020263671875},{"posx":-0.052194684743881226,"posy":0.3034757375717163,"posz":-1.1676312685012817,"rotx":15.636927604675293,"roty":20.73172950744629,"rotz":22.456031799316406},{"posx":-0.02682761289179325,"posy":0.29756155610084534,"posz":-1.145758032798767,"rotx":18.717145919799805,"roty":28.33453369140625,"rotz":26.245485305786133},{"posx":-0.012134886346757412,"posy":0.2890566885471344,"posz":-1.1209810972213745,"rotx":18.191707611083984,"roty":33.105926513671875,"rotz":26.697114944458008},{"posx":-0.006331686396151781,"posy":0.28654372692108154,"posz":-1.112770915031433,"rotx":18.69121551513672,"roty":36.1829833984375,"rotz":27.023727416992188},{"posx":-0.003336514113470912,"posy":0.2839790880680084,"posz":-1.1033130884170532,"rotx":18.03955841064453,"roty":37.13774871826172,"rotz":26.733522415161133},{"posx":-0.0022410412784665823,"posy":0.28142663836479187,"posz":-1.098056435585022,"rotx":19.363994598388672,"roty":38.82658386230469,"rotz":28.044748306274414},{"posx":-0.003930258098989725,"posy":0.2826775014400482,"posz":-1.1032477617263794,"rotx":19.614004135131836,"roty":39.5045280456543,"rotz":28.753490447998047},{"posx":-0.006071514915674925,"posy":0.28015780448913574,"posz":-1.100091576576233,"rotx":20.330429077148438,"roty":39.4500732421875,"rotz":29.67520523071289},{"posx":-0.006386167369782925,"posy":0.2788156270980835,"posz":-1.0982898473739624,"rotx":21.363256454467773,"roty":39.796417236328125,"rotz":30.563133239746094},{"posx":-0.007535470649600029,"posy":0.27780860662460327,"posz":-1.092699408531189,"rotx":21.611413955688477,"roty":39.96943664550781,"rotz":30.906391143798828},{"posx":-0.008530001156032085,"posy":0.2791910767555237,"posz":-1.092560887336731,"rotx":21.863866806030273,"roty":40.43710708618164,"rotz":30.470975875854492},{"posx":-0.009614091366529465,"posy":0.283559650182724,"posz":-1.0891371965408325,"rotx":21.899185180664062,"roty":39.35557556152344,"rotz":30.713451385498047},{"posx":-0.012541810050606728,"posy":0.28541049361228943,"posz":-1.0818707942962646,"rotx":21.54796028137207,"roty":38.229530334472656,"rotz":29.01754379272461},{"posx":-0.014785491861402988,"posy":0.286000519990921,"posz":-1.0762832164764404,"rotx":20.144943237304688,"roty":37.9290885925293,"rotz":28.16895294189453},{"posx":-0.02255774848163128,"posy":0.28559279441833496,"posz":-1.0721046924591064,"rotx":18.990150451660156,"roty":36.29176330566406,"rotz":26.79301643371582},{"posx":-0.02742421068251133,"posy":0.2903170883655548,"posz":-1.0845885276794434,"rotx":19.927576065063477,"roty":35.66225814819336,"rotz":26.8905086517334},{"posx":-0.045036084949970245,"posy":0.3099348247051239,"posz":-1.1339634656906128,"rotx":21.67542839050293,"roty":29.464168548583984,"rotz":25.646974563598633},{"posx":-0.09036219865083694,"posy":0.314780056476593,"posz":-1.1530296802520752,"rotx":13.775565147399902,"roty":9.744407653808594,"rotz":12.911827087402344},{"posx":-0.12023729830980301,"posy":0.3092299997806549,"posz":-1.143309473991394,"rotx":12.480069160461426,"roty":-3.1634409427642822,"rotz":6.264708042144775},{"posx":-0.1675560623407364,"posy":0.3045099377632141,"posz":-1.137901782989502,"rotx":19.345701217651367,"roty":-23.49518394470215,"rotz":-5.504304885864258},{"posx":-0.18408049643039703,"posy":0.30728963017463684,"posz":-1.1458815336227417,"rotx":18.978790283203125,"roty":-29.225133895874023,"rotz":-7.679365158081055},{"posx":-0.1986410766839981,"posy":0.3090599477291107,"posz":-1.1358921527862549,"rotx":17.289302825927734,"roty":-36.505516052246094,"rotz":-10.038251876831055},{"posx":-0.21525739133358002,"posy":0.32202544808387756,"posz":-1.1674491167068481,"rotx":21.10617446899414,"roty":-39.09718704223633,"rotz":-14.08621597290039},{"posx":-0.2245597392320633,"posy":0.33095160126686096,"posz":-1.1901028156280518,"rotx":21.4044189453125,"roty":-42.18115997314453,"rotz":-15.422286987304688},{"posx":-0.24412716925144196,"posy":0.34739986062049866,"posz":-1.2353347539901733,"rotx":27.593425750732422,"roty":-49.140933990478516,"rotz":-20.990854263305664},{"posx":-0.2541569769382477,"posy":0.3578087091445923,"posz":-1.265762448310852,"rotx":31.15639877319336,"roty":-51.23775863647461,"rotz":-23.834510803222656},{"posx":-0.274686336517334,"posy":0.37986233830451965,"posz":-1.3309481143951416,"rotx":30.807130813598633,"roty":-50.665042877197266,"rotz":-22.045536041259766},{"posx":-0.29014620184898376,"posy":0.39174529910087585,"posz":-1.368623971939087,"rotx":33.580963134765625,"roty":-56.26970291137695,"rotz":-26.299354553222656},{"posx":-0.2890590727329254,"posy":0.3860178291797638,"posz":-1.352392315864563,"rotx":32.868167877197266,"roty":-56.89689636230469,"rotz":-24.87875747680664},{"posx":-0.28664982318878174,"posy":0.3826291561126709,"posz":-1.3347680568695068,"rotx":29.152217864990234,"roty":-57.73548126220703,"rotz":-22.557458877563477},{"posx":-0.291400671005249,"posy":0.3921281099319458,"posz":-1.3642818927764893,"rotx":29.780048370361328,"roty":-57.020626068115234,"rotz":-22.37649154663086},{"posx":-0.26275724172592163,"posy":0.3664155900478363,"posz":-1.2554291486740112,"rotx":37.00344467163086,"roty":-64.92977142333984,"rotz":-36.32488250732422},{"posx":-0.25950366258621216,"posy":0.3774406313896179,"posz":-1.2837207317352295,"rotx":31.789960861206055,"roty":-62.61888122558594,"rotz":-30.24818992614746},{"posx":-0.258293479681015,"posy":0.38698554039001465,"posz":-1.3053730726242065,"rotx":33.61563491821289,"roty":-61.19428634643555,"rotz":-30.65199089050293},{"posx":-0.2515128552913666,"posy":0.38740262389183044,"posz":-1.2960292100906372,"rotx":29.099023818969727,"roty":-58.11072540283203,"rotz":-25.696922302246094},{"posx":-0.24578624963760376,"posy":0.3848467767238617,"posz":-1.2826988697052002,"rotx":27.871978759765625,"roty":-58.386566162109375,"rotz":-24.667648315429688},{"posx":-0.24330881237983704,"posy":0.39051353931427,"posz":-1.2941325902938843,"rotx":26.76318359375,"roty":-52.887935638427734,"rotz":-21.558902740478516},{"posx":-0.23980288207530975,"posy":0.39881712198257446,"posz":-1.3198267221450806,"rotx":26.687944412231445,"roty":-48.613075256347656,"rotz":-19.91905403137207},{"posx":-0.2377108633518219,"posy":0.4016520380973816,"posz":-1.324777603149414,"rotx":27.127347946166992,"roty":-48.80229568481445,"rotz":-20.715822219848633},{"posx":-0.22857695817947388,"posy":0.3941233456134796,"posz":-1.2990342378616333,"rotx":24.727930068969727,"roty":-47.21565246582031,"rotz":-19.715028762817383},{"posx":-0.22488933801651,"posy":0.3887344002723694,"posz":-1.2824071645736694,"rotx":24.274595260620117,"roty":-47.069583892822266,"rotz":-19.10447883605957},{"posx":-0.2174038290977478,"posy":0.37832337617874146,"posz":-1.2555352449417114,"rotx":22.67158317565918,"roty":-47.469600677490234,"rotz":-17.467683792114258},{"posx":-0.21941342949867249,"posy":0.38551825284957886,"posz":-1.2828408479690552,"rotx":23.387344360351562,"roty":-45.25691223144531,"rotz":-17.564664840698242},{"posx":-0.21282388269901276,"posy":0.3753047287464142,"posz":-1.2516148090362549,"rotx":23.894744873046875,"roty":-46.67788314819336,"rotz":-18.13506507873535},{"posx":-0.20830871164798737,"posy":0.37168610095977783,"posz":-1.237637996673584,"rotx":23.458635330200195,"roty":-46.7872428894043,"rotz":-18.007699966430664},{"posx":-0.20544502139091492,"posy":0.36939260363578796,"posz":-1.23050856590271,"rotx":22.880460739135742,"roty":-45.9155158996582,"rotz":-17.631263732910156},{"posx":-0.1932068020105362,"posy":0.3656780421733856,"posz":-1.2148009538650513,"rotx":19.04082489013672,"roty":-42.39995574951172,"rotz":-13.70382308959961},{"posx":-0.16596047580242157,"posy":0.3457286059856415,"posz":-1.15543532371521,"rotx":14.295706748962402,"roty":-38.454627990722656,"rotz":-7.03400993347168},{"posx":-0.15132807195186615,"posy":0.35004696249961853,"posz":-1.1659599542617798,"rotx":14.168437957763672,"roty":-33.830265045166016,"rotz":-3.552856922149658},{"posx":-0.11995251476764679,"posy":0.3715377748012543,"posz":-1.227391004562378,"rotx":16.30889320373535,"roty":-17.36952781677246,"rotz":2.898953676223755},{"posx":-0.1013621985912323,"posy":0.3704758584499359,"posz":-1.2165024280548096,"rotx":12.187056541442871,"roty":-9.418349266052246,"rotz":7.982946872711182},{"posx":-0.07026716321706772,"posy":0.3654836118221283,"posz":-1.1969189643859863,"rotx":10.751153945922852,"roty":1.1384179592132568,"rotz":13.656892776489258},{"posx":-0.042080823332071304,"posy":0.3595772981643677,"posz":-1.1943970918655396,"rotx":14.875040054321289,"roty":11.584696769714355,"rotz":18.617210388183594},{"posx":-0.030188800767064095,"posy":0.3579727113246918,"posz":-1.1948858499526978,"rotx":15.880341529846191,"roty":15.347452163696289,"rotz":21.192222595214844},{"posx":-0.010600920766592026,"posy":0.3473976254463196,"posz":-1.1758712530136108,"rotx":20.394216537475586,"roty":23.117902755737305,"rotz":26.598350524902344},{"posx":-0.004610628820955753,"posy":0.3472581207752228,"posz":-1.1763107776641846,"rotx":22.000812530517578,"roty":25.814266204833984,"rotz":29.272985458374023},{"posx":0.00539323128759861,"posy":0.341888964176178,"posz":-1.1504286527633667,"rotx":23.15566635131836,"roty":32.355865478515625,"rotz":32.86528015136719},{"posx":0.0195124801248312,"posy":0.34970107674598694,"posz":-1.1583466529846191,"rotx":23.75148582458496,"roty":36.37678527832031,"rotz":34.07245635986328},{"posx":0.02798604778945446,"posy":0.3540114164352417,"posz":-1.1628260612487793,"rotx":24.97013282775879,"roty":36.872562408447266,"rotz":36.43366241455078},{"posx":0.04511664807796478,"posy":0.35753166675567627,"posz":-1.1706045866012573,"rotx":25.719663619995117,"roty":38.218360900878906,"rotz":36.951934814453125},{"posx":0.05278285592794418,"posy":0.3626457750797272,"posz":-1.1861436367034912,"rotx":26.27498435974121,"roty":38.51027297973633,"rotz":36.95615768432617},{"posx":0.07280762493610382,"posy":0.3627578616142273,"posz":-1.188950538635254,"rotx":28.760488510131836,"roty":39.60866165161133,"rotz":37.74996566772461},{"posx":0.09581997990608215,"posy":0.3632042109966278,"posz":-1.1947872638702393,"rotx":29.683137893676758,"roty":39.82373809814453,"rotz":37.626468658447266},{"posx":0.11014087498188019,"posy":0.36820173263549805,"posz":-1.2088137865066528,"rotx":28.316450119018555,"roty":42.147254943847656,"rotz":37.73439025878906},{"posx":0.1340002864599228,"posy":0.36553865671157837,"posz":-1.2010717391967773,"rotx":27.051177978515625,"roty":42.951393127441406,"rotz":36.0459098815918},{"posx":0.14769157767295837,"posy":0.3692745864391327,"posz":-1.2096877098083496,"rotx":26.50173568725586,"roty":44.16393280029297,"rotz":35.12816619873047},{"posx":0.1792757660150528,"posy":0.3811887204647064,"posz":-1.2433139085769653,"rotx":29.537891387939453,"roty":44.156402587890625,"rotz":36.07150650024414},{"posx":0.1966695934534073,"posy":0.3611062169075012,"posz":-1.1791012287139893,"rotx":30.549386978149414,"roty":49.7969970703125,"rotz":37.56824493408203},{"posx":0.21319764852523804,"posy":0.36898815631866455,"posz":-1.2058994770050049,"rotx":32.1338005065918,"roty":50.78750228881836,"rotz":38.055355072021484},{"posx":0.26344677805900574,"posy":0.4183901250362396,"posz":-1.367046594619751,"rotx":35.23552703857422,"roty":46.02949905395508,"rotz":35.00267028808594},{"posx":0.2695832848548889,"posy":0.4040709137916565,"posz":-1.3294508457183838,"rotx":33.60702896118164,"roty":42.67238235473633,"rotz":29.567956924438477},{"posx":0.2996492087841034,"posy":0.4210410416126251,"posz":-1.3766928911209106,"rotx":35.80668258666992,"roty":44.307865142822266,"rotz":32.8930549621582},{"posx":0.31338170170783997,"posy":0.4171668291091919,"posz":-1.3606284856796265,"rotx":35.26627731323242,"roty":46.21849060058594,"rotz":35.10478591918945},{"posx":0.31919026374816895,"posy":0.4149402379989624,"posz":-1.3533529043197632,"rotx":35.510746002197266,"roty":46.42644500732422,"rotz":35.35246276855469},{"posx":0.3240552246570587,"posy":0.40658852458000183,"posz":-1.3264633417129517,"rotx":34.120792388916016,"roty":45.75117111206055,"rotz":34.5247917175293},{"posx":0.32303184270858765,"posy":0.40319743752479553,"posz":-1.3139137029647827,"rotx":30.56812858581543,"roty":46.32057189941406,"rotz":32.576934814453125},{"posx":0.2984235882759094,"posy":0.37671661376953125,"posz":-1.2395983934402466,"rotx":22.158098220825195,"roty":34.02162551879883,"rotz":23.5096435546875},{"posx":0.257451593875885,"posy":0.3479909896850586,"posz":-1.1701878309249878,"rotx":17.68583869934082,"roty":20.401268005371094,"rotz":15.480657577514648}];

const poslist=recording.map(function(el){return [R.point(el.posx,el.posy,el.posz),el.rotx/180*Math.PI,el.roty/180*Math.PI,el.rotz/180*Math.PI];});
var timer,frame=0;
var animationSequence, faceMeshes;

Promise.all([Textures.findFirst("animationSequence0"),Scene.root.findByPath("**/faceMesh*")]).then(function(arr) {
	animationSequence=arr[0]; faceMeshes=arr[1];
	timer = Time.setInterval(f, intervalms);
});

function f() {
	if (frame<recording.length) {
		var nv=poslist[frame];
		faceMeshes.forEach(function(fm) {
			fm.transform.position=nv[0];
			fm.transform.rotationX=nv[1];
			fm.transform.rotationY=nv[2];
			fm.transform.rotationZ=nv[3];
		});
	}
	animationSequence.currentFrame=frame;
	frame++;
	frame=frame%numFrames;
}

CameraInfo.isRecordingVideo.monitor().subscribe(function(v) {if (v.newValue) {frame=0; f();}});