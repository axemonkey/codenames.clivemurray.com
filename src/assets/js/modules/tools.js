const ucfirst = (str) => {
	return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
};

const getParamFromURL = (param) => {
	let urlParam;
	const params = new URLSearchParams(document.location.search);
	if (params.get(param)) {
		urlParam = decodeURIComponent(params.get(param));
	}
	return urlParam;
};

export { ucfirst, getParamFromURL };
