const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('name', () => {
	return 'Kashish';
});

app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method}, ${req.url}`;
	fs.appendFile('server.log', log + '\n', (error) => {
		if(error){
			console.log('Unable to load.');
		}
	});
	next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('home.hbs');
});

app.get('/about', (req, res) => {
	res.render('about.hbs');
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs');
});

app.listen(3000);
