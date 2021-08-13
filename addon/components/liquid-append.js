import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  didUpdateAttrs() {
    this._super();
    if (this.replaceNodes) {
      const nodes = this.nodes;

      $(this.element).children().remove();
      $(this.element).append(nodes);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    const notify = this.notify;
    const nodes = this.nodes;

    if (notify && notify.willAppendNodes) {
      notify.willAppendNodes(this.element);
    }

    $(this.element).append(nodes);

    if (notify && notify.didAppendNodes) {
      notify.didAppendNodes(this.element);
    }
  },
});
