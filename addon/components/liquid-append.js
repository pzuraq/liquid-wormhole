import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LiquidAppend extends Component {
  @action
  _didUpdate(element) {
    if (this.args.replaceNodes) {
      const nodes = this.args.nodes;

      element.replaceChildren(...nodes);
    }
  }

  @action
  _didInsert(element) {
    const { nodes, notify } = this.args;

    if (notify && notify.willAppendNodes) {
      notify.willAppendNodes(element);
    }

    if (Array.isArray(nodes)) {
      element.append(...nodes);
    }

    if (notify && notify.didAppendNodes) {
      notify.didAppendNodes(element);
    }
  }
}
