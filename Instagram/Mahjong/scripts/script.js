//export const Diagnostics = require('Diagnostics');
export const Scene = require('Scene');
export const Materials = require('Materials');
export const Textures = require('Textures');
export const Shaders = require('Shaders');
export const R = require('Reactive');
export const Animation = require('Animation');
export const TouchGestures = require('TouchGestures');
export const Patches = require('Patches');
export const Audio = require('Audio');

const np=148;
const nd=34;

export var sonidos;
var mahong=0;
const mahongs=[
//estrella
[[{"y":8,"x":16},{"y":6,"x":14},{"y":8,"x":14},{"y":10,"x":14},{"y":4,"x":12},{"y":6,"x":12},{"y":8,"x":12},{"y":10,"x":12},{"y":12,"x":12},{"y":2,"x":10},{"y":4,"x":10},{"y":6,"x":10},{"y":8,"x":10},{"y":10,"x":10},{"y":12,"x":10},{"y":14,"x":10},{"y":0,"x":8},{"y":2,"x":8},{"y":4,"x":8},{"y":6,"x":8},{"y":8,"x":8},{"y":10,"x":8},{"y":12,"x":8},{"y":14,"x":8},{"y":16,"x":8},{"y":2,"x":6},{"y":4,"x":6},{"y":6,"x":6},{"y":8,"x":6},{"y":10,"x":6},{"y":12,"x":6},{"y":14,"x":6},{"y":4,"x":4},{"y":6,"x":4},{"y":8,"x":4},{"y":10,"x":4},{"y":12,"x":4},{"y":6,"x":2},{"y":8,"x":2},{"y":10,"x":2},{"y":8,"x":0}],[{"y":8,"x":14},{"y":6,"x":12},{"y":8,"x":12},{"y":10,"x":12},{"y":4,"x":10},{"y":6,"x":10},{"y":8,"x":10},{"y":10,"x":10},{"y":12,"x":10},{"y":2,"x":8},{"y":4,"x":8},{"y":6,"x":8},{"y":8,"x":8},{"y":10,"x":8},{"y":12,"x":8},{"y":14,"x":8},{"y":4,"x":6},{"y":6,"x":6},{"y":8,"x":6},{"y":10,"x":6},{"y":12,"x":6},{"y":6,"x":4},{"y":8,"x":4},{"y":10,"x":4},{"y":8,"x":2}],[{"y":8,"x":12},{"y":6,"x":10},{"y":8,"x":10},{"y":10,"x":10},{"y":4,"x":8},{"y":6,"x":8},{"y":8,"x":8},{"y":10,"x":8},{"y":12,"x":8},{"y":6,"x":6},{"y":8,"x":6},{"y":10,"x":6},{"y":8,"x":4}],[{"y":8,"x":10},{"y":6,"x":8},{"y":8,"x":8},{"y":10,"x":8},{"y":8,"x":6}],[{"y":8,"x":9},{"y":8,"x":7}]],
//ancla
[[{"y":0,"x":16},{"y":0,"x":14},{"y":0,"x":12},{"y":2,"x":26},{"y":2,"x":19},{"y":2,"x":17},{"y":2,"x":11},{"y":2,"x":9},{"y":2,"x":2},{"y":4,"x":28},{"y":4,"x":16},{"y":4,"x":14},{"y":4,"x":12},{"y":4,"x":0},{"y":6,"x":28},{"y":6,"x":26},{"y":6,"x":14},{"y":6,"x":2},{"y":6,"x":0},{"y":8,"x":28},{"y":8,"x":26},{"y":8,"x":24},{"y":8,"x":18},{"y":8,"x":16},{"y":8,"x":14},{"y":8,"x":12},{"y":8,"x":10},{"y":8,"x":4},{"y":8,"x":2},{"y":8,"x":0},{"y":10,"x":26},{"y":10,"x":24},{"y":10,"x":22},{"y":10,"x":14},{"y":10,"x":6},{"y":10,"x":4},{"y":10,"x":2},{"y":12,"x":24},{"y":12,"x":22},{"y":12,"x":20},{"y":12,"x":18},{"y":12,"x":16},{"y":12,"x":14},{"y":12,"x":12},{"y":12,"x":10},{"y":12,"x":8},{"y":12,"x":6},{"y":12,"x":4},{"y":14,"x":21},{"y":14,"x":19},{"y":14,"x":17},{"y":14,"x":15},{"y":14,"x":13},{"y":14,"x":11},{"y":14,"x":9},{"y":14,"x":7},{"y":16,"x":18},{"y":16,"x":16},{"y":16,"x":14},{"y":16,"x":12},{"y":16,"x":10}],[{"y":0,"x":15},{"y":0,"x":13},{"y":2,"x":17},{"y":2,"x":11},{"y":4,"x":28},{"y":4,"x":15},{"y":4,"x":13},{"y":4,"x":0},{"y":6,"x":28},{"y":6,"x":26},{"y":6,"x":14},{"y":6,"x":2},{"y":6,"x":0},{"y":8,"x":26},{"y":8,"x":24},{"y":8,"x":16},{"y":8,"x":14},{"y":8,"x":12},{"y":8,"x":4},{"y":8,"x":2},{"y":10,"x":24},{"y":10,"x":22},{"y":10,"x":14},{"y":10,"x":6},{"y":10,"x":4},{"y":12,"x":23},{"y":12,"x":21},{"y":12,"x":19},{"y":12,"x":17},{"y":12,"x":15},{"y":12,"x":13},{"y":12,"x":11},{"y":12,"x":9},{"y":12,"x":7},{"y":12,"x":5},{"y":14,"x":20},{"y":14,"x":18},{"y":14,"x":16},{"y":14,"x":14},{"y":14,"x":12},{"y":14,"x":10},{"y":14,"x":8},{"y":16,"x":17},{"y":16,"x":15},{"y":16,"x":13},{"y":16,"x":11}],[{"y":0,"x":15},{"y":0,"x":13},{"y":2,"x":17},{"y":2,"x":11},{"y":4,"x":15},{"y":4,"x":13},{"y":6,"x":26},{"y":6,"x":14},{"y":6,"x":2},{"y":8,"x":24},{"y":8,"x":15},{"y":8,"x":13},{"y":8,"x":4},{"y":10,"x":22},{"y":10,"x":14},{"y":10,"x":6},{"y":12,"x":21},{"y":12,"x":19},{"y":12,"x":17},{"y":12,"x":15},{"y":12,"x":13},{"y":12,"x":11},{"y":12,"x":9},{"y":12,"x":7},{"y":14,"x":19},{"y":14,"x":17},{"y":14,"x":15},{"y":14,"x":13},{"y":14,"x":11},{"y":14,"x":9},{"y":16,"x":15},{"y":16,"x":13}],[{"y":8,"x":14}]],
//Android
[[{"y":0,"x":15},{"y":1,"x":13},{"y":1,"x":11},{"y":1,"x":9},{"y":1,"x":7},{"y":1,"x":5},{"y":3,"x":15},{"y":3,"x":13},{"y":3,"x":11},{"y":3,"x":9},{"y":3,"x":7},{"y":3,"x":5},{"y":3,"x":3},{"y":6,"x":18},{"y":6,"x":15},{"y":6,"x":13},{"y":6,"x":11},{"y":6,"x":9},{"y":6,"x":7},{"y":6,"x":5},{"y":6,"x":3},{"y":6,"x":0},{"y":8,"x":18},{"y":8,"x":15},{"y":8,"x":13},{"y":8,"x":11},{"y":8,"x":9},{"y":8,"x":7},{"y":8,"x":5},{"y":8,"x":3},{"y":8,"x":0},{"y":10,"x":18},{"y":10,"x":15},{"y":10,"x":13},{"y":10,"x":11},{"y":10,"x":9},{"y":10,"x":7},{"y":10,"x":5},{"y":10,"x":3},{"y":10,"x":0},{"y":12,"x":15},{"y":12,"x":13},{"y":12,"x":11},{"y":12,"x":9},{"y":12,"x":7},{"y":12,"x":5},{"y":12,"x":3},{"y":14,"x":13},{"y":14,"x":11},{"y":14,"x":7},{"y":14,"x":5},{"y":16,"x":12},{"y":16,"x":6},{"y":0,"x":3}],[{"y":1,"x":12},{"y":1,"x":10},{"y":1,"x":8},{"y":1,"x":6},{"y":3,"x":14},{"y":3,"x":12},{"y":3,"x":10},{"y":3,"x":8},{"y":3,"x":6},{"y":3,"x":4},{"y":6,"x":14},{"y":6,"x":12},{"y":6,"x":10},{"y":6,"x":8},{"y":6,"x":6},{"y":6,"x":4},{"y":7,"x":18},{"y":7,"x":0},{"y":8,"x":14},{"y":8,"x":12},{"y":8,"x":10},{"y":8,"x":8},{"y":8,"x":6},{"y":8,"x":4},{"y":9,"x":18},{"y":9,"x":0},{"y":10,"x":14},{"y":10,"x":12},{"y":10,"x":10},{"y":10,"x":8},{"y":10,"x":6},{"y":10,"x":4},{"y":12,"x":14},{"y":12,"x":12},{"y":12,"x":10},{"y":12,"x":8},{"y":12,"x":6},{"y":12,"x":4},{"y":14,"x":12},{"y":14,"x":6}],[{"y":1,"x":11},{"y":1,"x":9},{"y":1,"x":7},{"y":3,"x":13},{"y":3,"x":11},{"y":3,"x":9},{"y":3,"x":7},{"y":3,"x":5},{"y":6,"x":13},{"y":6,"x":11},{"y":6,"x":9},{"y":6,"x":7},{"y":6,"x":5},{"y":7,"x":18},{"y":7,"x":0},{"y":8,"x":13},{"y":8,"x":11},{"y":8,"x":9},{"y":8,"x":7},{"y":8,"x":5},{"y":10,"x":13},{"y":10,"x":11},{"y":10,"x":9},{"y":10,"x":7},{"y":10,"x":5},{"y":12,"x":12},{"y":12,"x":10},{"y":12,"x":8},{"y":12,"x":6}],[{"y":2,"x":11},{"y":2,"x":7},{"y":6,"x":9},{"y":8,"x":12},{"y":8,"x":10},{"y":8,"x":8},{"y":8,"x":6},{"y":10,"x":12},{"y":10,"x":10},{"y":10,"x":8},{"y":10,"x":6},{"y":12,"x":10},{"y":12,"x":8}]],
//Juanmv94
[[{"y":10,"x":0},{"y":12,"x":0},{"y":14,"x":0},{"y":16,"x":0},{"y":4,"x":2},{"y":6,"x":2},{"y":10,"x":2},{"y":6,"x":4},{"y":10,"x":4},{"y":12,"x":4},{"y":14,"x":4},{"y":16,"x":4},{"y":0,"x":6},{"y":2,"x":6},{"y":4,"x":6},{"y":6,"x":6},{"y":10,"x":6},{"y":12,"x":8},{"y":14,"x":8},{"y":16,"x":8},{"y":0,"x":10},{"y":2,"x":10},{"y":4,"x":10},{"y":6,"x":10},{"y":6,"x":12},{"y":10,"x":12},{"y":12,"x":12},{"y":14,"x":12},{"y":0,"x":14},{"y":2,"x":14},{"y":4,"x":14},{"y":6,"x":14},{"y":16,"x":14},{"y":10,"x":16},{"y":12,"x":16},{"y":14,"x":16},{"y":0,"x":18},{"y":2,"x":18},{"y":4,"x":18},{"y":6,"x":18},{"y":0,"x":20},{"y":4,"x":20},{"y":10,"x":20},{"y":12,"x":20},{"y":14,"x":20},{"y":0,"x":22},{"y":2,"x":22},{"y":4,"x":22},{"y":6,"x":22},{"y":10,"x":22},{"y":14,"x":22},{"y":10,"x":24},{"y":12,"x":24},{"y":14,"x":24},{"y":16,"x":24},{"y":0,"x":26},{"y":2,"x":26},{"y":4,"x":26},{"y":6,"x":26},{"y":0,"x":28},{"y":10,"x":28},{"y":12,"x":28},{"y":14,"x":28},{"y":2,"x":30},{"y":4,"x":30},{"y":6,"x":30},{"y":14,"x":30},{"y":10,"x":32},{"y":12,"x":32},{"y":14,"x":32},{"y":16,"x":32}]],
//Cuatro (reducido)
[[{"y":0,"x":29},{"y":2,"x":29},{"y":4,"x":29},{"y":6,"x":29},{"y":10,"x":29},{"y":12,"x":29},{"y":14,"x":29},{"y":16,"x":29},{"y":0,"x":27},{"y":2,"x":27},{"y":4,"x":27},{"y":6,"x":27},{"y":10,"x":27},{"y":12,"x":27},{"y":14,"x":27},{"y":16,"x":27},{"y":0,"x":25},{"y":2,"x":25},{"y":4,"x":25},{"y":6,"x":25},{"y":10,"x":25},{"y":12,"x":25},{"y":14,"x":25},{"y":16,"x":25},{"y":0,"x":23},{"y":2,"x":23},{"y":4,"x":23},{"y":6,"x":23},{"y":10,"x":23},{"y":12,"x":23},{"y":14,"x":23},{"y":16,"x":23},{"y":7,"x":17},{"y":9,"x":17},{"y":7,"x":15},{"y":9,"x":15},{"y":7,"x":13},{"y":9,"x":13},{"y":0,"x":7},{"y":2,"x":7},{"y":4,"x":7},{"y":6,"x":7},{"y":10,"x":7},{"y":12,"x":7},{"y":14,"x":7},{"y":16,"x":7},{"y":0,"x":5},{"y":2,"x":5},{"y":4,"x":5},{"y":6,"x":5},{"y":10,"x":5},{"y":12,"x":5},{"y":14,"x":5},{"y":16,"x":5},{"y":0,"x":3},{"y":2,"x":3},{"y":4,"x":3},{"y":6,"x":3},{"y":10,"x":3},{"y":12,"x":3},{"y":14,"x":3},{"y":16,"x":3},{"y":0,"x":1},{"y":2,"x":1},{"y":4,"x":1},{"y":6,"x":1},{"y":10,"x":1},{"y":12,"x":1},{"y":14,"x":1},{"y":16,"x":1}],[{"y":1,"x":28},{"y":3,"x":28},{"y":5,"x":28},{"y":11,"x":28},{"y":13,"x":28},{"y":15,"x":28},{"y":1,"x":26},{"y":3,"x":26},{"y":5,"x":26},{"y":11,"x":26},{"y":13,"x":26},{"y":15,"x":26},{"y":1,"x":24},{"y":3,"x":24},{"y":5,"x":24},{"y":11,"x":24},{"y":13,"x":24},{"y":15,"x":24},{"y":2,"x":22},{"y":4,"x":22},{"y":12,"x":22},{"y":14,"x":22},{"y":2,"x":20},{"y":4,"x":20},{"y":12,"x":20},{"y":14,"x":20},{"y":2,"x":10},{"y":4,"x":10},{"y":12,"x":10},{"y":14,"x":10},{"y":2,"x":8},{"y":4,"x":8},{"y":12,"x":8},{"y":14,"x":8},{"y":1,"x":6},{"y":3,"x":6},{"y":5,"x":6},{"y":11,"x":6},{"y":13,"x":6},{"y":15,"x":6},{"y":1,"x":4},{"y":3,"x":4},{"y":5,"x":4},{"y":11,"x":4},{"y":13,"x":4},{"y":15,"x":4},{"y":1,"x":2},{"y":3,"x":2},{"y":5,"x":2},{"y":11,"x":2},{"y":13,"x":2},{"y":15,"x":2}],[{"y":2,"x":19},{"y":4,"x":19},{"y":12,"x":19},{"y":14,"x":19},{"y":2,"x":17},{"y":4,"x":17},{"y":12,"x":17},{"y":14,"x":17},{"y":2,"x":13},{"y":4,"x":13},{"y":12,"x":13},{"y":14,"x":13},{"y":2,"x":11},{"y":4,"x":11},{"y":12,"x":11},{"y":14,"x":11}],[{"y":2,"x":16},{"y":4,"x":16},{"y":12,"x":16},{"y":14,"x":16},{"y":2,"x":14},{"y":4,"x":14},{"y":12,"x":14},{"y":14,"x":14}]],
//volante
[[{"y":0,"x":22},{"y":0,"x":20},{"y":0,"x":13},{"y":0,"x":11},{"y":0,"x":4},{"y":0,"x":2},{"y":2,"x":22},{"y":2,"x":18},{"y":2,"x":16},{"y":2,"x":14},{"y":2,"x":12},{"y":2,"x":10},{"y":2,"x":8},{"y":2,"x":6},{"y":2,"x":2},{"y":4,"x":24},{"y":4,"x":22},{"y":4,"x":18},{"y":4,"x":6},{"y":4,"x":2},{"y":4,"x":0},{"y":5,"x":13},{"y":5,"x":11},{"y":6,"x":24},{"y":6,"x":22},{"y":6,"x":20},{"y":6,"x":18},{"y":6,"x":6},{"y":6,"x":4},{"y":6,"x":2},{"y":6,"x":0},{"y":7,"x":13},{"y":7,"x":11},{"y":8,"x":24},{"y":8,"x":22},{"y":8,"x":18},{"y":8,"x":6},{"y":8,"x":2},{"y":8,"x":0},{"y":10,"x":22},{"y":10,"x":18},{"y":10,"x":16},{"y":10,"x":14},{"y":10,"x":12},{"y":10,"x":10},{"y":10,"x":8},{"y":10,"x":6},{"y":10,"x":2},{"y":12,"x":22},{"y":12,"x":20},{"y":12,"x":13},{"y":12,"x":11},{"y":12,"x":4},{"y":12,"x":2}],[{"y":0,"x":22},{"y":0,"x":20},{"y":0,"x":13},{"y":0,"x":11},{"y":0,"x":4},{"y":0,"x":2},{"y":2,"x":22},{"y":2,"x":18},{"y":2,"x":16},{"y":2,"x":14},{"y":2,"x":12},{"y":2,"x":10},{"y":2,"x":8},{"y":2,"x":6},{"y":2,"x":2},{"y":4,"x":22},{"y":4,"x":18},{"y":4,"x":6},{"y":4,"x":2},{"y":5,"x":13},{"y":5,"x":11},{"y":6,"x":22},{"y":6,"x":20},{"y":6,"x":18},{"y":6,"x":6},{"y":6,"x":4},{"y":6,"x":2},{"y":7,"x":13},{"y":7,"x":11},{"y":8,"x":22},{"y":8,"x":18},{"y":8,"x":6},{"y":8,"x":2},{"y":10,"x":22},{"y":10,"x":18},{"y":10,"x":16},{"y":10,"x":14},{"y":10,"x":12},{"y":10,"x":10},{"y":10,"x":8},{"y":10,"x":6},{"y":10,"x":2},{"y":12,"x":22},{"y":12,"x":20},{"y":12,"x":13},{"y":12,"x":11},{"y":12,"x":4},{"y":12,"x":2}],[{"y":0,"x":12},{"y":2,"x":18},{"y":2,"x":16},{"y":2,"x":14},{"y":2,"x":12},{"y":2,"x":10},{"y":2,"x":8},{"y":2,"x":6},{"y":4,"x":18},{"y":4,"x":6},{"y":5,"x":13},{"y":5,"x":11},{"y":6,"x":20},{"y":6,"x":18},{"y":6,"x":6},{"y":6,"x":4},{"y":7,"x":13},{"y":7,"x":11},{"y":8,"x":18},{"y":8,"x":6},{"y":10,"x":18},{"y":10,"x":16},{"y":10,"x":14},{"y":10,"x":12},{"y":10,"x":10},{"y":10,"x":8},{"y":10,"x":6},{"y":12,"x":12}],[{"y":2,"x":16},{"y":2,"x":14},{"y":2,"x":12},{"y":2,"x":10},{"y":2,"x":8},{"y":5,"x":13},{"y":5,"x":11},{"y":7,"x":13},{"y":7,"x":11},{"y":10,"x":16},{"y":10,"x":14},{"y":10,"x":12},{"y":10,"x":10},{"y":10,"x":8}],[{"y":5,"x":13},{"y":5,"x":11},{"y":7,"x":13},{"y":7,"x":11}]],
//Torres (reducido)
[[{"y":0,"x":26},{"y":2,"x":26},{"y":6,"x":26},{"y":8,"x":26},{"y":12,"x":26},{"y":14,"x":26},{"y":0,"x":24},{"y":2,"x":24},{"y":6,"x":24},{"y":8,"x":24},{"y":12,"x":24},{"y":14,"x":24},{"y":0,"x":20},{"y":2,"x":20},{"y":6,"x":20},{"y":8,"x":20},{"y":12,"x":20},{"y":14,"x":20},{"y":0,"x":18},{"y":2,"x":18},{"y":6,"x":18},{"y":8,"x":18},{"y":12,"x":18},{"y":14,"x":18},{"y":0,"x":14},{"y":2,"x":14},{"y":6,"x":14},{"y":8,"x":14},{"y":12,"x":14},{"y":14,"x":14},{"y":0,"x":12},{"y":2,"x":12},{"y":6,"x":12},{"y":8,"x":12},{"y":12,"x":12},{"y":14,"x":12},{"y":0,"x":8},{"y":2,"x":8},{"y":6,"x":8},{"y":8,"x":8},{"y":12,"x":8},{"y":14,"x":8},{"y":0,"x":6},{"y":2,"x":6},{"y":6,"x":6},{"y":8,"x":6},{"y":12,"x":6},{"y":14,"x":6},{"y":0,"x":2},{"y":2,"x":2},{"y":6,"x":2},{"y":8,"x":2},{"y":12,"x":2},{"y":14,"x":2},{"y":0,"x":0},{"y":2,"x":0},{"y":6,"x":0},{"y":8,"x":0},{"y":12,"x":0},{"y":14,"x":0}],[{"y":1,"x":25},{"y":3,"x":25},{"y":5,"x":25},{"y":7,"x":25},{"y":9,"x":25},{"y":11,"x":25},{"y":13,"x":25},{"y":1,"x":23},{"y":7,"x":23},{"y":13,"x":23},{"y":1,"x":21},{"y":7,"x":21},{"y":13,"x":21},{"y":1,"x":19},{"y":3,"x":19},{"y":5,"x":19},{"y":7,"x":19},{"y":9,"x":19},{"y":11,"x":19},{"y":13,"x":19},{"y":1,"x":17},{"y":7,"x":17},{"y":13,"x":17},{"y":1,"x":15},{"y":7,"x":15},{"y":13,"x":15},{"y":1,"x":13},{"y":3,"x":13},{"y":5,"x":13},{"y":7,"x":13},{"y":9,"x":13},{"y":11,"x":13},{"y":13,"x":13},{"y":1,"x":11},{"y":7,"x":11},{"y":13,"x":11},{"y":1,"x":9},{"y":7,"x":9},{"y":13,"x":9},{"y":1,"x":7},{"y":3,"x":7},{"y":5,"x":7},{"y":7,"x":7},{"y":9,"x":7},{"y":11,"x":7},{"y":13,"x":7},{"y":1,"x":5},{"y":7,"x":5},{"y":13,"x":5},{"y":1,"x":3},{"y":7,"x":3},{"y":13,"x":3},{"y":1,"x":1},{"y":3,"x":1},{"y":5,"x":1},{"y":7,"x":1},{"y":9,"x":1},{"y":11,"x":1},{"y":13,"x":1}],[{"y":1,"x":25},{"y":7,"x":25},{"y":13,"x":25},{"y":1,"x":19},{"y":7,"x":19},{"y":13,"x":19},{"y":1,"x":13},{"y":7,"x":13},{"y":13,"x":13},{"y":1,"x":7},{"y":7,"x":7},{"y":13,"x":7},{"y":1,"x":1},{"y":7,"x":1},{"y":13,"x":1}]]
];

