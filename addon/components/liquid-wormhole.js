/* eslint-disable ember/require-tagless-components */
import { set } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { typeOf } from '@ember/utils';
import { guidFor } from '@ember/object/internals';
import { ensureSafeComponent } from '@embroider/util';

export default class LiquidWormhole extends Component {
  @service('liquid-wormhole') liquidWormholeService;

  @tracked hasSend = false;
  // Truthy value by default
  value = true;

  get sendComponent() {
    if (this.send) {
      return ensureSafeComponent(this.send, this);
    }

    return null;
  }

  get to() {
    return this.destination;
  }

  // eslint-disable-next-line ember/classic-decorator-hooks
  init() {
    const wormholeClass = this.class;
    const wormholeId = this.stack || this.id || guidFor(this);

    set(this, 'wormholeClass', wormholeClass);
    set(this, 'wormholeId', wormholeId);

    if (typeOf(this.send) !== 'function') {
      set(this, 'hasSend', true);
    }

    super.init(...arguments);
  }

  didUpdateAttrs() {
    super.didUpdateAttrs(...arguments);
    this.liquidWormholeService.removeWormhole(this, this.to);
    this.liquidWormholeService.appendWormhole(this, this.to);
  }

  didInsertElement() {
    const nodes = Array.from(this.element.children);
    set(this, 'nodes', nodes);

    this.element.className = 'liquid-wormhole-container';
    this.element.id = '';

    this.liquidWormholeService.appendWormhole(this, this.to);

    super.didInsertElement(...arguments);
  }

  willDestroyElement() {
    this.liquidWormholeService.removeWormhole(this, this.to);

    super.willDestroyElement(...arguments);
  }
}
