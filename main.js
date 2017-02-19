/**
 *
 * @description constructs and initializes all core modules
 *
 */

import $ from 'jquery';
import * as core from './source/modules/index.js';

class App_Build {
	constructor() {
		core.controller.init();
		core.modal.init();
	}
}

const App = new App_Build();

window._App = App;


