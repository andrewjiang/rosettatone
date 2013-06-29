var site = {
	init : function(){
		var lang1 = "[0:04] Quiero ser tu héroe\n[0:12]Si una vez yo pudiera llegar\n[0:19] A erizar de frío tu piel\n[0:25] A quemar que sé yo, tu boca\n[0:32] Y morirme allí despuésn"
		var lang2 = "[0:04]I want to be your hero\n[0:12]If one time I could arrive\n[0:19]To remove the cold from your skin\n[0:25]To melt what seals your lips\n[0:32]And die there after"
		var test ="[0:16] Merry Christmas\n[0:19] Merry Christmas\n[0:22] Merry Christmas\n[0:24] A prosperous year and happiness\n[0:29] Merry Christmas\n[0:32] Merry Christmas\n[0:35] Merry Christmas"
		console.log(test);
		site.getReady(lang1,lang2);		 
	},

	getReady : function(lang1, lang2){
			site.parse(lang1, function(lang1lyrics){
			site.parse(lang2, function(lang2lyrics){
				$("#startvid").click(function(){
				site.displayArray(lang1lyrics, "lang1");
				site.displayArray(lang2lyrics,"lang2");
				});
			})
		});
	},

	callAPI : function(param, qs){
		qs = undefined ? qs = "": qs = qs;
		return $.ajax({
			url: '/api/' + param + '/?qs=' + qs,
				type: 'GET'
		});
	},

	displayArray: function(array, divId){

		getTimeout = function(i){
			if (i == 0){
				thedelay = array[0][i] * 1000;
				} else {
				thedelay = (array[0][i] - array[0][i-1]) * 1000;
				}
				return thedelay;
		}

		var i = 0;
		function displayLoop() {
			setTimeout(function(){
				$("#" + divId).html(array[1][i]);
				i++;
				if (i < 5){displayLoop();}
			}, getTimeout(i));}

		displayLoop();
	},

	parse : function (lang, bigcallback){
      var contents = " " ;
      var allTextLines = " ";
      var lyrics = [];
      var time = [] ;
      var line = " ";
	// parsing the Lyrics 
		function processData(string, callback) { // This will only divide with respect to new lines 
    allTextLines = string.split(/\r\n|\n/);
    for (i=0;i<allTextLines.length;i++){
      if (allTextLines[i].search(/^(\[)(\d*)(:)(.*)(\])(.*)/i)>=0 ){
        line = allTextLines[i].match(/^(\[)(\d*)(:)(.*)(\])(.*)/i);
        time[i] = (parseInt(line[2])*60)+ parseInt(line[4]); // will give seconds 
        lyrics[i]= line[6] ;//will give lyrics 
      }
    }  
  callback(time, lyrics);
   } 
  processData(lang, function(time, lyrics){
  	bigcallback([time, lyrics]);
  });
	}
}

$(function(){site.init()}); 

