/* jshint node: true */
'use strict';

module.exports = {
	name: 'ember-jsignature',

	included: function(target) {
		this._super.included.apply(this, arguments);

		var app = target.app || target;

		app.import(app.bowerDirectory + '/jSignature/src/jSignature.js');
		app.import(app.bowerDirectory + '/jSignature/src/plugins/jSignature.CompressorBase30.js');
		app.import(app.bowerDirectory + '/jSignature/src/plugins/jSignature.CompressorSVG.js');
		app.import(app.bowerDirectory + '/jSignature/src/plugins/jSignature.UndoButton.js');
	}
};
