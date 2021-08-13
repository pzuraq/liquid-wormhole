import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class ComponentsController extends Controller {
  @action
  toggleHello() {
    this.toggleProperty('showHello');
  }
}
