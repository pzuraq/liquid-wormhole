If you don't want to use Liquid Wormhole for modals, or need to have more fine
grained control of your wormholes, you can create a custom `LiquidDestination`. By
default all `LiquidWormhole`s are rendered to the `default` destination. You can
replace this destination, or create a new one and send wormholes to it using the `to`
property:

```
<!-- Replaces the default LiquidDestination -->
<LiquidDestination/>

<!-- Adds a new LiquidDestination named "my-destination" -->
<LiquidDestination @name="my-destination"/>

...

<!-- Appends to the default destination above -->
<LiquidWormhole/>

<!-- Appends to the named destination above -->
<LiquidWormhole @to="my-destination"/>
```
