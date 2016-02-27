import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('comida-favorita', 'Integration | Component | comida favorita', {
  integration: true
});

test('it renders', function(assert) {
  this.set("favoriteFood", ['Foo', 'Bar']);

  this.render(hbs`{{comida-favorita favoriteFood=favoriteFood}}`);

  assert.equal(this.$('li:first').text().trim(), 'Foo');
  assert.equal(this.$('li:last').text().trim(), 'Bar');
});
