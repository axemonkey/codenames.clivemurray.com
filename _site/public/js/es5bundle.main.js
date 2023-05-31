(function () {
	'use strict';

	var getData = function getData(objectName, callback) {
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function () {
	    if (xhttp.readyState === 4 && xhttp.status === 200) {
	      callback(objectName, xhttp.responseText);
	    }
	  };
	  xhttp.open('GET', "/public/data/".concat(objectName, ".json"), true);
	  xhttp.send();
	};

	var spinnerConfig = {
	  lines: 13,
	  // The number of lines to draw
	  length: 7,
	  // The length of each line
	  width: 4,
	  // The line thickness
	  radius: 10,
	  // The radius of the inner circle
	  corners: 1,
	  // Corner roundness (0..1)
	  rotate: 0,
	  // The rotation offset
	  color: '#ddd',
	  // #rgb or #rrggbb
	  speed: 1,
	  // Rounds per second
	  trail: 60,
	  // Afterglow percentage
	  shadow: false,
	  // Whether to render a shadow
	  hwaccel: true,
	  // Whether to use hardware acceleration
	  className: 'spin',
	  // The CSS class to assign to the spinner
	  zIndex: 2e9,
	  // The z-index (defaults to 2000000000)
	  top: 'auto',
	  // Top position relative to parent in px
	  left: 'auto' // Left position relative to parent in px
	};

	var ucfirst = function ucfirst(str) {
	  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
	};

	var projectNamerData = {
	  assets: {
	    prefixes: [],
	    animals: []
	  }
	};
	var writeThing = function writeThing(arrayName, elementClass) {
	  var array = projectNamerData.assets[arrayName];
	  var randomThing = array[Math.floor(Math.random() * array.length)];
	  document.querySelector(".".concat(elementClass)).textContent = ucfirst(randomThing.title);
	};
	var generate = function generate() {
	  writeThing('prefixes', 'prefix');
	  writeThing('animals', 'animal');
	};
	var start = function start() {
	  var spinster = document.querySelector('.spinner');
	  spinster.remove();
	  document.querySelector('.welcome').classList.remove('hide');
	  document.querySelector('.another').classList.remove('hide');
	  document.querySelector('h1').classList.remove('hide');
	  generate();
	};
	var checkLoadedStates = function checkLoadedStates(objectName, response) {
	  projectNamerData.assets[objectName] = JSON.parse(response);
	  if (projectNamerData.assets.prefixes.length > 0 && projectNamerData.assets.animals.length > 0) {
	    start();
	  }
	};
	var initProjectNamer = function initProjectNamer() {
	  var spinster = document.createElement('div');
	  var headline = document.querySelector('h1');
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
	};
	window.addEventListener('load', initProjectNamer);

})();
