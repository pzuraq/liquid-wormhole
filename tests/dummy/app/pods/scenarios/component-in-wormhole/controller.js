import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ComponentInWormholeController extends Controller {
  @tracked hideWormhole = false;

  @action
  toggleWormhole() {
    this.hideWormhole = !this.hideWormhole;
  }
}
