import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('docs', function() {
    this.route('parameters');
    this.route('stacks');
    this.route('destinations');
    this.route('components');
  });
  this.route('upgrading');
  this.route('scenarios', function() {
    this.route('manual-destinations');
    this.route('nested-wormholes');
    this.route('component-in-wormhole');
    this.route('actions-in-wormhole');
    this.route('liquid-fire-in-wormhole');
    this.route('password-input-child');
  });
});
