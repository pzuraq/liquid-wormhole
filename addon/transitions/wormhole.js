export default function wormhole(context) {
  let { use } = context;

  let oldWormholeElement, newWormholeElement;

  if (this.oldElement) {
    //get the old wormhole element from inside of the liquid-container
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
    //get the new wormhole element from inside of the liquid-container
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

  return animation.apply(this, use.args).finally(() => {
    if (this.oldElement && oldWormholeElement) {
      oldWormholeElement.css({ visibility: "visible" });
      oldWormholeElement.find(".liquid-child").css({ visibility: "visible" });
    }
    if (this.newElement && newWormholeElement) {
      newWormholeElement.css({ visibility: "visible" });
      newWormholeElement.find(".liquid-child").css({ visibility: "visible" });
    }
  });
}
