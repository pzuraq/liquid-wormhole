import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';

export default class StackContainerComponent extends Component {
  @tracked element = null;

  captureElement = modifier((element) => {
    this.element = element;
  });
}
