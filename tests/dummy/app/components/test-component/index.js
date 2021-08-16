import Component from '@ember/component';
import { action } from '@ember/object';

export default class TestComponent extends Component {
  @action
  sendAction() {
    const action = this.action;
    if (action) {
      return action(...arguments);
    }
  }
}
