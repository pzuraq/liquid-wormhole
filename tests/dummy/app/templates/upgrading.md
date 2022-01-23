# Upgrading from Liquid Wormhole v1

One of the overall goals of Liquid Wormhole v2 was to simplify the API and bring
it more inline with vanilla Liquid Fire. Several breaking changes have been
made, and this article is meant as a guide to summarize them and describe an
upgrade path.

## Removing the `to` attribute and `target` helper

In v2, the `to` attribute is no longer needed by default, and `target` is not
used to match transitions. You can either change `to` to `stack`, or add it to
your wormhole's classes. You'll then be able to match it in your transitions
file using `this.matchSelector` or `this.hasClass` respectively.

### Old:
```hbs
{{liquid-wormhole to="popup"}}
```
```js
this.transition(
  target('popup')
);
```

### New:
```hbs
{{liquid-wormhole class="popup"}}

<!-- or -->

{{liquid-wormhole stack="popup"}}
```
```js
this.transition(
  this.hasClass('popup')
);

// or

this.transition(
  this.matchSelector('#popup')
);
```

## Replacing the `onOpenWormhole` and `onCloseWormhole` helpers

The `onOpenWormhole` and `onCloseWormhole` helpers are deprecated in favor of
using the standard `toValue`, `fromValue`, and `betweenValues` matcher
functions. Whenever a wormhole is opening for the first time, the `fromValue`
will be `null`, and whenever a wormhole is closing, the so will the `toValue`.

### Old:
```js
this.transition(
  onOpenWormhole()
);

this.transition(
  onCloseWormhole()
);
```

### New:
```js
this.transition(
  this.toValue(true)
);

this.transition(
  this.toValue(false)
);
```

## Replacing `toValue` and `fromValue` matchers

Wormholes are no longer directly passed in to their transition matchers.
Instead, the `value` property for a wormhole is passed in. You can move any of
the properties that you had into a `hash` helper and everything should work.
Remember, you may need to perform null checking.

### Old:
```hbs
{{liquid-wormhole index=1}}
```

```js
this.transition(
  this.toValue((toValue, fromValue) => toValue.index > oldValue.index)
);
```

### New:
```hbs
{{liquid-wormhole value=(hash index=1)}}
```

```js
this.transition(
  this.toValue((toValue, fromValue) => {
    return toValue && fromValue && toValue.index > oldValue.index;
  })
);
```
