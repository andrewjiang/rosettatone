var site = {
	init : function(){
		site.callAPI("apicall").done(function(data){
			site.display(data);
		})
	},

	callAPI : function(param, qs){
		qs = undefined ? qs = "": qs = qs;
		return $.ajax({
			url: '/api/' + param + '/?qs=' + qs,
				type: 'GET'
		});
	},

	display : function(data){
		$("somediv").html(data);
	},

}

$(function(){site.init()});  

