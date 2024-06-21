import {getData} from './modules/get-data.js';
import spinnerConfig from './modules/spinner-config.js';
import {ucfirst} from './modules/tools.js';

import {lapBanner} from './modules/lap-banner.js';

/*
// eslint-disable-next-line no-warning-comments
TODO:

* add syllables to all data
* create "options"
  * force 3 syllables
	* select categories
* "about" thing, which says you shouldn't really use this

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

	const iterations = 60;
	const currentIteration = 0;

	writeOneThing(currentIteration, iterations);
};

const writeOneThing = (currentIteration, iterations) => {
	if (Math.round(Math.random()) < 0.5) {
		writeThing('prefixes', 'prefix');
	} else {
		writeThing('animals', 'animal');
	}

	const nextIteration = currentIteration + 1;

	if (nextIteration < iterations) {
		window.setTimeout(() => {
			writeOneThing(nextIteration, iterations);
		}, nextIteration * 3);
	}
};

const start = () => {
	var spinster = document.querySelector('.spinner');
	spinster.remove();

	document.body.classList.add('js');

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

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then(_res => console.log('service worker registered'))
			.catch(error => console.log('service worker not registered', error));
	});
} else {
	console.log('serviceWorker not found in navigator');
}

window.addEventListener('load', initProjectNamer);
