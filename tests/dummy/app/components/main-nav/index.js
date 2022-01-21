import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MainNav extends Component {
  @tracked navOpen = false;

  click(event) {
    const target = event?.target;

    if (target !== this.element) {
      if (target.closest('a.nav-item')) {
        this.navOpen = false;
      }
    }
  }

  @action
  toggleNav() {
    this.navOpen = !this.navOpen;
  }
}
