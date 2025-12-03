import { click, findAll, visit, waitUntil } from '@ember/test-helpers';
import {
  injectTransitionSpies,
  ranTransition,
  noTransitionsYet,
} from '../helpers/integration';

import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

let app;

module('Acceptance: Demos', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    app = this.owner;
    // Conceptually, integration tests shouldn't be digging around in
    // the container. But animations are slippery, and it's easier to
    // just spy on them to make sure they're being run than to try to
    // observe their behavior more directly.
    injectTransitionSpies(this.owner);
  });

  test('destination container is cleaned when empty', async function (assert) {
    await visit('/demo');
    await click('#hello-world-button');

    await waitUntil(
      () =>
        findAll('.default-liquid-destination .liquid-destination-stack')
          .length === 1,
    );

    assert.equal(
      findAll('.default-liquid-destination .liquid-destination-stack').length,
      1,
      "it's not empty",
    );

    await click('#hello-world-button');

    await waitUntil(
      () =>
        findAll('.default-liquid-destination .liquid-destination-stack')
          .length === 0,
    );

    assert.equal(
      findAll('.default-liquid-destination .liquid-destination-stack').length,
      0,
      "it's empty",
    );
  });

  test('basic liquid-wormhole works correctly and can determine context', async function (assert) {
    assert.expect(5);

    await visit('/demo');
    noTransitionsYet(app, assert);

    await click('#hello-world-button');

    await waitUntil(
      () =>
        findAll('.default-liquid-destination .liquid-wormhole-element')
          .length === 1,
    );

    assert.equal(
      findAll('.default-liquid-destination .liquid-wormhole-element').length,
      1,
      'it exists',
    );
    ranTransition(app, assert, 'wormhole');

    await click('#hello-world-button');
    await waitUntil(
      () =>
        findAll('.default-liquid-destination .liquid-wormhole-element')
          .length === 0,
    );

    assert.equal(
      findAll('.default-liquid-destination .liquid-wormhole-element').length,
      0,
      'it closed',
    );
    ranTransition(app, assert, 'wormhole');
  });
});
