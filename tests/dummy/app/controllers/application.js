/**
 * @module Controllers
 *
 */
import Controller from '@ember/controller';

/**
 * @class Application
 */
export default Controller.extend({
	signatureData: null,
	command: null,

	logger(...args) {
		window.console.log('log', ...args);
	},

	actions: {
		onChange(data) {
			this.set('signatureData', data[1]);
		},

		log(...args) {
			this.logger(...args);
		},

		reset() {
			this.set('command', {command: 'reset', args: [], cb: (...args) => this.logger(...args)});
		},

		clear() {
			this.set('command', {command: 'clear', args: [], cb: (...args) => this.logger(...args)});
		},

		disable() {
			this.set('command', {command: 'disable', args: [], cb: (...args) => this.logger(...args)});
		},

		enable() {
			this.set('command', {command: 'enable', args: [], cb: (...args) => this.logger(...args)});
		},

		getData() {
			this.set('command', {command: 'getData', args: ['base30'], cb: (...args) => this.logger(...args)});
		}
	}
});
