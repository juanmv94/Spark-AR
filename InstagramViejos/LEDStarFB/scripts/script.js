const Patches = require('Patches');
const NativeUI = require('NativeUI');

var texto='';
var tpointer;

function charCode(v) {return v.charCodeAt(0)-32;}

NativeUI.setText('text0',texto);

Patches.outputs.getPulse("tap").then(function(t) {
	t.subscribe(function() {NativeUI.enterTextEditMode('text0');});
});

NativeUI.getText('text0').monitor().subscribe(function(textUpdate){
  if (textUpdate.newValue=='') {texto='';Patches.setBooleanValue("Modo",false);}
  else {
	  texto=textUpdate.newValue+'      ';
	  tpointer=0;
	  for (let i=1;i<=6;i++) Patches.setScalarValue("ch"+i,charCode(' '));
	  Patches.setBooleanValue("Modo",true);
  }
});

Patches.outputs.getScalar("TextAnim").then(function(ta) {
	ta.monitor().subscribe(function(estado){
		if (texto=='') return;
		var c=texto[tpointer++];
		if (tpointer==texto.length) tpointer=0;
		Patches.setScalarValue("ch"+(6-estado.newValue),charCode(c));
	});
});
