module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('src/public');
	eleventyConfig.addPassthroughCopy('src/manifest.json');
	eleventyConfig.addPassthroughCopy('src/service-worker.js');
	eleventyConfig.addPassthroughCopy({'src/robots.txt': '/robots.txt'});
	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setServerOptions({
		// liveReload: false,
		watch: [
			'src/public/**/*',
		],
		showVersion: true,
	});
};
