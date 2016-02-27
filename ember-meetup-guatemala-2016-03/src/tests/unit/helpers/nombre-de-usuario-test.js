import { nombreDeUsuario } from 'ember-templates-live/helpers/nombre-de-usuario';
import { module, test } from 'qunit';

module('Unit | Helper | nombre de usuario');

test('it works', function(assert) {
  assert.equal(nombreDeUsuario([{}], {}), 'Invitado', 'Nombre es Invitado');
  assert.equal(nombreDeUsuario([{}], {guestName: 'Foo'}), 'Foo', 'Nombre es Foo');
  assert.equal(nombreDeUsuario([{username: 'foo'}], {}), 'Invitado', 'Nombre es Invitado');
  assert.equal(nombreDeUsuario([{username: 'foo'}], {isSignedIn: true}), 'foo', 'Nombre es foo');
  assert.equal(nombreDeUsuario([{username: 'foo', firstname: 'Bar'}], {isSignedIn: true}), 'Bar', 'Nombre es Bar');
});
