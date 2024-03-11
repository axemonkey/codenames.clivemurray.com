module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('codenames.clivemurray.com/public');
	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setServerOptions({
		// liveReload: false,
		watch: [
			'codenames.clivemurray.com/public/**/*',
		],
		showVersion: true,
	});
};
