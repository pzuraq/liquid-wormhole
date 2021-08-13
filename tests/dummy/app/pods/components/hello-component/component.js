import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from './template';

@classic
@templateLayout(layout)
export default class HelloComponent extends Component {}
