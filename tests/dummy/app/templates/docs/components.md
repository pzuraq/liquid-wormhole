If you'd rather send a component than use a block template, you can set the
`send` property to either a component name or helper:

<div class="example-button-container">
  <button {{on "click" this.toggleHello}} class="btn btn-primary btn-embossed">
    Press Me
  </button>
  {{#if this.showHello}}
    <LiquidWormhole @send={{component "hello-component"}} @class="hello-world notification top-right"/>
  {{/if}}
</div>

```
<button {{on "click" this.toggleHello}}>
  Press Me
</button>

{{#if this.showHello}}
  <LiquidWormhole @send={{component "hello-component"}} @class="hello-world"/>
{{/if}}
```