const borderPieza=R.clamp(Shaders.sdfRectangle(R.pack2(0.5,0.5),R.pack2(0.15,0.15),{sdfVariant: Shaders.SdfVariant.EXACT}).mul(2).add(R.pack4(0.5,0.2,0.1,0)),0,1);
const bordersPieza=new Array(np);
const animacionesp=new Array(np);
const linearSampler = Animation.samplers.easeInOutQuad(0,1);
for (let i=0;i<np;i++) {
	var timeDriver = Animation.timeDriver({durationMilliseconds: 300});
	var timeline = Animation.animate(timeDriver,linearSampler);
	animacionesp[i]={td:timeDriver, tl:timeline};
	bordersPieza[i]=R.mul(borderPieza,R.pack4(1,1,1,animacionesp[i].tl));
}

export var materiales,piezas,texturas;
const materialesP=Promise.all([...Array(np).keys()].map(function(n){return Materials.findFirst("material"+n);}));
const texturasP=Promise.all([...Array(nd).keys()].map(function(n){return Textures.findFirst(""+n);}));
const sonidosP=["boton","block","terminado"].reduce(async function(a,b){var af=await a; af[b]=await Audio.getAudioPlaybackController(b);return af},{});
Scene.root.findFirst("placer").then(function(placer) {
		///////////Logica inicio
		placer.findFirst("bloques",{recursive:false}).then(function(bloques) {
		var piezasP=Promise.all([...Array(np).keys()].map(function(n){return bloques.findFirst("b"+n,{recursive:false});}));
		Promise.all([materialesP,piezasP,texturasP,sonidosP]).then(function(arr) {
			const bkgPiezaC=R.clamp(Shaders.sdfRectangle(R.pack2(0.5,0.5),R.pack2(0.55,0.55),{sdfVariant: Shaders.SdfVariant.EXACT}).mul(-8),0.5,1);
			const bkgPieza=R.pack4(bkgPiezaC,bkgPiezaC,bkgPiezaC.mul(0.75),1);
			materiales=arr[0], piezas=arr[1], texturas=arr[2].map(x=>Shaders.blend(x.signal,bkgPieza,{mode: Shaders.BlendMode.NORMAL})), sonidos=arr[3];
			for (let i=0;i<np;i++) {
				TouchGestures.onTap(piezas[i]).subscribe(function(){piTouch(i);});
				var newtex=Shaders.blend(bordersPieza[i],texturas[(i>>1)%nd],{mode: Shaders.BlendMode.NORMAL});
				materiales[i].setTextureSlot(Shaders.DefaultMaterialTextures.DIFFUSE,newtex);
			}
			inicializa(mahong);
			placer.findFirst("botones",{recursive:false}).then(function(botones) {
				/////////Una vez inicializado el primer mahong, inicializamos botones
				botones.findFirst("next",{recursive:false}).then(function(nextb) {
					TouchGestures.onTap(nextb).subscribe(function(){
						if (piezaSeleccionada!=null) {
							animacionesp[piezaSeleccionada].td.stop();
							animacionesp[piezaSeleccionada].td.reset();
							piezaSeleccionada=null;
						}
						Patches.inputs.setBoolean("needMix",false);
						piezas.forEach(x=>x.hidden=true);
						mahong=(mahong+1)%mahongs.length;
						inicializa(mahong);
					});
				});
				botones.findFirst("restart",{recursive:false}).then(function(restartb) {
					TouchGestures.onTap(restartb).subscribe(function(){
						if (piezaSeleccionada!=null) {
							animacionesp[piezaSeleccionada].td.stop();
							animacionesp[piezaSeleccionada].td.reset();
							piezaSeleccionada=null;
						}
						Patches.inputs.setBoolean("needMix",false);
						inicializa(mahong);
					});
				});
				botones.findFirst("mix",{recursive:false}).then(function(mixb) {
					TouchGestures.onTap(mixb).subscribe(function(){
						if (piezaSeleccionada!=null) {
							animacionesp[piezaSeleccionada].td.stop();
							animacionesp[piezaSeleccionada].td.reset();
							piezaSeleccionada=null;
						}
						mix();
						Patches.inputs.setBoolean("needMix",!hayCombinaciones());
					});
				});
			});
		});
	});
});

