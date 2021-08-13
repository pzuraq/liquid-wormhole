import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from './template';

@classic
@templateLayout(layout)
export default class TestComponent extends Component {
  @action
  sendAction() {
    const action = this.action;
    if (action) {
      return action(...arguments);
    }
  }
}
