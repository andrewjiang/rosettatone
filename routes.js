

exports.index = function(req,res){
	res.render('index');
}

exports.yourlang = function(req,res){
	res.render('yourlang');
}

exports.yourlang = function(req,res){
	res.render('newlang');
}

exports.api = function(req,res){
	res.json(jsonresponse);
}

exports.tests = function(req,res){
	res.render('tests');
}