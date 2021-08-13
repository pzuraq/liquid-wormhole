import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import { typeOf } from '@ember/utils';
import { guidFor } from '@ember/object/internals';
import layout from '../templates/components/liquid-wormhole';
import $ from 'jquery';

@classic
@templateLayout(layout)
export default class LiquidWormhole extends Component {
  @reads('destination')
  to;

  @service('liquid-wormhole')
  liquidWormholeService;

  @computed
  get stack() {
    return guidFor(this);
  }

  // Truthy value by default
  value = true;

  init() {
    const wormholeClass = this.class;
    const wormholeId = this.stack || this.id;

    this.set('wormholeClass', wormholeClass);
    this.set('wormholeId', wormholeId);

    if (typeOf(this.send) !== 'function') {
      this.set('hasSend', true);
    }

    super.init(...arguments);
  }

  didUpdateAttrs() {
    super.didUpdateAttrs(...arguments);
    this.liquidWormholeService.removeWormhole(this, this.to);
    this.liquidWormholeService.appendWormhole(this, this.to);
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    const nodes = $(this.element).children();
    this.set('nodes', nodes);

    this.element.className = 'liquid-wormhole-container';
    this.element.id = '';

    this.liquidWormholeService.appendWormhole(this, this.to);

    super.didInsertElement.apply(this, arguments);
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    this.liquidWormholeService.removeWormhole(this, this.to);

    super.willDestroyElement.apply(this, arguments);
  }
}
