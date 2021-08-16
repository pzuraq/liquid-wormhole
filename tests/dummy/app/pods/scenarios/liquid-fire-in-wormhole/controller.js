import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LiquidFireInWormholeController extends Controller {
  @tracked showingOther = true;

  @action
  toggleContent() {
    this.showingOther = !this.showingOther;
  }
}
