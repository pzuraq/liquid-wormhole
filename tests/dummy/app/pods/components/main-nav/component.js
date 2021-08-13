import Component from '@ember/component';

export default Component.extend({
  tagName: 'nav',
  classNames: ['main-nav'],

  click(event) {
    const target = event?.target;

    if (target !== this.element) {
      if (target.closest(this.element.querySelector('a.nav-item')).length) {
        this.set('navOpen', false);
      }
    }
  },

  actions: {
    toggleNav() {
      this.toggleProperty('navOpen');
    },
  },
});
