/* eslint-env node */
'use strict';

module.exports = {
	name: 'ember-jsignature',

	options: {
		nodeAssets: {
			jsignature: {
				srcDir: 'src',
				import: [
					'jSignature.js',
					'plugins/jSignature.UndoButton.js',
					'plugins/jSignature.CompressorSVG.js',
					'plugins/jSignature.CompressorBase30.js'
					// 'plugins/signhere/jSignature.SignHere.js'
				]
			}
		}
	}
};
