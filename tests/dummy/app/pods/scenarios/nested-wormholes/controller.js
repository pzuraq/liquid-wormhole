import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class NestedWormholesController extends Controller {
  @action
  showInner() {
    this.toggleProperty('showingInner');
  }
}
