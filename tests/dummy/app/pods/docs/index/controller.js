import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class IndexController extends Controller {
  @action
  toggleHello() {
    this.toggleProperty('showHello');
  }
}
