import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    toggleWormhole() {
      this.toggleProperty('hideWormhole');
    },
  },
});
