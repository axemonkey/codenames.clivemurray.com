import {codenamesApp} from './codenames.clivemurray.com/app.js';

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	codenamesApp
		.listen(7777);
} else if (env === 'production') {
	codenamesApp
		.listen(process.env.PORT); // host specifies port number
}
