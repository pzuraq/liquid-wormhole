/* eslint-disable ember/no-computed-properties-in-native-classes */
import { inject as service } from '@ember/service';
import { gt } from '@ember/object/computed';
import Component from '@ember/component';
import EmberObject, { action, set } from '@ember/object';
import { scheduleOnce, next } from '@ember/runloop';
import { A } from '@ember/array';
import HashMap from 'perf-primitives/hash-map';

export default class LiquidDestination extends Component {
  tagName = '';

  @service('liquidWormhole') liquidWormholeService;

  extraClassesString = '';
  name = 'default';

  @gt('stacks.length', 0) hasWormholes;

  constructor() {
    super(...arguments);

    this.stackMap = new HashMap();
    set(this, 'matchContext', { helperName: 'liquid-wormhole' });
    set(this, 'stacks', A());

    this.wormholeQueue = A();

    const name = this.name;

    this.liquidWormholeService.registerDestination(name, this);
  }

  willDestroy() {
    super.willDestroy(...arguments);

    const name = this.name;
    this.liquidWormholeService.unregisterDestination(name);
  }

  appendWormhole(wormhole) {
    // The order that wormholes are rendered in may be different from the order
    // that they appear in templates, because child components get rendered before
    // their parents. This logic inserts parent components *before* their children
    // so the ordering is correct.
    var appendIndex = this.wormholeQueue.get('length') - 1;

    for (; appendIndex >= 0; appendIndex--) {
      const lastWormholeElement = this.wormholeQueue[appendIndex].element;

      if (!wormhole.element.contains(lastWormholeElement)) {
        break; // break when we find the first wormhole that isn't a parent
      }
    }

    this.wormholeQueue.insertAt(appendIndex + 1, wormhole);

    scheduleOnce('afterRender', this, this.flushWormholeQueue);
  }

  removeWormhole(wormhole) {
    const stackName = wormhole.get('stack');
    const stack = this.stackMap.get(stackName);
    const item = stack.find((item) => item && item.wormhole === wormhole);

    const newNodes = item.get('nodes').clone();
    item.set('nodes', newNodes);
    item.set('_replaceNodes', true);

    next(() => stack.removeObject(item));
  }

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
  }

  createStack(wormhole) {
    const stackName = wormhole.get('stack');

    const stack = A([null]);
    stack.set('name', stackName);

    this.stackMap.set(stackName, stack);
    this.stacks.pushObject(stack);

    return stack;
  }

  @action
  willTransition() {
    // Do nothing
  }

  @action
  afterChildInsertion() {
    // Do nothing
  }

  @action
  afterTransition([{ value, view }]) {
    if (this.isDestroying || this.isDestroyed) {
      return;
    }

    // If wormholes were made w/o animations, they need to be made visible manually.
    const liquidWormholeElement = view.element.querySelector(
      '.liquid-wormhole-element',
    );
    if (liquidWormholeElement) {
      liquidWormholeElement.style.visibility = 'visible';
    }

    // Clean empty stacks
    if (value === null) {
      const stacks = this.stacks;
      const stackName = view.get('parentView.stackName');
      const stack = this.stackMap.get(stackName);

      stacks.removeObject(stack);
      this.stackMap.delete(stackName);
    }
  }
}
