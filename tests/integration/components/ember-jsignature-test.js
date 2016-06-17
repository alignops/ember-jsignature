import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('addon-jsignature', 'Integration | Component | addon jsignature', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{addon-jsignature}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#addon-jsignature}}
      template block text
    {{/addon-jsignature}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
