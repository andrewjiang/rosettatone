

exports.index = function(req,res){
	res.render('index');
}

exports.api = function(req,res){
	res.json(jsonresponse);
}

exports.tests = function(req,res){
	res.render('tests');
}