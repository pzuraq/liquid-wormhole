import Action from 'liquid-fire/action';
import RunningTransition from 'liquid-fire/running-transition';
import TransitionMap from 'liquid-fire/transition-map';

const wormholeActionMap = new WeakMap();

export default class LiquidFireTransitionsService extends TransitionMap {
  transitionFor(conditions) {
    if (
      (conditions.matchContext &&
        conditions.matchContext.helperName === 'liquid-wormhole') ||
      conditions.helperName === 'liquid-wormhole'
    ) {
      const versions = conditions.versions;

      conditions.versions = versions.map((version) => version.value || version);
      conditions.parentElement = conditions.parentElement.find(
        '.liquid-wormhole-element',
      );
      conditions.firstTime = 'no';

      const rule = this.constraintsFor(conditions).bestMatch(conditions);
      let action;

      if (rule) {
        if (wormholeActionMap.has(rule)) {
          action = wormholeActionMap.get(rule);
        } else {
          action = new Action('wormhole', [{ use: rule.use }]);
          action.validateHandler(this);

          wormholeActionMap.set(rule, action);
        }
      } else {
        action = this.defaultAction();
      }

      return new RunningTransition(this, versions, action);
    } else {
      return super.transitionFor(conditions);
    }
  }
}
