var site = {
	init : function(){
		paused = false;
		var lang1 ="[0:16] Merry Christmas\n[0:19] Merry Christmas\n[0:22] Merry Christmas\n[0:24] A prosperous year and happiness\n[0:29] Merry Christmas\n[0:32] Merry Christmas\n[0:35] Merry Christmas\n[0:37] A prosperous year and happiness\n[0:42] I wanna wish you a Merry Christmas\n[0:45] I wanna wish you a Merry Christmas\n[0:48] I wanna wish you a Merry Christmas\n[0:50] From the bottom of my heart\n[0:55] I wanna wish you a Merry Christmas\n[0:58] I wanna wish you a Merry Christmas\n[1:01] I wanna wish you a Merry Christmas\n[1:04] From the bottom of my heart\n[1:08] Merry Christmas\n[1:11] Merry Christmas\n[1:13] Merry Christmas\n[1:16] A prosperous year and happiness\n[1:21] Merry Christmas[1:25] Merry Christmas\n[1:28] Merry Christmas\n[1:29] A prosperous year and happiness\n[1:34] I wanna wish you a Merry Christmas\n[1:37] I wanna wish you a Merry Christmas\n[1:41] I wanna wish you a Merry Christmas\n[1:43] From the bottom of my heart\n[1:47] I wanna wish you a Merry Christmas\n[1:51] I wanna wish you a Merry Christmas\n[1:54] I wanna wish you a Merry Christmas\n[1:56] From the bottom of my heart\n[2:04] Merry Christmas\n[2:05] Merry Christmas\n[2:07] Merry Christmas\n[2:09] A prosperous year and happiness\n[2:14] Merry Christmas\n[2:17] Merry Christmas\n[2:20] Merry Christmas\n[3:02] A prosperous year and happiness"
		var lang2 = "[0:16] Feliz Navidad\n[0:19] Feliz Navidad\n[0:22] Feliz Navidad\n[0:24] Prospero año y felicidad\n[0:29] Feliz Navidad\n[0:32] Feliz Navidad\n[0:35] Feliz Navidad\n[0:37] Prospero año y felicidad\n[0:42] I wanna wish you a Merry Christmas\n[0:45] I wanna wish you a Merry Christmas\n[0:48] I wanna wish you a Merry Christmas\n[0:50] From the bottom of my heart\n[0:55] I wanna wish you a Merry Christmas\n[0:58] I wanna wish you a Merry Christmas\n[1:01] I wanna wish you a Merry Christmas\n[1:04] From the bottom of my heart\n[1:08] Feliz Navidad\n[1:11] Feliz Navidad\n[1:13] Feliz Navidad\n[1:16] Prospero año y felicidad\n[1:21] Feliz Navidad\n[1:25] Feliz Navidad\n[1:28] Feliz Navidad\n[1:29] Prospero año y felicidad\n[1:34] I wanna wish you a Merry Christmas\n[1:37] I wanna wish you a Merry Christmas\n[1:41] I wanna wish you a Merry Christmas\n[1:43] From the bottom of my heart\n[1:47] I wanna wish you a Merry Christmas\n[1:51] I wanna wish you a Merry Christmas\n[1:54] I wanna wish you a Merry Christmas\n[1:56] From the bottom of my heart\n[2:04] Feliz Navidad\n[2:05] Feliz Navidad\n[2:07] Feliz Navidad\n[2:09] Prospero año y felicidad\n[2:14] Feliz Navidad\n[2:17] Feliz Navidad\n[2:20] Feliz Navidad\n[2:22] Prospero año y felicidad\n[2:27] I wanna wish you a Merry Christmas\n[2:30] I wanna wish you a Merry Christmas\n[2:33] I wanna wish you a Merry Christmas\n[2:36] From the bottom of my heart\n[2:41] I wanna wish you a Merry Christmas\n[2:43] I wanna wish you a Merry Christmas\n[2:47] I wanna wish you a Merry Christmas\n[2:49] From the bottom of my heart\n[2:54] Feliz Navidad\n[2:57] Feliz Navidad\n[3:00] Feliz Navidad\n[3:02] Prospero año y felicidad"  		
		jQuery("#thePlayer").tubeplayer({
							  width: 600, // the width of the player
    						height: 450, // the height of the player
    						allowFullScreen: "true", // true by default, allow user to go full screen
    						initialVideo: "xMtuVP8Mj4o", // the video that is loaded into the player
    						preferredQuality: "default"// preferred quality: default, small, medium, large, hd720
						});
		site.getReady(lang1,lang2);
		site.pauseHandler();		
		site.callAPI("artist","Jose Feliciano").done(function(data){
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
			console.log(data.response.biographies[3]);
				$("#insideTheFloater").html("<p>Artist Biography from Echonest</p><a href=\"#\" style=\"font-size: 13px;\">Read More  >></a><p style=\"font-size: 14px;\">" + data.response.biographies[0].text + "</p>");
		}
}

$(function(){site.init()}); 

