import Controller from '@ember/controller';

export default Controller.extend({
  showingOther: true,
  actions: {
    toggleContent() {
      this.toggleProperty('showingOther');
    },
  },
});
