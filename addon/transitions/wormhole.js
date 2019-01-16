export default function wormhole(context) {
  let { use } = context;

  let oldWormholeElement, newWormholeElement;

  if (this.oldElement) {
    //this.oldElement is the liquid-container, get the wormhole element inside.
    oldWormholeElement = this.oldElement.find(
      ".liquid-wormhole-element:last-child"
    );

    this.oldElement = null;

    if (oldWormholeElement.length > 0) {
      const offset = oldWormholeElement.offset();

      oldWormholeElement.css({
        position: "absolute",
        top: offset.top,
        left: offset.left,
        bottom: "",
        right: "",
        margin: "0px",
        transform: ""
      });

      this.oldElement = oldWormholeElement;
    }
  }

  if (this.newElement) {
    //this.newElement is the liquid-container, get the wormhole element inside.
    newWormholeElement = this.newElement.find(
      ".liquid-wormhole-element:last-child"
    );

    this.newElement = null;

    if (newWormholeElement.length > 0) {
      const offset = newWormholeElement.offset();

      newWormholeElement.css({
        position: "absolute",
        top: offset.top,
        left: offset.left,
        bottom: "",
        right: "",
        margin: "0px",
        transform: ""
      });

      this.newElement = newWormholeElement;
    }
  }

  var animation;
  if (typeof use.handler === "function") {
    animation = use.handler;
  } else {
    animation = context.lookup(use.name);
  }

  return animation.apply(this, use.args);
}
