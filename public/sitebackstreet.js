var site = {
	init : function(){
		paused = false;
		var lang1 = "[0:01] 你是\n[0:03] 我火\n[0:06] 你是\n[0:09] 我愿望\n[0:11] 相信\n[0:13] 听我说\n[0:16] 我要你那样\n[0:20] 可是\n[0:22] 我们已分开\n[0:24] 你心不明白\n[0:31] 听我说\n[0:35] 我要你那样\n[0:39] 告诉我\n[0:40] 为什们让我心痛\n[0:42] 告诉我\n[0:44] 为什么你不行懂\n[0:48] 告诉我\n[0:49] 我永远不要听你说\n[0:52] 我要你那样\n[0:56] 我是\n[0:58] 你火吗\n[1:01] 你的\n[1:04] 愿望吗\n"
  
		var lang2 = var chinese1 = "[0:01] You are\n[0:03] my fire\n[0:06] the one\n[0:09] desire\n[0:11] believe\n[0:13] when I say\n[0:16] I want it that way\n[0:20] but we\n[0:22] are two worlds apart\n[0:24] can't reach to your heart\n[0:31] when I say\n[0:35] I want it that way\n[0:39] tell me why\n[0:40] ain't nothing but a heartache\n[0:42] tell me why\n[0:44] ain't nothing but a mistake\n[0:48] tell me why\n[0:49] I never wanna hear you say\n[0:52] I want it that way\n[0:56] am I\n[0:58] your fire\n[1:01] your one\n[1:04] desire"
		jQuery("#thePlayer").tubeplayer({
							  width: 600, // the width of the player
    						height: 450, // the height of the player
    						allowFullScreen: "true", // true by default, allow user to go full screen
    						initialVideo: "3em-HzcwiDg", // the video that is loaded into the player
    						preferredQuality: "default",
    						modestbranding: true,
    						showControls: false	// preferred quality: default, small, medium, large, hd720
						});
		site.getReady(lang1,lang2);
		site.pauseHandler();		
		site.callAPI("artist","backstreet boys").done(function(data){
			site.displayEcho(data);
		}); 
	},

	getReady : function(lang1, lang2){
			site.parse(lang1, function(lang1lyrics){
			site.parse(lang2, function(lang2lyrics){
					$("#globalStart").click(function(){
						if (paused == true){
							timer1.resume();
							timer2.resume();
							jQuery("#thePlayer").tubeplayer("play");
							paused = false;
						} else {
						site.displayLang1Array(lang1lyrics, "lang1");
						site.displayLang2Array(lang2lyrics,"lang2");
						jQuery("#thePlayer").tubeplayer("play");
					}
					});
			})
		});
	},

	pauseHandler : function(){
		$("#globalPause").click(function(){
				paused = true;
				jQuery("#thePlayer").tubeplayer("pause");
				timer1.pause();
				timer2.pause();
		});
	},

	callAPI : function(param, qs){
		qs = undefined ? qs = "": qs = qs;
		return $.ajax({
			url: '/api/' + param + '/?qs=' + qs,
				type: 'GET'
		});
	},

	displayLang1Array: function(array, divId){

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
			timer1 = new site.Timer(function(){
				$("#" + divId).html(array[1][i]);
				i++;
				if (i < array[1].length){displayLoop();}
			}, getTimeout(i));}

		displayLoop();
	},

		displayLang2Array: function(array, divId){

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
			timer2 = new site.Timer(function(){
				$("#" + divId).html(array[1][i]);
				i++;
				if (i < array[1].length){displayLoop();}
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
	},

	Timer : function(callback,delay) {
		var timerId, start, remaining = delay;
		this.pause = function() {
			window.clearTimeout(timerId);
			remaining -= new Date() - start;
		}
		this.resume = function() {
			start = new Date();
			timerId = window.setTimeout(callback, remaining);
		}
		this.resume();
		},

		displayEcho : function(data){
			console.log(data.response.biographies[1]);
				$("#insideTheFloater").html("<p>Artist Biography from Echonest</p><a href=\"#\" style=\"font-size: 13px;\">Read More  >></a><p style=\"font-size: 14px;\">" + data.response.biographies[1].text + "</p>");
		}
}

$(function(){site.init()}); 

