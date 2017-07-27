// Require
var express = require('express');
var hbs = require('express-handlebars');
var stylus = require('stylus');
var nib = require('nib');

var app = express();

// Handlebars
app.engine(
	'hbs', hbs(
		{
			extname:'hbs',
			defaultLayout: 'layout',
			layoutsDir: 'views/layouts/',
			partialsDir: 'views/partials/'
		}
	)
);

app.set('view engine', 'hbs');

// Stylus
function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib());
}

// tell node to compile.styl-files to normal css-files
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});