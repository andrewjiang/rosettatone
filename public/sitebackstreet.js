var site = {
	init : function(){
		paused = false;
		var lang1 = "[0:04] Quiero ser tu héroe\n[0:12] Si una vez yo pudiera llegar\n[0:19] A erizar de frío tu piel\n[0:25] A quemar que sé yo, tu boca\n[0:32] Y morirme allí despuésn\n[0:38] Y si entonces\n[0:40] Temblaras por mi\n[0:45] Y lloraras al verme sufrir\n[0:50] Y sin dudar tu vida entera dar\n[0:57] Como yo la doy por ti\n[1:04] Si pudiera ser tu héroe\n[1:10] Si pudiera ser tu Dios\n[1:17] Que salvarte a ti mil veces\n[1:22] Puede ser mi salvación\n[1:32] Si supieras\n[1:35] La locura que llevo\n[1:39] Que me hiere\n[1:41] Y me mata por dentro\n[1:44] Y qué más da\n[1:46] Mira que al final\n[1:51] Lo que importa es que te quiero\n[1:58] Si pudiera ser tu héroe\n[2:04] Si pudiera ser tu Dios\n[2:11] Que salvarte a ti mil veces\n[2:16] Puede ser mi salvación\n[2:54] Déjame tocarte, quiero acariciarte\n[3:02] Una vez mas,\n[3:05] Mira que al final\n[3:10] Lo que importa es que te quiero\n[3:17] Si pudiera ser tu héroe\n[3:23] Si pudiera ser tu Dios\n[3:29] Que salvarte a ti mil veces\n[3:35] Puede ser mi salvación\n[3:42] Quiero ser tu héroe\n[3:48] Si pudiera ser tu Dios\n[3:53] Porque salvarte a ti mil veces\n[4:00] Puede ser mi salvación\n[4:06] Puede ser mi salvación\n[4:13] Quiero ser tu héroe..."   
		var lang2 = "[0:04]I want to be your hero\n[0:12]If one time I could arrive\n[0:19]To remove the cold from your skin\n[0:25]To melt what seals your lips\n[0:32]And die there after\n[0:38] And if you\n[0:40] Tremble for me\n[0:45] And cry when you see me suffer\n[0:50] And without questions give me your entire life\n[0:57] Like I have done for you.\n[1:04] If you'd let me be your hero\n[1:10] If you'd let me be your God\n[1:17] Than saving you a thousand times,\n[1:22] You can be, my salvation.\n[1:32] If you knew\n[1:35] The insanity I carry\n[1:39] That maims,\n[1:41] And kills me inside\n[1:44] But what does it matter?\n[1:46] In the end\n[1:51] What matters is that I love you\n[1:58] If you'd let me be your hero\n[2:04] If you'd let me be your God\n[2:11] Than saving you a thousand times,\n[2:16] you can be, my salvation.\n[2:54] Let me touch you,I wanna caress you\n[3:02] One more time\n[3:05] In the end\n[3:10] what matters is that I love you\n[3:17] If you'd let me be your hero\n[3:23] If you'd let me be your God\n[3:29] Than saving you a thousand times,\n[3:35] You can be, my salvation.\n[3:42] I want to be your hero\n[3:48] If you'd let me be your God\n[3:53] Than saving you a thousand times,\n[4:00] You can be, my salvation.\n[4:06] You can be, my salvation.\n[4:13] I want to be your hero"
		jQuery("#thePlayer").tubeplayer({
							  width: 600, // the width of the player
    						height: 450, // the height of the player
    						allowFullScreen: "true", // true by default, allow user to go full screen
    						initialVideo: "3em-HzcwiDg", // the video that is loaded into the player
    						preferredQuality: "default"// preferred quality: default, small, medium, large, hd720
						});
		site.getReady(lang1,lang2);
		site.pauseHandler();		
		site.callAPI("artist","enrique iglesias").done(function(data){
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

