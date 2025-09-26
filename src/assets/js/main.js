import {getData} from './modules/get-data.js';
import spinnerConfig from './modules/spinner-config.js';
import {
	ucfirst,
	getParamFromURL,
} from './modules/tools.js';

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

const reduce = () => {
	const categories = ['prefixes', 'animals'];
	const params = {};
	let valid = true;

	for (const category of categories) {
		params[category] = getParamFromURL(category);
		if (!params[category] || params[category].length === 0) {
			valid = false;
		}
	}
	if (valid) {
		for (const category of categories) {
			const categoryParams = params[category].split(',');
			const outputs = [];

			for (const categoryParam of categoryParams) {
				for (const item of projectNamerData.assets[category]) {
					if (item.attributes.includes(categoryParam)) {
						if (!outputs.includes(item)) {
							outputs.push(item);
						}
					}
				}
			}

			projectNamerData.assets[category] = outputs;
		}
	}
	start();
};

const writeThing = (arrayName, elementClass) => {
	const array = projectNamerData.assets[arrayName];
	const randomThing = array[Math.floor(Math.random() * array.length)];
	document.querySelector(`.${elementClass}`).textContent = ucfirst(randomThing.title);
};

const generate = () => {
	writeThing('prefixes', 'prefix');
	writeThing('animals', 'animal');

	// const iterations = 60;
	const iterations = 30;
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

	generate();
};

const checkLoadedStates = (objectName, response, next) => {
	projectNamerData.assets[objectName] = JSON.parse(response);
	if (projectNamerData.assets.prefixes.length > 0 && projectNamerData.assets.animals.length > 0) {
		next();
	}
};

const getAttributes = category => {
	const categoryData = projectNamerData.assets[category];
	const foundAttributes = [];
	for (const item of categoryData) {
		for (const itemAttribute of item.attributes) {
			if (foundAttributes.indexOf(itemAttribute) === -1) {
				foundAttributes.push(itemAttribute);
			}
		}
	}
	foundAttributes.sort();

	console.log(`attributes found for ${category}:`);
	console.log(foundAttributes);
	return foundAttributes;
};


const countOutputs = () => {
	const categories = ['prefixes', 'animals'];
	let valid = true;

	for (const category of categories) {
		const fieldset = document.querySelector(`#${category}`);
		const fieldsetButtons = fieldset.querySelector('.buttonContainer');
		const outputs = [];
		const attributes = fieldset.querySelectorAll('input:checked');
		// console.log(attributes);
		for (const attribute of attributes) {
			for (const item of projectNamerData.assets[category]) {
				if (item.attributes.includes(attribute.value)) {
					if (!outputs.includes(item)) {
						outputs.push(item);
					}
				}
			}
		}

		if (outputs.length === 0) {
			valid = false;
		}

		while (fieldset.querySelector('.countHolder')) {
			fieldset.querySelector('.countHolder').remove();
		}

		const countHolder = document.createElement('div');
		countHolder.classList.add('countHolder');
		countHolder.textContent = `${outputs.length} ${category} matched`;
		fieldset.insertBefore(countHolder, fieldsetButtons);

		console.log(`matched: ${outputs.map(item => item.title)}`);
	}

	const goButton = document.querySelector('#go');
	goButton.disabled = !valid;
};

const setAllAttributes = (element, check) => {
	const fieldset = element.closest('fieldset');
	const checkboxes = fieldset.querySelectorAll('input');

	for (const checkbox of checkboxes) {
		checkbox.checked = check;
	}

	countOutputs();
};

const writeOptions = () => {
	const categories = [
		{
			name: 'prefixes',
		},
		{
			name: 'animals',
		},
	];

	for (const category of categories) {
		category.attributes = getAttributes(category.name);
		const categoryParams = getParamFromURL(category.name);
		const categoryParamsArray = categoryParams ? categoryParams.split(',') : undefined;

		const fieldset = document.querySelector(`fieldset#${category.name}`);

		for (const attribute of category.attributes) {
			const inputElement = document.createElement('input');
			const inputName = `cb-${category.name}-${attribute}`;
			inputElement.type = 'checkbox';
			inputElement.name = inputName;
			inputElement.id = inputName;
			inputElement.value = attribute;
			if (categoryParamsArray === undefined || categoryParamsArray.includes(attribute)) {
				inputElement.checked = 'checked';
			}
			inputElement.addEventListener('change', () => {
				countOutputs();
			});

			const labelElement = document.createElement('label');
			labelElement.setAttribute('for', inputName);
			labelElement.textContent = attribute;

			const containerElement = document.createElement('div');
			containerElement.classList.add('attribute');
			containerElement.append(inputElement);
			containerElement.append(labelElement);
			fieldset.append(containerElement);
		}

		const allButton = document.createElement('button');
		allButton.textContent = 'All';
		allButton.id = `all-${category.name}`;
		allButton.addEventListener('click', event => {
			setAllAttributes(event.target, true);
		});

		const noneButton = document.createElement('button');
		noneButton.textContent = 'None';
		noneButton.id = `none-${category.name}`;
		noneButton.addEventListener('click', event => {
			setAllAttributes(event.target, false);
		});

		const buttonContainer = document.createElement('div');
		buttonContainer.classList.add('buttonContainer');
		buttonContainer.append(allButton, noneButton);

		fieldset.append(buttonContainer);
	}

	countOutputs();
};

const go = () => {
	console.log('go');
	const categories = ['prefixes', 'animals'];
	const categoryStrings = [];

	for (const category of categories) {
		const selectedAttributes = [];
		const fieldset = document.querySelector(`fieldset#${category}`);
		const checkedOptions = fieldset.querySelectorAll(`input:checked`);
		for (const checkedOption of checkedOptions) {
			selectedAttributes.push(checkedOption.value);
		}

		categoryStrings.push(`${category}=${selectedAttributes.join(',')}`);
	}

	document.location.href = `/?${categoryStrings.join('&')}`;
};

const setupOptions = () => {
	console.log('setupOptions');
	getData('prefixes', checkLoadedStates, writeOptions);
	getData('animals', checkLoadedStates, writeOptions);

	document.querySelector('#go').addEventListener('click', () => {
		go();
	});
};

const setupMain = () => {
	const spinster = document.createElement('div');
	const headline = document.querySelector('h1');
	spinster.classList.add('spinner');
	headline.after(spinster);
	new Spinner(spinnerConfig).spin(spinster); // eslint-disable-line no-undef

	document.querySelector('.another').addEventListener('click', () => {
		generate();
	});
	document.querySelector('.prefix').addEventListener('click', () => {
		writeThing('prefixes', 'prefix');
	});
	document.querySelector('.animal').addEventListener('click', () => {
		writeThing('animals', 'animal');
	});

	getData('prefixes', checkLoadedStates, reduce);
	getData('animals', checkLoadedStates, reduce);
};

const initProjectNamer = () => {
	document.documentElement.classList.add('js');

	document.querySelector('#menu-trigger').addEventListener('click', event => {
		event.target.closest('nav').classList.toggle('open');
	});

	document.querySelector('#nav-options').addEventListener('click', event => {
		event.preventDefault();
		const searchStr = document.location.search;
		document.location.href = `/options/${searchStr}`;
	});

	if (document.querySelector('main.namer')) {
		setupMain();
	}
	if (document.querySelector('main.options')) {
		setupOptions();
	}
};

window.addEventListener('load', initProjectNamer);
