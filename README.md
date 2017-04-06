ember-jsignature
==============================================================================

[![Build Status](https://travis-ci.org/busybusy/ember-jsignature.svg?branch=master)](https://travis-ci.org/busybusy/ember-jsignature)
[![npm version](https://badge.fury.io/js/ember-jsignature.svg)](https://badge.fury.io/js/ember-jsignature)
[![Build Status](https://travis-ci.org/busybusy/ember-jsignature.svg?branch=master)](https://travis-ci.org/busybusy/ember-jsignature)
[![Ember Observer Score](https://emberobserver.com/badges/ember-jsignature.svg)](https://emberobserver.com/addons/ember-jsignature)
[![Ember badge][ember-badge]][embadge]

[ember cli](https://ember-cli.com/) addon for [jSignature](https://willowsystems.github.io/jSignature/#/about/)

Installation
------------------------------------------------------------------------------

Install this addon using ember-cli:
```
ember install ember-jsignature
```

Usage
------------------------------------------------------------------------------

Use ember-jsignature in your template:
```
{{ember-jsignature
	exportFormat='native'
	color=color
	background-color=backgroundColor
	decor-color=lineColor
	showUndoButton=showUndoButton
	lineWidth=lineWidth
	width="100%"
	height="100%"
	command=command
	changeListener=(action "onChange")}}
```

Documentation
------------------------------------------------------------------------------

[Information for using jSignature](https://willowsystems.github.io/jSignature/#/about/)

[jSignature git repo](https://github.com/willowsystems/jSignature)

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).


License
------------------------------------------------------------------------------

[MIT License](https://opensource.org/licenses/mit-license.php)

[embadge]: http://embadge.io/
[ember-badge]: http://embadge.io/v1/badge.svg?start=2.11.0
