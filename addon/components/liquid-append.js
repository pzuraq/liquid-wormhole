import Component from '@ember/component';
import { action } from '@ember/object';
import { tagName } from '@ember-decorators/component';

import $ from 'jquery';

@tagName('')
export default class LiquidAppend extends Component {
  @action
  _didUpdate(element) {
    if (this.replaceNodes) {
      const nodes = this.nodes;

      $(element).children().remove();
      $(element).append(nodes);
    }
  }

  @action
  _didInsert(element) {
    const notify = this.notify;
    const nodes = this.nodes;

    if (notify && notify.willAppendNodes) {
      notify.willAppendNodes(element);
    }

    $(element).append(nodes);

    if (notify && notify.didAppendNodes) {
      notify.didAppendNodes(element);
    }
  }
}
