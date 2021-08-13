import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import $ from 'jquery';

@classic
export default class LiquidAppend extends Component {
  didUpdateAttrs() {
    super.didUpdateAttrs();
    if (this.replaceNodes) {
      const nodes = this.nodes;

      $(this.element).children().remove();
      $(this.element).append(nodes);
    }
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    const notify = this.notify;
    const nodes = this.nodes;

    if (notify && notify.willAppendNodes) {
      notify.willAppendNodes(this.element);
    }

    $(this.element).append(nodes);

    if (notify && notify.didAppendNodes) {
      notify.didAppendNodes(this.element);
    }
  }
}
