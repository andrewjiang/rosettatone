

exports.index = function(req,res){
	res.render('index');
}

exports.yourlang = function(req,res){
	res.render('yourlang');
}

exports.newlang = function(req,res){
	res.render('newlang');
}

exports.songselection = function(req,res){
	res.render('songselection');
}

exports.karaokehero = function(req,res){
	res.render('karaoke-hero');
}

exports.api = function(req,res){
	res.json(jsonresponse);
}

exports.tests = function(req,res){
	res.render('tests');
}