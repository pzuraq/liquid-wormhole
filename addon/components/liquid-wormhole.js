import Component from '@ember/component';
import { typeOf } from '@ember/utils';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';
import layout from '../templates/components/liquid-wormhole';

export default Component.extend({
  layout,

  to: reads('destination'),
  liquidWormholeService: service('liquid-wormhole'),

  stack: computed(function() {
    return guidFor(this);
  }),

  // Truthy value by default
  value: true,

  init() {
    const wormholeClass = this.class;
    const wormholeId = this.stack || this.id;

    this.set('wormholeClass', wormholeClass);
    this.set('wormholeId', wormholeId);

    if (typeOf(this.send) !== 'function') {
      this.set('hasSend', true);
    }

    this._super(...arguments);
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.liquidWormholeService.removeWormhole(this, this.to);
    this.liquidWormholeService.appendWormhole(this, this.to);
  },

  didInsertElement() {
    const nodes = this.$().children();
    this.set('nodes', nodes);

    this.element.className = 'liquid-wormhole-container';
    this.element.id = '';

    this.liquidWormholeService.appendWormhole(this, this.to);

    this._super.apply(this, arguments);
  },

  willDestroyElement() {
    this.liquidWormholeService.removeWormhole(this, this.to);

    this._super.apply(this, arguments);
  }
});
