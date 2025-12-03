import {
  click,
  find,
  findAll,
  settled,
  visit,
  waitUntil,
} from '@ember/test-helpers';

import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance: Scenarios', function (hooks) {
  setupApplicationTest(hooks);

  test('components are not destroyed until animation has finished', async function (assert) {
    await visit('/scenarios/component-in-wormhole');

    click('[data-test-toggle-wormhole]');
    assert.dom('.liquid-wormhole-element').hasText('testing123');
  });

  test('components are visible during the transition', async function (assert) {
    assert.expect(4);

    visit('/scenarios/component-in-wormhole');

    let liquidWormholeElements;

    await waitUntil(
      () => {
        liquidWormholeElements = findAll('.liquid-wormhole-element');

        return (
          getComputedStyle(liquidWormholeElements[0]).visibility === 'hidden' &&
          getComputedStyle(
            liquidWormholeElements[liquidWormholeElements.length - 1],
          ).visibility === 'visible'
        );
      },
      { timeout: 5000 },
    );

    assert.dom(liquidWormholeElements[0]).hasStyle({ visibility: 'hidden' });
    assert
      .dom(liquidWormholeElements[liquidWormholeElements.length - 1])
      .hasStyle({ visibility: 'visible' });

    await settled();
    await click('[data-test-toggle-wormhole]');
    await waitUntil(
      () => {
        liquidWormholeElements = findAll('.liquid-wormhole-element');

        return (
          getComputedStyle(liquidWormholeElements[0]).visibility === 'hidden' &&
          getComputedStyle(
            liquidWormholeElements[liquidWormholeElements.length - 1],
          ).visibility === 'visible'
        );
      },
      { timeout: 5000 },
    );

    assert.dom(liquidWormholeElements[0]).hasStyle({ visibility: 'hidden' });
    assert
      .dom(liquidWormholeElements[liquidWormholeElements.length - 1])
      .hasStyle({ visibility: 'visible' });

    await settled();
  });

  test('templates still have action context once rendered', async function (assert) {
    await visit('/scenarios/actions-in-wormhole');
    await waitUntil(
      () =>
        findAll('.default-liquid-destination .liquid-wormhole-element')
          .length === 1,
      { timeout: 5000 },
    );

    assert
      .dom('.default-liquid-destination .liquid-wormhole-element')
      .exists({ count: 1 }, 'it has a wormhole');

    await click('[data-test-toggle-wormhole]');
    await waitUntil(
      () =>
        findAll('.default-liquid-destination .liquid-wormhole-element')
          .length === 0,
      { timeout: 5000 },
    );

    assert
      .dom('.default-liquid-destination .liquid-wormhole-element')
      .doesNotExist('it closed the wormhole');
  });

  test('nested wormholes work properly', async function (assert) {
    await visit('/scenarios/nested-wormholes');

    const wormholes = findAll('.liquid-wormhole-element');

    const firstWormhole = wormholes[0];
    const secondWormhole = wormholes[1];
    const thirdWormhole = wormholes[2];

    assert.ok(
      firstWormhole.classList.contains('green-box'),
      'First wormhole renders in correct order',
    );
    assert.ok(
      secondWormhole.classList.contains('blue-box'),
      'Second wormhole renders in correct order',
    );
    assert.ok(
      thirdWormhole.classList.contains('red-box'),
      'Third wormhole renders in correct order',
    );
  });

  test('destination container has correct class if wormholes are present', async function (assert) {
    assert.dom('.default-liquid-destination.has-wormholes').doesNotExist();

    await visit('/scenarios/nested-wormholes');

    assert.dom('.default-liquid-destination.has-wormholes').exists();
  });

  test('other liquid fire functionality can exist in a wormhole in the default destination', async function (assert) {
    await visit('/scenarios/liquid-fire-in-wormhole');
    await waitUntil(
      () => {
        const showingOther = find('#showing-other');
        return getComputedStyle(showingOther).visibility === 'visible';
      },
      { timeout: 5000 },
    );

    assert.dom('#content-box').exists();
    assert.dom('#showing-other').hasStyle({ visibility: 'visible' });
    assert.dom('#not-showing-other').doesNotExist();

    await click('[data-test-toggle-inner]');
    await waitUntil(
      () => {
        const showingOther = find('#not-showing-other');
        return getComputedStyle(showingOther).visibility === 'visible';
      },
      { timeout: 5000 },
    );

    assert.dom('#not-showing-other').hasStyle({ visibility: 'visible' });
    assert.dom('#showing-other').doesNotExist();
  });

  // https://github.com/pzuraq/liquid-wormhole/issues/60
  test("wormhole does not contain duplicate child id's", async function (assert) {
    visit('/scenarios/password-input-child');

    let liquidWormholeElements;
    let firstElement;
    let lastElement;

    await waitUntil(
      () => {
        liquidWormholeElements = findAll('.liquid-wormhole-element');
        firstElement = liquidWormholeElements[0];
        lastElement = liquidWormholeElements[liquidWormholeElements.length - 1];

        return (
          firstElement.querySelector('#my-password-input') &&
          !lastElement.querySelector('#my-password-input')
        );
      },
      { timeout: 5000 },
    );

    assert
      .dom('#my-password-input', firstElement)
      .hasAttribute(
        'id',
        'my-password-input',
        'password input contains original id',
      );
    assert
      .dom('#my-text-input', firstElement)
      .hasAttribute('id', 'my-text-input', 'text input contains original id');
    assert
      .dom('#my-button', firstElement)
      .hasAttribute('id', 'my-button', 'button contains original id');

    assert
      .dom('#my-password-input', lastElement)
      .doesNotExist('cloned password input does not contain duplicate id');
    assert
      .dom('#my-text-input', lastElement)
      .doesNotExist('cloned text input does not contain duplicate id');
    assert
      .dom('#my-button', lastElement)
      .doesNotExist('cloned button does not contain duplicate id');

    await settled();
    click('[data-test-toggle-wormhole]');

    await waitUntil(
      () => {
        liquidWormholeElements = findAll('.liquid-wormhole-element');
        firstElement = liquidWormholeElements[0];
        lastElement = liquidWormholeElements[liquidWormholeElements.length - 1];

        return (
          firstElement.querySelector('#my-password-input') &&
          !lastElement.querySelector('#my-password-input')
        );
      },
      { timeout: 5000 },
    );

    assert
      .dom('#my-password-input', firstElement)
      .hasAttribute(
        'id',
        'my-password-input',
        'password input contains original id',
      );
    assert
      .dom('#my-text-input', firstElement)
      .hasAttribute('id', 'my-text-input', 'text input contains original id');
    assert
      .dom('#my-button', firstElement)
      .hasAttribute('id', 'my-button', 'button contains original id');

    assert
      .dom('#my-password-input', lastElement)
      .doesNotExist('cloned password input does not contain duplicate id');
    assert
      .dom('#my-text-input', lastElement)
      .doesNotExist('cloned text input does not contain duplicate id');
    assert
      .dom('#my-button', lastElement)
      .doesNotExist('cloned button does not contain duplicate id');
    await settled();
  });
});
