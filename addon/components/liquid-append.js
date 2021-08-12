import Component from '@ember/component';

export default Component.extend({
  didUpdateAttrs() {
    if (this.replaceNodes) {
      const nodes = this.nodes;

      this.$().children().remove();
      this.$().append(nodes);
    }
  },

  didInsertElement() {
    const notify = this.notify;
    const nodes = this.nodes;

    if (notify && notify.willAppendNodes) {
      notify.willAppendNodes(this.element);
    }

    this.$().append(nodes);

    if (notify && notify.didAppendNodes) {
      notify.didAppendNodes(this.element);
    }
  }
});
