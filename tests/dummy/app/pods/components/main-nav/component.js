import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames, tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('nav')
@classNames('main-nav')
export default class MainNav extends Component {
  click(event) {
    const target = event?.target;

    if (target !== this.element) {
      if (target.closest(this.element.querySelector('a.nav-item')).length) {
        this.set('navOpen', false);
      }
    }
  }

  @action
  toggleNav() {
    this.toggleProperty('navOpen');
  }
}
