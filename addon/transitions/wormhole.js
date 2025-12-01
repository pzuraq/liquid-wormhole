import { guidFor } from '@ember/object/internals';

let deduplicateChildElementIds = (parentElem) => {
  if (!parentElem) {
    return;
  }

  let childrenWithUniqueIds = parentElem[0].querySelectorAll('[id]');

  if (childrenWithUniqueIds.length) {
    for (let el of childrenWithUniqueIds) {
      el.setAttribute('id', `${guidFor(el)}-${el.id}`);
    }
  }
};

export default function wormhole(context) {
  let { use } = context;

  let oldWormholeElement, newWormholeElement;

  if (this.oldElement) {
    oldWormholeElement = this.oldElement.find(
      '.liquid-wormhole-element:last-child',
    );

    this.oldElement = null;

    if (oldWormholeElement.length > 0) {
      const newChild = oldWormholeElement.clone();
      newChild.addClass('liquid-wormhole-temp-element');

      deduplicateChildElementIds(newChild);

      oldWormholeElement.css({ visibility: 'hidden' });
      oldWormholeElement.find('.liquid-child').css({ visibility: 'hidden' });

      const offset = oldWormholeElement.offset();

      newChild.css({
        position: 'absolute',
        top: offset.top,
        left: offset.left,
        bottom: '',
        right: '',
        margin: '0px',
        transform: '',
      });

      newChild.appendTo(oldWormholeElement.parent());
      this.oldElement = newChild;
    }
  }

  if (this.newElement) {
    newWormholeElement = this.newElement.find(
      '.liquid-wormhole-element:last-child',
    );

    this.newElement = null;

    if (newWormholeElement.length > 0) {
      const newChild = newWormholeElement.clone();

      newWormholeElement.css({ visibility: 'hidden' });
      newWormholeElement.find('.liquid-child').css({ visibility: 'hidden' });

      deduplicateChildElementIds(newChild);

      const offset = newWormholeElement.offset();

      newChild.css({
        position: 'absolute',
        top: offset.top,
        left: offset.left,
        bottom: '',
        right: '',
        margin: '0px',
        transform: '',
      });

      newChild.appendTo(newWormholeElement.parent());
      this.newElement = newChild;
    }
  }

  var animation;
  if (typeof use.handler === 'function') {
    animation = use.handler;
  } else {
    animation = context.lookup(use.name);
  }

  return animation.apply(this, use.args).finally(() => {
    if (this.oldElement && oldWormholeElement) {
      this.oldElement.remove();
      oldWormholeElement.css({ visibility: 'visible' });
      oldWormholeElement.find('.liquid-child').css({ visibility: 'visible' });
    }
    if (this.newElement && newWormholeElement) {
      this.newElement.remove();
      newWormholeElement.css({ visibility: 'visible' });
      newWormholeElement.find('.liquid-child').css({ visibility: 'visible' });
    }
  });
}
