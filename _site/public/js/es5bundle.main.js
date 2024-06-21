(function () {
	'use strict';

	const getData = (objectName, callback) => {
	  const xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = () => {
	    if (xhttp.readyState === 4 && xhttp.status === 200) {
	      callback(objectName, xhttp.responseText);
	    }
	  };
	  xhttp.open('GET', `/public/data/${objectName}.json`, true);
	  xhttp.send();
	};

	const spinnerConfig = {
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

	const ucfirst = str => {
	  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
	};

	const lapBanner = {
	  storageKey: 'loveAndPainkillers-banner-config',
	  numberOfDaysToHideBanner: 7,
	  init: () => {
	    // if not cookie
	    if (lapBanner.cookieCheck()) {
	      lapBanner.createStyles();
	      lapBanner.showBanner();
	    }
	  },
	  cookieCheck: () => {
	    const ls = localStorage.getItem(lapBanner.storageKey);
	    const lsObj = JSON.parse(ls);
	    if (lsObj && lsObj.cookieDismissed && lapBanner.isCookieStillGood(lsObj.cookieDismissed)) {
	      console.log(`LAP Banner cookie found. Banner was dismissed within the previous ${lapBanner.numberOfDaysToHideBanner} days. Do not show banner.`);
	      return false;
	    }
	    return true;
	  },
	  isCookieStillGood: cookieDismissed => {
	    const now = Date.now(); // ms since epoch to now
	    const since = now - cookieDismissed;
	    const daysToHideBannerInMs = 1000 * 60 * 60 * 24 * lapBanner.numberOfDaysToHideBanner;
	    if (since < daysToHideBannerInMs) {
	      return true;
	    }
	    return false;
	  },
	  createStyles: () => {
	    const lapStyle = document.createElement('style');
	    const styleStr = lapBanner.assembleStyles();
	    lapStyle.innerHTML = styleStr;
	    document.head.append(lapStyle);
	  },
	  showBanner: () => {
	    const lapBannerElement = document.createElement('div');
	    const inner = lapBanner.assembleBannerHTML();
	    const bannerCloser = lapBanner.getBannerCloser();
	    lapBannerElement.classList.add('c-lap-banner');
	    lapBannerElement.append(inner);
	    lapBannerElement.append(bannerCloser);
	    document.body.append(lapBannerElement);
	    lapBanner.setupCloseEvent(bannerCloser);
	  },
	  assembleStyles: () => {
	    let str = '';
	    str += '.c-lap-banner {z-index: 9999; overflow: hidden; width: 100%;position: fixed;left: 0;bottom: 0;background: rgba(0, 0, 0, 90%); padding-top: 40px; @media (min-width: 600px) {padding-top: 0;} }';
	    str += '.c-lap-banner * { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important; font-size: 22px !important; }';
	    str += '.c-lap-banner strong {font-weight: bold;}';
	    str += '.c-lap-banner p {color: #fff; margin-bottom: 1em;line-height: normal !important;}';
	    str += '.c-lap-banner-inner {max-width: 800px; margin: auto; display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; align-items: center; gap: 20px;}';
	    str += '.c-lap-banner__copy {padding: 10px 0; /*background: rgba(255, 0, 0, 50%);*/}';
	    str += '.c-lap-banner-inner img {display: block; aspect-ratio: 1 / 1; width: 150px; height: 150px; flex-shrink: 0; overflow: hidden;}';
	    str += '.c-lap-banner__headline {padding: 0 10px; letter-spacing: 1px; text-shadow: 0 0 4px rgba(92, 219, 255, 80%); @media (min-width: 600px) {padding: 0;} }';
	    str += '.c-lap-banner__link {text-align: center;}';
	    str += '.c-lap-banner__link a {text-decoration: none; color: #000; font-style: normal; background-color: #5cdbff; border-radius: 100px; display: inline-block; padding: 7px 15px 5px; font-weight: bold; box-shadow: 0 0 4px rgba(255, 255, 255, 80%);}';
	    str += '.c-lap-banner__link a:hover {background: #fff;}';
	    str += '.c-lap-banner button {opacity: 1 !important; letter-spacing: normal !important;}';
	    str += '.c-lap-banner-closer {position: absolute;right: 5px;top: 5px; border: 0px solid transparent; border-radius: 100px;padding: 0 8px 2px; background: #5cdbff; color: #000; cursor: pointer;}';
	    str += '.c-lap-banner-closer:hover {background: #fff;}';
	    str += '.c-lap-banner-fadeout { animation: lpb-fade 1s forwards; }';
	    str += '@keyframes lpb-fade { 0% {opacity: 1; height: 150px; } 100% {opacity: 0; height: 0;} }';
	    return str;
	  },
	  assembleBannerHTML: () => {
	    const bannerInner = document.createElement('div');
	    bannerInner.classList.add('c-lap-banner-inner');
	    let str = '';
	    str += '<img src="https://loveandpainkillers.com/public/images/cover/cover-150.jpg" alt="Cover image for the album &ldquo;Love and Painkillers&rdquo; by Clive Murray">';
	    str += '<div class="c-lap-banner__copy">';
	    str += '<p class="c-lap-banner__headline"><strong>LOVE AND PAINKILLERS</strong> – by Clive Murray</p>';
	    str += '<p class="c-lap-banner__link"><a href="https://loveandpainkillers.com">GET IT NOW</a></p>';
	    str += '</div>';
	    bannerInner.innerHTML = str;
	    return bannerInner;
	  },
	  getBannerCloser: () => {
	    const bannerCloser = document.createElement('button');
	    bannerCloser.classList.add('c-lap-banner-closer');
	    bannerCloser.innerHTML = '&times;';
	    return bannerCloser;
	  },
	  setupCloseEvent: closeButton => {
	    closeButton.addEventListener('click', event => {
	      event.preventDefault();
	      document.querySelector('.c-lap-banner').classList.add('c-lap-banner-fadeout');

	      // set cookie
	      const storeObj = {
	        cookieDismissed: Date.now()
	      };
	      localStorage.setItem(lapBanner.storageKey, JSON.stringify(storeObj));
	    });
	  }
	};

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
	    animals: []
	  }
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
	    navigator.serviceWorker.register('/service-worker.js').then(_res => console.log('service worker registered')).catch(error => console.log('service worker not registered', error));
	  });
	} else {
	  console.log('serviceWorker not found in navigator');
	}
	window.addEventListener('load', initProjectNamer);

})();