export var colocadas,piezaSeleccionada=null;;
function inicializa(mn) {
	var totalpiezas=mahongs[mn].map(x=>x.length).reduce((x,y)=>x+y);
	//Diagnostics.log(totalpiezas);
	if (totalpiezas>np) return;	//error: demasiadas piezas
	var piezass=[...Array(totalpiezas).keys()].sort((x,y)=>Math.random()-0.5);
	colocadas={};
	var p=0;
	for (let al=0;al<mahongs[mn].length;al++) for (let i=0;i<mahongs[mn][al].length;i++) {
		var index=piezass[p];
		var x=mahongs[mn][al][i].x,z=mahongs[mn][al][i].y;
		piezas[index].hidden=false;
		piezas[index].transform.x=x*0.05;
		piezas[index].transform.y=al*0.1;
		piezas[index].transform.z=z*0.05;
		piezas[index].posx=x;
		piezas[index].posy=al
		piezas[index].posz=z;
		colocadas[""+x+","+al+","+z]=index;
		p++;
	}
	if (!hayCombinaciones()) mix();
	//Diagnostics.log("Inicializacion completa");
}

function piTouch(n) {
	if (!seleccionable(piezas[n])) return;
	if (piezaSeleccionada!=null) {
		if (piezaSeleccionada==n) {
			animacionesp[piezaSeleccionada].td.stop();
			animacionesp[piezaSeleccionada].td.reset();
			piezaSeleccionada=null;
		} else if (((n>>1)%nd)==((piezaSeleccionada>>1)%nd)) {
			sonidos.block.reset();
			sonidos.block.setPlaying(true);
			piezas[n].hidden=true;
			piezas[piezaSeleccionada].hidden=true;
			delete colocadas[""+(piezas[n].posx)+","+piezas[n].posy+","+piezas[n].posz];
			delete colocadas[""+(piezas[piezaSeleccionada].posx)+","+piezas[piezaSeleccionada].posy+","+piezas[piezaSeleccionada].posz];
			animacionesp[piezaSeleccionada].td.stop();
			animacionesp[piezaSeleccionada].td.reset();
			piezaSeleccionada=null;
			if (!verificaTerminado() && !hayCombinaciones()) Patches.inputs.setBoolean("needMix",true);
		}
	} else {
		piezaSeleccionada=n;
		animacionesp[piezaSeleccionada].td.start();
		sonidos.boton.reset();
		sonidos.boton.setPlaying(true);
	}
}

