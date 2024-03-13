import {getData} from './modules/get-data.js';
import spinnerConfig from './modules/spinner-config.js';
import {ucfirst} from './modules/tools.js';

import {lapBanner} from './modules/lap-banner.js';

/*

TODO:

* add syllables to all data
* create "options"
  * force 3 syllables
	* select categories

*/

const projectNamerData = {
	assets: {
		prefixes: [],
		animals: [],
	},
};

const writeThing = (arrayName, elementClass) => {
	const array = projectNamerData.assets[arrayName];
	const randomThing = array[Math.floor(Math.random() * array.length)];
	document.querySelector(`.${elementClass}`).textContent = ucfirst(randomThing.title);
};

const generate = () => {
	writeThing('prefixes', 'prefix');
	writeThing('animals', 'animal');
};

const start = () => {
	var spinster = document.querySelector('.spinner');
	spinster.remove();

	document.querySelector('.welcome').classList.remove('hide');
	document.querySelector('.another').classList.remove('hide');
	document.querySelector('h1').classList.remove('hide');

	generate();
};

const checkLoadedStates = (objectName, response) => {
	projectNamerData.assets[objectName] = JSON.parse(response);
	if (projectNamerData.assets.prefixes.length > 0 && projectNamerData.assets.animals.length > 0) {
		start();
	}
};

const initProjectNamer = () => {
	const spinster = document.createElement('div');
	const headline = document.querySelector('h1');
	spinster.classList.add('spinner');
	headline.after(spinster);
	new Spinner(spinnerConfig).spin(spinster); // eslint-disable-line no-undef

	document.querySelector('.another').addEventListener('click', function (e) {
		e.preventDefault();
		generate();
	});
	document.querySelector('.prefix').addEventListener('click', function () {
		writeThing('prefixes', 'prefix');
	});
	document.querySelector('.animal').addEventListener('click', function () {
		writeThing('animals', 'animal');
	});

	getData('prefixes', checkLoadedStates);
	getData('animals', checkLoadedStates);

	lapBanner.init();
};

window.addEventListener('load', initProjectNamer);
