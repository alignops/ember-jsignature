/* jshint node: true */
'use strict';

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('jSignature', '2.0.2');
  }
};
