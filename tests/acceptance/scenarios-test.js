import { click, findAll, settled, visit } from '@ember/test-helpers';
import { destroyApp } from '../helpers/app-lifecycle';

import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

function visibility(element) {
  return window.getComputedStyle(element).visibility;
}

module('Acceptance: Scenarios', function (hooks) {
  setupApplicationTest(hooks);

  hooks.afterEach(function () {
    destroyApp();
  });

  test('components are not destroyed until animation has finished', async function (assert) {
    await visit('/scenarios/component-in-wormhole');

    click('[data-test-toggle-wormhole]');
    assert.dom('.liquid-wormhole-element').hasText('testing123');
  });

  test('components are visible during the transition', async function (assert) {
    assert.expect(4);

    visit('/scenarios/component-in-wormhole');
    setTimeout(() => {
      let liquidWormholeElements = findAll('.liquid-wormhole-element');
      assert.dom(liquidWormholeElements[0]).hasStyle({ visibility: 'hidden' });
      assert
        .dom(liquidWormholeElements[liquidWormholeElements.length - 1])
        .hasStyle({ visibility: 'visible' });
    }, 100);

    await settled();
    click('[data-test-toggle-wormhole]');
    setTimeout(() => {
      let liquidWormholeElements = findAll('.liquid-wormhole-element');
      assert.equal(visibility(liquidWormholeElements[0]), 'hidden');
      assert.equal(
        visibility(liquidWormholeElements[liquidWormholeElements.length - 1]),
        'visible'
      );
    }, 100);

    await settled();
  });

  test('templates still have action context once rendered', async function (assert) {
    await visit('/scenarios/actions-in-wormhole');

    assert
      .dom('.default-liquid-destination .liquid-wormhole-element')
      .exists({ count: 1 }, 'it has a wormhole');

    await click('[data-test-toggle-wormhole]');

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
      'First wormhole renders in correct order'
    );
    assert.ok(
      secondWormhole.classList.contains('blue-box'),
      'Second wormhole renders in correct order'
    );
    assert.ok(
      thirdWormhole.classList.contains('red-box'),
      'Third wormhole renders in correct order'
    );
  });

  test('destination container has correct class if wormholes are present', async function (assert) {
    assert.dom('.default-liquid-destination.has-wormholes').doesNotExist();

    await visit('/scenarios/nested-wormholes');

    assert.dom('.default-liquid-destination.has-wormholes').exists();
  });

  test('other liquid fire functionality can exist in a wormhole in the default destination', async function (assert) {
    await visit('/scenarios/liquid-fire-in-wormhole');

    assert.dom('#content-box').exists();
    assert.dom('#showing-other').hasStyle({ visibility: 'visible' });
    assert.dom('#not-showing-other').doesNotExist();

    await click('[data-test-toggle-inner]');

    assert.dom('#not-showing-other').hasStyle({ visibility: 'visible' });
    assert.dom('#showing-other').doesNotExist();
  });

  // https://github.com/pzuraq/liquid-wormhole/issues/60
  test("wormhole does not contain duplicate child id's", async function (assert) {
    visit('/scenarios/password-input-child');

    setTimeout(() => {
      let liquidWormholeElements = findAll('.liquid-wormhole-element');
      let firstElement = liquidWormholeElements[0];
      let lastElement =
        liquidWormholeElements[liquidWormholeElements.length - 1];

      assert
        .dom('#my-password-input', firstElement)
        .hasAttribute(
          'id',
          'my-password-input',
          'password input contains original id'
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
    }, 100);

    await settled();
    click('[data-test-toggle-wormhole]');

    setTimeout(() => {
      let liquidWormholeElements = findAll('.liquid-wormhole-element');
      let firstElement = liquidWormholeElements[0];
      let lastElement =
        liquidWormholeElements[liquidWormholeElements.length - 1];

      assert
        .dom('#my-password-input', firstElement)
        .hasAttribute(
          'id',
          'my-password-input',
          'password input contains original id'
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
    }, 100);

    await settled();
  });
});