function verificaTerminado() {
	if (Object.keys(colocadas).length>0) return false;
	sonidos.terminado.reset();
	sonidos.terminado.setPlaying(true);
	Patches.inputs.setPulse("finished",R.once());
	return true;
}

export function mix() {
	var limit=0;
	do {
		var piezass=Object.values(colocadas).sort(function(x,y){return Math.random()-0.5})
		var c=0;
		for (let x in colocadas) {
			var cmps=x.split(",").map(x=>parseInt(x));
			piezas[piezass[c]].transform.x=cmps[0]*0.05;
			piezas[piezass[c]].transform.y=cmps[1]*0.1;
			piezas[piezass[c]].transform.z=cmps[2]*0.05;
			piezas[piezass[c]].posx=cmps[0];
			piezas[piezass[c]].posy=cmps[1];
			piezas[piezass[c]].posz=cmps[2];
			colocadas[x]=piezass[c];
			c++;
		}
	} while (!hayCombinaciones() && (limit++)<32);
	////Diagnostics.log(hayCombinaciones());
}

export function hayCombinaciones() {
	var piezasf=Object.values(colocadas).filter(x=>seleccionable(piezas[x])).map(x=>(x>>1)%nd);
	////Diagnostics.log(piezasf);
	var s=new Set();
	for (let i=0;i<piezasf.length;i++) {
		if (s.size==s.add(piezasf[i]).size) return true;
	}
	return false;
}

