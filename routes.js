var echojs = require('echojs');

exports.index = function(req,res){
	res.render('index');
}

exports.yourlang = function(req,res){
	res.render('yourlang');
}

exports.newlang = function(req,res){
	res.render('newlang');
}

exports.songselectionCH = function(req,res){
	res.render('songselectionCH');
}

exports.songselection = function(req,res){
	res.render('songselection');
}

exports.karaokehero = function(req,res){
	res.render('karaoke-hero');
}

exports.api = function(req,res){
	var call = req.params.call;
	var query = req.query.qs;
	var echo = echojs({
  key: process.env.ECHONEST_KEY
	});
	console.log(query);
	switch (call){
		case 'artist':
			echo('artist/search').get({
  		name: query
			}, function (err, json) {
  			res.json(json);
			});
			break;
		}
}

exports.tests = function(req,res){
	res.render('tests');
}