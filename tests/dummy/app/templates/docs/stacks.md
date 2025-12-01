At times you may want to animate between different wormholes - for a complicated
modal flow, or an onboarding flow, or something else. You can do this by
specifying a stack name with the `stack` property. New wormholes will be pushed
onto an existing stack, and only the most recent wormhole will be showing. When
matching in `toValue`, `fromValue`, or `betweenValues`, the `value` parameter
for both the previous wormhole on the stack and the next one will be passed in.
You can pass in any value you want in the property and match based on that.

The stack name will be applied as the id of the wormhole, allow you to match them using
the `matchSelector` helper from liquid-fire.

<div class="example-button-container">
  <button {{on "click" this.showFirstStep}} class="btn btn-primary btn-embossed">
    Open Dialogue
  </button>
  {{#if this.showFirstStep}}
    {{#liquid-wormhole stack="modal-dialog" value=1 class="modal-content top-right"}}
      <div class="modal-header">
        Step One
      </div>
      <div class="modal-footer">
        <button {{on "click" this.showSecondStep}} class="btn btn-primary btn-embossed">
          Go on
        </button>
      </div>
    {{/liquid-wormhole}}
  {{/if}}
  {{#if this.showSecondStep}}
    {{#liquid-wormhole stack="modal-dialog" value=2 class="modal-content top-right"}}
      <div class="modal-header">
        Step Two
      </div>
      <div class="modal-footer">
        <button {{on "click" this.closeModal}} class="btn btn-primary btn-embossed">
          Done
        </button>
      </div>
    {{/liquid-wormhole}}
  {{/if}}
</div>

```
<button {{on "click" this.showFirstStep}}>
  Open Dialogue
</button>

{{#if showFirstStep}}
  {{#liquid-wormhole stack="modal-dialog" value=1}}
    ...
  {{/liquid-wormhole}}
{{/if}}

{{#if showSecondStep}}
  {{#liquid-wormhole stack="modal-dialog" value=2}}
    ...
  {{/liquid-wormhole}}
{{/if}}
```

```
this.transition(
  this.hasClass('modal-dialog'),
  this.toValue(true),
  this.use('to-up'),
  this.reverse('fade')
);

this.transition(
  this.hasClass('modal-dialog'),
  this.toValue((toValue, fromValue) => toValue > fromValue),
  this.use('to-right')
);
```
