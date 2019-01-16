import wait from "ember-test-helpers/wait";
import { click, findAll, visit } from "ember-native-dom-helpers";
import { startApp, destroyApp } from "../helpers/app-lifecycle";

import { module, test } from "qunit";

function visibility(selector) {
  return window.getComputedStyle(find(selector)[0]).visibility;
}

let app;

module("Acceptance: Scenarios", function(hooks) {
  hooks.beforeEach(function() {
    app = startApp();
  });

  hooks.afterEach(function() {
    destroyApp(app);
  });

  test("components are not destroyed until animation has finished", async function(assert) {
    await visit("/scenarios/component-in-wormhole");

    click("[data-test-toggle-wormhole]");
    assert.equal(
      find(".liquid-wormhole-element")
        .text()
        .trim(),
      "testing123",
      "component markup still exists"
    );
  });

  test("components are visible during the transition", async function(assert) {
    visit("/scenarios/component-in-wormhole");
    setTimeout(() => {
      assert.equal(visibility(".liquid-wormhole-element:last"), "visible");
    }, 100);

    await wait();
    click("[data-test-toggle-wormhole]");
    setTimeout(() => {
      assert.equal(visibility(".liquid-wormhole-element:last"), "visible");
    }, 100);

    await wait();
  });

  test("templates still have action context once rendered", async function(assert) {
    await visit("/scenarios/actions-in-wormhole");

    assert.equal(
      find(".default-liquid-destination .liquid-wormhole-element").length,
      1,
      "it has a wormhole"
    );

    await click("[data-test-toggle-wormhole]");

    assert.equal(
      find(".default-liquid-destination .liquid-wormhole-element").length,
      0,
      "it closed the wormhole"
    );
  });

  test("nested wormholes work properly", async function(assert) {
    await visit("/scenarios/nested-wormholes");

    const wormholes = findAll(".liquid-wormhole-element");

    const firstWormhole = wormholes[0];
    const secondWormhole = wormholes[1];
    const thirdWormhole = wormholes[2];

    assert.ok(
      firstWormhole.classList.contains("green-box"),
      "First wormhole renders in correct order"
    );
    assert.ok(
      secondWormhole.classList.contains("blue-box"),
      "Second wormhole renders in correct order"
    );
    assert.ok(
      thirdWormhole.classList.contains("red-box"),
      "Third wormhole renders in correct order"
    );
  });

  test("destination container has correct class if wormholes are present", async function(assert) {
    assert.ok(
      find(".default-liquid-destination.has-wormholes").length === 0,
      "No wormholes class"
    );

    await visit("/scenarios/nested-wormholes");

    assert.ok(
      find(".default-liquid-destination.has-wormholes").length > 0,
      "Has wormholes class"
    );
  });

  test("other liquid fire functionality can exist in a wormhole in the default destination", async function(assert) {
    await visit("/scenarios/liquid-fire-in-wormhole");

    assert.ok(find("#content-box"), "the content box is on screen");
    assert.equal(
      find("#showing-other").css("visibility"),
      "visible",
      "the other is visible"
    );
    assert.ok(!find("#not-showing-other").length, "the not other is hidden");

    await click("[data-test-toggle-inner]");

    assert.equal(
      find("#not-showing-other").css("visibility"),
      "visible",
      "the not other is visible"
    );
    assert.ok(!find("#showing-other").length, "the other is hidden");
  });
});
