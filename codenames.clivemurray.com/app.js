import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';

const appFolder = `${path.resolve()}/codenames.clivemurray.com`;
const codenamesApp = express();

codenamesApp.engine('hbs', engine({
	extname: 'hbs',
}));
codenamesApp.set('views', `${appFolder}/views`);
codenamesApp.set('view engine', 'hbs');
codenamesApp.use(express.static(`${appFolder}/public`));

codenamesApp.get('/', (req, res) => {
	res.render('index');
});

export {codenamesApp};
