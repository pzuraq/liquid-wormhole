Below is a listing of all of the parameters that the liquid-wormhole components
will accept as attributes.

## `liquid-wormhole` Parameters

<table class="table">
  <thead>
    <tr>
      <th>key</th>
      <th>type</th>
      <th>value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`stack`</td>
      <td>String</td>
      <td>
        The name of the stack that the wormhole will be a part of. Defaults to a
        unique ID.
      </td>
    </tr>
    <tr>
      <td>`value`</td>
      <td>Any</td>
      <td>
        The value that will be passed on to the Liquid Fire transition matchers. Defaults to `true`.
      </td>
    </tr>
    <tr>
      <td>`send`</td>
      <td>Component Name or Helper</td>
      <td>
        A component that will be rendered and wormholed.
      </td>
    </tr>
    <tr>
      <td>`click`</td>
      <td>Action Name or Helper</td>
      <td>
        An action that will trigger when the wormhole is clicked.
      </td>
    </tr>
    <tr>
      <td>`to`</td>
      <td>String</td>
      <td>
        The name of the `liquid-destination` that the component will be appended to.
        Defaults to 'default'.
      </td>
    </tr>
  </tbody>
</table>

## `liquid-destination` Parameters
<table class="table">
  <thead>
    <tr>
      <th>key</th>
      <th>type</th>
      <th>value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`name`</td>
      <td>String</td>
      <td>
        The name of the destination. Defaults to 'default'.
      </td>
    </tr>
  </tbody>
</table>
