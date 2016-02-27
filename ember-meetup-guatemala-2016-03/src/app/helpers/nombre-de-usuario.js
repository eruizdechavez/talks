import Ember from 'ember';

export function nombreDeUsuario([{username, firstname}], {isSignedIn: isSignedIn = false, guestName: guestName = 'Invitado'}) {
  if (!isSignedIn) {
    return guestName;
  }

  return firstname ? firstname : username;
}

export default Ember.Helper.helper(nombreDeUsuario);
