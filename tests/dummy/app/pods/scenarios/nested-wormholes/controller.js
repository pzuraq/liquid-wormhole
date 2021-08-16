import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NestedWormholesController extends Controller {
  @tracked showingInner = false;

  @action
  showInner() {
    this.showingInner = !this.showingInner;
  }
}
