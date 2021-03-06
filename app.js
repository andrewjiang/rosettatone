var express = require('express');
var routes = require('./routes');

var app = express();
app.set('views', __dirname + '/views');  //set the directory for ejs view files
app.set('view engine', 'ejs');  //use ejs as view engine (no ejs is actually used, just basic hmtl)
app.use(express.logger('dev'));  //use development terminal logging
app.use(express.static(__dirname + '/public'));  //where static assets like stylesheets are

app.get('/', routes.index);
app.get('/api/:call', routes.api);
app.get('/tests', routes.tests);
app.get('/yourlang',routes.yourlang);
app.get('/newlang',routes.newlang);
app.get('/songselection',routes.songselection);
app.get('/karaoke-hero', routes.karaokehero);
app.get('/songselectionCH', routes.songselectionCH);
app.get('/karaoke-backstreet', routes.karaokebackstreet);
app.get('/karaoke-feliz', routes.karaokefeliz);

app.listen(3001);

