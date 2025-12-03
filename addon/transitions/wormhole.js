import { guidFor } from '@ember/object/internals';

function deduplicateChildElementIds(parentElem) {
  if (!parentElem) {
    return;
  }

  const childrenWithUniqueIds = parentElem.querySelectorAll('[id]');

  if (childrenWithUniqueIds.length) {
    for (let el of childrenWithUniqueIds) {
      el.setAttribute('id', `${guidFor(el)}-${el.id}`);
    }
  }
}

function getOffset(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
  };
}

export default async function wormhole(context) {
  const { use } = context;

  let oldWormholeElement, newWormholeElement;

  // Handle old element
  if (this.oldElement) {
    // this.oldElement is the container, find .liquid-wormhole-element inside it
    oldWormholeElement = this.oldElement.querySelector(
      '.liquid-wormhole-element:last-child',
    );

    this.oldElement = null;

    if (oldWormholeElement) {
      // Clone the wormhole element for animation
      const newChild = oldWormholeElement.cloneNode(true);
      newChild.classList.add('liquid-wormhole-temp-element');

      deduplicateChildElementIds(newChild);

      // Hide the original in place
      oldWormholeElement.style.visibility = 'hidden';
      const liquidChild = oldWormholeElement.querySelector('.liquid-child');
      if (liquidChild) {
        liquidChild.style.visibility = 'hidden';
      }

      // Position the clone absolutely at the same location
      const offset = getOffset(oldWormholeElement);
      newChild.style.position = 'absolute';
      newChild.style.top = `${offset.top}px`;
      newChild.style.left = `${offset.left}px`;
      newChild.style.bottom = '';
      newChild.style.right = '';
      newChild.style.margin = '0px';
      newChild.style.transform = '';

      // Append to parent and set as element to animate
      oldWormholeElement.parentElement.appendChild(newChild);
      this.oldElement = newChild;
    }
  }

  // Handle new element
  if (this.newElement) {
    // this.newElement is the container, find .liquid-wormhole-element inside it
    newWormholeElement = this.newElement.querySelector(
      '.liquid-wormhole-element:last-child',
    );

    this.newElement = null;

    if (newWormholeElement) {
      // Clone the wormhole element for animation
      const newChild = newWormholeElement.cloneNode(true);

      deduplicateChildElementIds(newChild);

      // Hide the original in place
      newWormholeElement.style.visibility = 'hidden';
      const liquidChild = newWormholeElement.querySelector('.liquid-child');
      if (liquidChild) {
        liquidChild.style.visibility = 'hidden';
      }

      // Position the clone absolutely at the same location
      const offset = getOffset(newWormholeElement);
      newChild.style.position = 'absolute';
      newChild.style.top = `${offset.top}px`;
      newChild.style.left = `${offset.left}px`;
      newChild.style.bottom = '';
      newChild.style.right = '';
      newChild.style.margin = '0px';
      newChild.style.transform = '';

      // Append to parent and set as element to animate
      newWormholeElement.parentElement.appendChild(newChild);
      this.newElement = newChild;
    }
  }

  // Look up the animation to use
  let animation;

  if (typeof use.handler === 'function') {
    animation = use.handler;
  } else {
    animation = context.lookup(use.name);
  }

  await animation.apply(this, use.args);

  // Clean up old element
  if (this.oldElement && oldWormholeElement) {
    this.oldElement.remove();
    oldWormholeElement.style.visibility = 'visible';
    const oldLiquidChild = oldWormholeElement.querySelector('.liquid-child');
    if (oldLiquidChild) {
      oldLiquidChild.style.visibility = 'visible';
    }
  }

  // Clean up new element
  if (this.newElement && newWormholeElement) {
    this.newElement.remove();
    newWormholeElement.style.visibility = 'visible';
    const newLiquidChild = newWormholeElement.querySelector('.liquid-child');
    if (newLiquidChild) {
      newLiquidChild.style.visibility = 'visible';
    }
  }
}
