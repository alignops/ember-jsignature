import $ from 'jquery';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const TEST_DATA_BASE30 = `jBZe1Jttnmk1yfb8Y21O2V4U3M4x1E2woj8Za1u1H1W2W2B2Q2L1Q_9E0000000000Z5at1A1Lng36100Y48be1v1v1H1O1E_1uXZ5jdi1w1K1Xs1B1yaY1E1W3x3U1X2Ks1TpeZ21I1W3v3B3V1yhsd9Y91C1P2u1U1yhe65_5B087bm1z1EgmlZ11K1Q2v1Ueh240Y8h1Et1wkh311100005khed89`;

const TEST_DATA_SVG = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="867" height="257"><path stroke-linejoin="round" stroke-linecap="round" stroke-width="3" stroke="#000" fill="none" d="M 251 195 c -4.23 0 -172.37 1.39 -242 0 c -2.71 -0.05 -7.25 -3.11 -8 -5 c -0.82 -2.04 -0.08 -8.44 2 -10 c 11.82 -8.86 32.5 -20.7 50 -29 c 28.51 -13.53 56.76 -25.23 87 -36 c 49.27 -17.55 95.92 -33.2 146 -47 c 36.05 -9.94 70.87 -16.73 108 -23 c 41.71 -7.04 80.42 -11.27 123 -16 c 35.15 -3.91 67.02 -6.71 102 -9 c 17.43 -1.14 48.95 -1.15 51 -1 c 0.43 0.03 -6.53 2.96 -10 4 c -10.01 3 -19.52 5.36 -30 8 c -35.11 8.84 -67.15 14.97 -101 25 c -30.35 8.99 -58.59 19.24 -88 31 c -23.27 9.31 -44.22 19.69 -67 31 c -28.57 14.19 -54.85 27.12 -82 43 c -26.92 15.74 -51.32 32.08 -77 50 c -18.35 12.8 -52 40 -52 40"/><path stroke-linejoin="round" stroke-linecap="round" stroke-width="3" stroke="#000" fill="none" d="M 603 72 c -0.09 0 -3.55 -0.48 -5 0 c -5.98 1.99 -12.86 4.81 -19 8 c -10.68 5.55 -20.67 11.44 -31 18 c -11.2 7.11 -21.19 14.1 -32 22 c -16.08 11.75 -29.82 23.45 -46 35 c -19.95 14.25 -38.25 27 -59 40 c -33.55 21.02 -70.61 43.89 -99 59 c -2.48 1.32 -10.58 -0.1 -10 -1 c 3.49 -5.47 25.51 -31.51 40 -46 c 18.52 -18.52 37.22 -36.45 58 -52 c 29.67 -22.21 60.45 -42.78 93 -61 c 37.7 -21.11 76.44 -42.29 116 -56 c 42.54 -14.74 89.54 -23.28 135 -31 c 27.31 -4.64 54.59 -4.42 83 -6 c 8.54 -0.47 17.84 -1.47 25 0 c 4.61 0.95 12.47 4.8 14 8 c 1.63 3.39 0.91 13.4 -2 17 c -10.09 12.51 -28.27 29.36 -44 40 c -17.16 11.61 -37.84 20.74 -58 29 c -30 12.28 -59.86 23.39 -91 32 c -31.98 8.84 -63.48 14.21 -97 20 c -40.01 6.92 -76.71 11.66 -117 17 c -11.63 1.54 -22.24 2.3 -34 3 c -23.11 1.37 -68.17 2.89 -67 3 c 1.71 0.17 64.62 -1.06 98 0 c 20.5 0.65 41.1 0.93 60 5 c 18.66 4.02 37.49 12.39 56 20 c 11.83 4.86 23.87 10.14 34 17 c 10.96 7.42 21.95 17.52 31 27 l 11 17"/></svg>`;

const TEST_DATA_NATIVE = {
    "x": [ 929, 924, 905, 892, 874, 842, 796, 737, 709, 672, 638, 628, 668, 726, 819, 935, 994, 1070, 1098, 1153, 1178, 1192, 1190, 1146, 1088, 997, 900, 783, 749, 732, 704, 691, 682, 691, 729, 780, 840, 896, 930, 947, 961, 967, 972 ],
    "y": [ 157, 157, 165, 172, 183, 205, 240, 280, 296, 318, 339, 338, 292, 240, 179, 123, 109, 92, 90, 86, 86, 94, 111, 151, 180, 212, 232, 249, 252, 253, 254, 255, 255, 255, 255, 255, 260, 280, 297, 311, 324, 332, 341 ]
};

const TEST_DATA_SVG_BASE64 = `PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iODY3IiBoZWlnaHQ9IjI1NyI+PHBhdGggc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZT0iIzAwMCIgZmlsbD0ibm9uZSIgZD0iTSAyNTEgMTk1IGMgLTQuMjMgMCAtMTcyLjM3IDEuMzkgLTI0MiAwIGMgLTIuNzEgLTAuMDUgLTcuMjUgLTMuMTEgLTggLTUgYyAtMC44MiAtMi4wNCAtMC4wOCAtOC40NCAyIC0xMCBjIDExLjgyIC04Ljg2IDMyLjUgLTIwLjcgNTAgLTI5IGMgMjguNTEgLTEzLjUzIDU2Ljc2IC0yNS4yMyA4NyAtMzYgYyA0OS4yNyAtMTcuNTUgOTUuOTIgLTMzLjIgMTQ2IC00NyBjIDM2LjA1IC05Ljk0IDcwLjg3IC0xNi43MyAxMDggLTIzIGMgNDEuNzEgLTcuMDQgODAuNDIgLTExLjI3IDEyMyAtMTYgYyAzNS4xNSAtMy45MSA2Ny4wMiAtNi43MSAxMDIgLTkgYyAxNy40MyAtMS4xNCA0OC45NSAtMS4xNSA1MSAtMSBjIDAuNDMgMC4wMyAtNi41MyAyLjk2IC0xMCA0IGMgLTEwLjAxIDMgLTE5LjUyIDUuMzYgLTMwIDggYyAtMzUuMTEgOC44NCAtNjcuMTUgMTQuOTcgLTEwMSAyNSBjIC0zMC4zNSA4Ljk5IC01OC41OSAxOS4yNCAtODggMzEgYyAtMjMuMjcgOS4zMSAtNDQuMjIgMTkuNjkgLTY3IDMxIGMgLTI4LjU3IDE0LjE5IC01NC44NSAyNy4xMiAtODIgNDMgYyAtMjYuOTIgMTUuNzQgLTUxLjMyIDMyLjA4IC03NyA1MCBjIC0xOC4zNSAxMi44IC01MiA0MCAtNTIgNDAiLz48cGF0aCBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIiBkPSJNIDYwMyA3MiBjIC0wLjA5IDAgLTMuNTUgLTAuNDggLTUgMCBjIC01Ljk4IDEuOTkgLTEyLjg2IDQuODEgLTE5IDggYyAtMTAuNjggNS41NSAtMjAuNjcgMTEuNDQgLTMxIDE4IGMgLTExLjIgNy4xMSAtMjEuMTkgMTQuMSAtMzIgMjIgYyAtMTYuMDggMTEuNzUgLTI5LjgyIDIzLjQ1IC00NiAzNSBjIC0xOS45NSAxNC4yNSAtMzguMjUgMjcgLTU5IDQwIGMgLTMzLjU1IDIxLjAyIC03MC42MSA0My44OSAtOTkgNTkgYyAtMi40OCAxLjMyIC0xMC41OCAtMC4xIC0xMCAtMSBjIDMuNDkgLTUuNDcgMjUuNTEgLTMxLjUxIDQwIC00NiBjIDE4LjUyIC0xOC41MiAzNy4yMiAtMzYuNDUgNTggLTUyIGMgMjkuNjcgLTIyLjIxIDYwLjQ1IC00Mi43OCA5MyAtNjEgYyAzNy43IC0yMS4xMSA3Ni40NCAtNDIuMjkgMTE2IC01NiBjIDQyLjU0IC0xNC43NCA4OS41NCAtMjMuMjggMTM1IC0zMSBjIDI3LjMxIC00LjY0IDU0LjU5IC00LjQyIDgzIC02IGMgOC41NCAtMC40NyAxNy44NCAtMS40NyAyNSAwIGMgNC42MSAwLjk1IDEyLjQ3IDQuOCAxNCA4IGMgMS42MyAzLjM5IDAuOTEgMTMuNCAtMiAxNyBjIC0xMC4wOSAxMi41MSAtMjguMjcgMjkuMzYgLTQ0IDQwIGMgLTE3LjE2IDExLjYxIC0zNy44NCAyMC43NCAtNTggMjkgYyAtMzAgMTIuMjggLTU5Ljg2IDIzLjM5IC05MSAzMiBjIC0zMS45OCA4Ljg0IC02My40OCAxNC4yMSAtOTcgMjAgYyAtNDAuMDEgNi45MiAtNzYuNzEgMTEuNjYgLTExNyAxNyBjIC0xMS42MyAxLjU0IC0yMi4yNCAyLjMgLTM0IDMgYyAtMjMuMTEgMS4zNyAtNjguMTcgMi44OSAtNjcgMyBjIDEuNzEgMC4xNyA2NC42MiAtMS4wNiA5OCAwIGMgMjAuNSAwLjY1IDQxLjEgMC45MyA2MCA1IGMgMTguNjYgNC4wMiAzNy40OSAxMi4zOSA1NiAyMCBjIDExLjgzIDQuODYgMjMuODcgMTAuMTQgMzQgMTcgYyAxMC45NiA3LjQyIDIxLjk1IDE3LjUyIDMxIDI3IGwgMTEgMTciLz48L3N2Zz4=`;

moduleForComponent('ember-jsignature', 'Integration | Component | EmberJsignature', {
	integration: true
});

test('it renders', function(assert) {
	// Set any properties with this.set('myProperty', 'value');
	// Handle any actions with this.on('myAction', function(val) { ... });
	this.render(hbs`{{ember-jsignature}}`);

	assert.equal(this.$().text().trim(), '');
});

test('properties | background-color', function(assert) {
	const expected = '#0f0';
	this.set('bgColor', expected);
	this.render(hbs`{{ember-jsignature background-color=bgColor}}`);

	// jquery returngs rgba format, so we need an rgba to compare
	assert.equal(this.$().find('canvas').css('background-color'), $(`<div style="background-color: ${expected}" />`).css('background-color'), 'background-color matches');
});

test('properties | width', function(assert) {
	const expected = '300px';
	this.set('width', expected);
	this.render(hbs`{{ember-jsignature width=width}}`);

	assert.equal(this.$().find('canvas').css('width'), expected, 'width matches');
});

test('properties | height', function(assert) {
	const expected = '300px';
	this.set('height', expected);
	this.render(hbs`{{ember-jsignature height=height}}`);

	assert.equal(this.$().find('canvas').css('height'), expected, 'height matches');
});

test('data | import base30 | export base30', function(assert) {
	this.set('importData', TEST_DATA_BASE30);
	this.actions.onChange = (data) => this.set('exportData', data[1]);
	this.render(hbs`{{ember-jsignature importFormat="base30" exportFormat="base30" data=importData changeListener=(action "onChange")}}`);

	assert.equal(this.get('exportData'), TEST_DATA_BASE30, 'data matches');
});

test('data | import base30 | export svg', function(assert) {
	this.set('importData', TEST_DATA_BASE30);
	this.actions.onChange = (data) => this.set('exportData', data[1]);
	this.render(hbs`{{ember-jsignature importFormat="base30" exportFormat="svg" data=importData changeListener=(action "onChange")}}`);

	assert.equal(this.get('exportData'), TEST_DATA_SVG, 'data matches');
});

test('data | import base30 | export native', function(assert) {
	this.set('importData', TEST_DATA_BASE30);
	this.actions.onChange = (data) => this.set('exportData', data[1]);
	this.render(hbs`{{ember-jsignature importFormat="base30" exportFormat="native" data=importData changeListener=(action "onChange")}}`);

	assert.deepEqual(this.get('exportData'), TEST_DATA_NATIVE, 'data matches');
});

test('data | import base30 | export svgbase64', function(assert) {
	this.set('importData', TEST_DATA_BASE30);
	this.actions.onChange = (data) => this.set('exportData', data[1]);
	this.render(hbs`{{ember-jsignature importFormat="base30" exportFormat="svgbase64" data=importData changeListener=(action "onChange")}}`);

	assert.deepEqual(this.get('exportData'), TEST_DATA_SVG_BASE64, 'data matches');
});
