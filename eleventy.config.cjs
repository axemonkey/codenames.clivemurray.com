module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('codenames.clivemurray.com/public');
	eleventyConfig.addPassthroughCopy('codenames.clivemurray.com/manifest.json');
	eleventyConfig.addPassthroughCopy('codenames.clivemurray.com/service-worker.js');
	eleventyConfig.addPassthroughCopy({'codenames.clivemurray.com/robots.txt': '/robots.txt'});
	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setServerOptions({
		// liveReload: false,
		watch: [
			'codenames.clivemurray.com/public/**/*',
		],
		showVersion: true,
	});
};
