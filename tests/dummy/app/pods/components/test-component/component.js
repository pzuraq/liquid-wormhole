import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout: layout,

  actions: {
    sendAction() {
      const action = this.action;
      if (action) {
        return action(...arguments);
      }
    }
  }
});
