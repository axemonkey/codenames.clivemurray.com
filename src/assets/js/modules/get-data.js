const getData = (objectName, callback, next) => {
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState === 4 && xhttp.status === 200) {
			callback(objectName, xhttp.responseText, next);
		}
	};
	xhttp.open('GET', `/public/data/${objectName}.json`, true);
	xhttp.send();
};

export { getData };
