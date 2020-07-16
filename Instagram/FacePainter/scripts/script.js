const Textures = require('Textures');
const Patches = require('Patches');
const NativeUI = require('NativeUI');
const picker = NativeUI.picker;
const Diagnostics = require('Diagnostics');

Promise.all(["goma","0","1","2","3","4","5","6","7","8","9","10","11","facecross"].map(function(s) {return Textures.findFirst(s);})).then(function(t) {
	var items=[{image_texture: t[13]}];
	for (let i=0;i<=12;i++) {
		items.push({image_texture: t[i]});
	}
	var configuration = {
	  selectedIndex: 1,
	  items: t.map(function(m) {return {image_texture: m};})
	};

	picker.configure(configuration);
	picker.visible = true;
	Patches.inputs.setBoolean("visible",true);
	
	picker.selectedIndex.monitor().subscribe(function(index) {
	  if (index.newValue==0) {
		  Patches.inputs.setBoolean("erase",true);
		  Patches.inputs.setBoolean("visible",true);
	  }
	  else if (index.newValue==(t.length-1)) {
		  Patches.inputs.setBoolean("visible",false);
	  }
	  else {
		  Patches.inputs.setBoolean("erase",false);
		  Patches.inputs.setBoolean("visible",true);
		  Patches.inputs.setScalar("color",index.newValue-1);
	  }
	});
});
