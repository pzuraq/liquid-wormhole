import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    showWormhole() {
      this.toggleProperty('showWormhole');
    },
  },
});
