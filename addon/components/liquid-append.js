import Component from '@glimmer/component';
import { action } from '@ember/object';

import $ from 'jquery';

export default class LiquidAppend extends Component {
  @action
  _didUpdate(element) {
    if (this.args.replaceNodes) {
      const nodes = this.args.nodes;

      $(element).children().remove();
      $(element).append(nodes);
    }
  }

  @action
  _didInsert(element) {
    const { nodes, notify } = this.args;

    if (notify && notify.willAppendNodes) {
      notify.willAppendNodes(element);
    }

    $(element).append(nodes);

    if (notify && notify.didAppendNodes) {
      notify.didAppendNodes(element);
    }
  }
}
