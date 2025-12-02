import Service from '@ember/service';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import LiquidDestination from '../components/liquid-destination';

export default class LiquidWormholeService extends Service {
  constructor() {
    super(...arguments);

    this.destination = new Map();
    getOwner(this).register('component:-liquid-destination', LiquidDestination);
  }

  willDestroy() {
    this.removeDefaultDestination();
  }

  @action
  appendWormhole(wormhole, destinationName = 'default') {
    let destination = this.destination.get(destinationName);

    if (destination === undefined) {
      if (destinationName === 'default') {
        destination = this.addDefaultDestination();
      } else {
        throw new Error('Liquid Wormhole destination does not exist');
      }
    }

    destination.appendWormhole(wormhole);
  }

  @action
  removeWormhole(wormhole, destinationName = 'default') {
    const destination = this.destination.get(destinationName);

    if (destination === undefined) {
      throw new Error('Liquid Wormhole destination does not exist');
    }

    destination.removeWormhole(wormhole);
  }

  @action
  registerDestination(destinationName, destination) {
    if (this.destination.get(destinationName)) {
      throw new Error(
        `Liquid Wormhole destination '${destinationName}' already created`
      );
    }
    this.destination.set(destinationName, destination);
  }

  @action
  unregisterDestination(destinationName) {
    this.destination.delete(destinationName);
  }

  @action
  addDefaultDestination() {
    const instance = getOwner(this);
    const destination = instance.lookup('component:-liquid-destination');
    destination.set('extraClassesString', 'default-liquid-destination');

    if (instance.rootElement) {
      destination.appendTo(instance.rootElement);
    } else {
      destination.appendTo(document);
    }

    this.defaultDestination = destination;

    return destination;
  }

  @action
  removeDefaultDestination() {
    if (this.defaultDestination) {
      this.defaultDestination.destroy();
    }
  }
}
