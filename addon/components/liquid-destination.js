import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';
import { gt } from '@ember/object/computed';
import { scheduleOnce, next } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import HashMap from 'perf-primitives/hash-map';
import layout from '../templates/components/liquid-destination';

export default Component.extend({
  layout,
  classNames: ['liquid-destination'],
  classNameBindings: ['hasWormholes'],

  name: 'default',
  liquidWormholeService: service('liquidWormhole'),
  matchContext: computed(function () {
    return { helperName: 'liquid-wormhole' };
  }),

  hasWormholes: gt('stacks.length', 0),

  init() {
    this._super(...arguments);

    this.stackMap = new HashMap();
    this.set('stacks', A());

    this.wormholeQueue = A();

    const name = this.name;

    this.liquidWormholeService.registerDestination(name, this);
  },

  willDestroyElement() {
    this._super(...arguments);

    const name = this.name;
    this.liquidWormholeService.unregisterDestination(name);
  },

  appendWormhole(wormhole) {
    // The order that wormholes are rendered in may be different from the order
    // that they appear in templates, because child components get rendered before
    // their parents. This logic inserts parent components *before* their children
    // so the ordering is correct.
    var appendIndex = this.wormholeQueue.get('length') - 1;

    for (; appendIndex >= 0; appendIndex--) {
      const lastWormholeElement =
        this.wormholeQueue.objectAt(appendIndex).element;

      if (!wormhole.element.contains(lastWormholeElement)) {
        break; // break when we find the first wormhole that isn't a parent
      }
    }

    this.wormholeQueue.insertAt(appendIndex + 1, wormhole);

    scheduleOnce('afterRender', this, this.flushWormholeQueue);
  },

  removeWormhole(wormhole) {
    const stackName = wormhole.get('stack');
    const stack = this.stackMap.get(stackName);
    const item = stack.find((item) => item && item.wormhole === wormhole);

    const newNodes = item.get('nodes').clone();
    item.set('nodes', newNodes);
    item.set('_replaceNodes', true);

    next(() => stack.removeObject(item));
  },

  flushWormholeQueue() {
    this.wormholeQueue.forEach((wormhole) => {
      const stackName = wormhole.get('stack');
      const stack = this.stackMap.get(stackName) || this.createStack(wormhole);

      const nodes = wormhole.get('nodes');
      const value = wormhole.get('value');

      const item = EmberObject.create({ nodes, wormhole, value });

      // Reset visibility in case we made them visible, see below
      for (const node of nodes) {
        node.style.visibility = 'hidden';
      }

      stack.pushObject(item);
    });

    this.wormholeQueue.clear();
  },

  createStack(wormhole) {
    const stackName = wormhole.get('stack');

    const stack = A([null]);
    stack.set('name', stackName);

    this.stackMap.set(stackName, stack);
    this.stacks.pushObject(stack);

    return stack;
  },

  actions: {
    willTransition() {
      // Do nothing
    },

    afterChildInsertion() {
      // Do nothing
    },

    afterTransition([{ value, view }]) {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      // If wormholes were made w/o animations, they need to be made visible manually.
      this.$(view.element)
        .find('.liquid-wormhole-element')
        .css({ visibility: 'visible' });

      // Clean empty stacks
      if (value === null) {
        const stacks = this.stacks;
        const stackName = view.get('parentView.stackName');
        const stack = this.stackMap.get(stackName);

        stacks.removeObject(stack);
        this.stackMap.delete(stackName);
      }
    },
  },
});
