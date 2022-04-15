var QRCode = require('./QRCode');
var ErrorCorrectLevel = require('./ErrorCorrectLevel');

var qrcode = function(data, opt) {
	opt = opt || {};
  var level = isNaN(opt.errorCorrectLevel) ? ErrorCorrectLevel.H : opt.errorCorrectLevel;
  var qr = new QRCode(opt.typeNumber || -1, level);
  qr.addData(data);
	qr.make();

	return qr;
};

qrcode.ErrorCorrectLevel = ErrorCorrectLevel;

module.exports = qrcode;

