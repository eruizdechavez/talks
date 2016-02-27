import Ember from 'ember';

export default Ember.Controller.extend({
  meetupname: 'Ember Meetup Guatemala ✨',
  isSignedIn: true,

  actions: {
    iniciarCerrarSesion() {
      this.toggleProperty('isSignedIn');
    },
  },
});