function seleccionable(pieza) {
	if (((colocadas[""+(pieza.posx+2)+","+pieza.posy+","+pieza.posz] != undefined)
		|| (colocadas[""+(pieza.posx+2)+","+pieza.posy+","+(pieza.posz+1)] != undefined)
		|| (colocadas[""+(pieza.posx+2)+","+pieza.posy+","+(pieza.posz-1)] != undefined))
		&& ((colocadas[""+(pieza.posx-2)+","+pieza.posy+","+pieza.posz] != undefined)
		|| (colocadas[""+(pieza.posx-2)+","+pieza.posy+","+(pieza.posz+1)] != undefined)
		|| (colocadas[""+(pieza.posx-2)+","+pieza.posy+","+(pieza.posz-1)] != undefined))) return false;
	if ((colocadas[""+pieza.posx+","+(pieza.posy+1)+","+pieza.posz] != undefined)
		|| (colocadas[""+(pieza.posx+1)+","+(pieza.posy+1)+","+pieza.posz] != undefined)
		|| (colocadas[""+(pieza.posx-1)+","+(pieza.posy+1)+","+pieza.posz] != undefined)
		|| (colocadas[""+pieza.posx+","+(pieza.posy+1)+","+(pieza.posz+1)] != undefined)
		|| (colocadas[""+(pieza.posx+1)+","+(pieza.posy+1)+","+(pieza.posz+1)] != undefined)
		|| (colocadas[""+(pieza.posx-1)+","+(pieza.posy+1)+","+(pieza.posz+1)] != undefined)
		|| (colocadas[""+pieza.posx+","+(pieza.posy+1)+","+(pieza.posz-1)] != undefined)
		|| (colocadas[""+(pieza.posx+1)+","+(pieza.posy+1)+","+(pieza.posz-1)] != undefined)
		|| (colocadas[""+(pieza.posx-1)+","+(pieza.posy+1)+","+(pieza.posz-1)] != undefined)) return false;
		return true;
}
