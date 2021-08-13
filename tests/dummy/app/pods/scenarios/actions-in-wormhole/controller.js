import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class ActionsInWormholeController extends Controller {
  @action
  toggleWormhole() {
    this.toggleProperty('hideWormhole');
  }
}
