import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('solo-en-sesion', 'Integration | Component | solo en sesion', {
  integration: true
});

test('it renders', function(assert) {
  this.set('isSignedIn', false);

  this.render(hbs`
    {{#solo-en-sesion isSignedIn=isSignedIn}}
      Hola!
    {{/solo-en-sesion}}
  `);

  assert.equal(this.$().text().trim(), 'Este contenido requiere que inicies sesion.');

  this.set('isSignedIn', true);

  assert.equal(this.$().text().trim(), 'Hola!');

});
