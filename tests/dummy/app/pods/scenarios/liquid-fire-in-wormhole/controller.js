import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class LiquidFireInWormholeController extends Controller {
  showingOther = true;

  @action
  toggleContent() {
    this.toggleProperty('showingOther');
  }
}
