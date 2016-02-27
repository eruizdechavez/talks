import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('control-de-sesion', 'Integration | Component | control de sesion', {
  integration: true
});

test('it renders', function(assert) {
  let done = assert.async();

  this.setProperties({
    isSignedIn: false,
    meetupname: 'Foo',
    actions: {
      testingToggle() {
        assert.ok(true);
        done();
      },
    },
  });


  this.render(hbs`{{control-de-sesion isSignedIn=isSignedIn meetupname=meetupname toggleSession=(action 'testingToggle')}}`);

  assert.ok(this.$().text().trim().indexOf('Inicia') === 0);

  this.set("isSignedIn", true);
  assert.ok(this.$().text().trim().indexOf('Bienvenido') === 0);

  this.$('button').click();
});
