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

export default getData;

