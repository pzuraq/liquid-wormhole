import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    showFirstStep() {
      this.toggleProperty('showFirstStep');
    },

    showSecondStep() {
      this.toggleProperty('showSecondStep');
    },

    closeModal() {
      this.toggleProperty('showFirstStep');
      this.toggleProperty('showSecondStep');
    },
  },
});
