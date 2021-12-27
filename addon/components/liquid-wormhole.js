/* eslint-disable ember/require-tagless-components */
import { layout as templateLayout } from '@ember-decorators/component';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import { ensureSafeComponent } from '@embroider/util';
import layout from '../templates/components/liquid-wormhole';
import $ from 'jquery';

@templateLayout(layout)
export default class LiquidWormhole extends Component {
  @service('liquid-wormhole') liquidWormholeService;

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
    const wormholeId = this.stack || this.id;

    set(this, 'stack', guidFor(this));
    set(this, 'wormholeClass', wormholeClass);
    set(this, 'wormholeId', wormholeId);

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
    set(this, 'nodes', nodes);

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
