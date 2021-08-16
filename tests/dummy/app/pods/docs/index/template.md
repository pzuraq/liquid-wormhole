Liquid Wormhole v2 allows you to animate your components using the standard
Liquid Fire DSL. Just add a `liquid-wormhole` component to your app, give it a
class, and add animations in your `transitions.js` file.

By default, `liquid-wormhole` components will render near the root of the
document, in a container that is positioned absolutely and that has the width
and height of the window. This container is meant to be used for UI components
such as popups, modals, tooltips - things that do not work in the normal
document flow. When choosing and building your animations, it's helpful to
think as though you are animating the entire window frame at once.

If you want to warp elements somewhere else, consider
{{#link-to "docs.destinations"}}creating a custom liquid-destination{{/link-to}}

<div class="example-button-container">
  <button {{on "click" this.toggleHello}} id="hello-world-button" class="btn btn-primary btn-embossed">
    Give it a shot!
  </button>
  {{#if this.showHello}}
    <LiquidWormhole @class="hello-world notification top-right">
      Hello, World!
    </LiquidWormhole>
  {{/if}}
</div>

```hbs
<button {{on "click" this.toggleHello}}>
  Give it a shot!
</button>

{{#if this.showHello}}
  <LiquidWormhole @class="hello-world top-right">
    Hello, World!
  </LiquidWormhole>
{{/if}}
```

```scss
.top-right {
  position: fixed;
  top: 10px;
  right: 10px;
}
```

```js
this.transition(
  this.hasClass('hello-world'),
  this.toValue(true),
  this.use('to-down'),
  this.reverse('to-up')
);
```
