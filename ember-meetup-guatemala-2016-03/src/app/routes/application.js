import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const firstname = 'Erick';
    const username = '@eruizdechavez';
    const favoriteFood = ['Hamburger 🍔', 'Pizza 🍕', 'Hot-Dog 🌭'];

    return {
      firstname,
      username,
      favoriteFood,
    };
  },
});
