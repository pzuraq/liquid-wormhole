<div class="front-page-container-1">
  <span class="lead">
    Liquid-Fire meets Ember-Wormhole
  </span>
</div>
<div class="front-page-container-2">
  <button {{on "click" this.toggleHello}} id="hello-world-button" class="btn btn-primary btn-embossed">
    Give it a shot!
  </button>
  {{#if this.showHello}}
    <LiquidWormhole @class="hello-world notification">
      Hello, World!
    </LiquidWormhole>
  {{/if}}
</div>

```
<LiquidWormhole @class="hello-world">
  Hello, World!
</LiquidWormhole>
```

```
this.transition(
  this.hasClass('hello-world'),
  this.toValue(true),
  this.use('to-down'),
  this.reverse('to-right')
);
```

Liquid Wormhole combines the ideas behind
[Ember Wormhole](https://github.com/yapplabs/ember-wormhole.git) with
the power of [Liquid Fire](http://ef4.github.io/liquid-fire/) to provide an
accessible, easy-to-use toolkit for animating elements on a layer above your
templates, making positioning and rendering simple.
