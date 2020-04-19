console.log("start");

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

var stream = T.stream('statuses/filter', { track: '@mockBotv1' });

stream.on('tweet', tweetEvent);



function tweetEvent(eventMsg){
	console.log(eventMsg);
	console.log("inside tweet event")
	var in_reply_to_status_id_str = eventMsg.in_reply_to_status_id_str;
	console.log(in_reply_to_status_id_str);
	//var fs = require('fs');
	//var jsonTxt = JSON.stringify(eventMsg,null,2);
	//fs.writeFile("tweet.json", jsonTxt);
	console.log("here");
	console.log (eventMsg.entities.user_mentions[0].toString + "  " + eventMsg.entities.user_mentions[1]);

	var tweettext;

	let gotData = function(err, data, response){
		console.log("got here");

		console.log(data.text);
		tweettext = data.text;
		var statID = eventMsg.id_str;

		
		var memeText = "";

		for(let i = 0; i <tweettext.length; i++ ){
			var rand = Math.random()
			if (rand<.6){
				memeText += tweettext[i].toUpperCase();
			}else{
				memeText += tweettext[i].toLowerCase();
			}
		}
		console.log("logg "+memeText);

		tweetIt("@"+eventMsg.in_reply_to_screen_name+" @"+eventMsg.user.screen_name +" "+ memeText, statID);

		return new Promise(function(resolve, reject){
			console.log("blah");
			//if (data.text != ""){
				resolve(data.text);
			//}else{
			//	reject("failed");
			//}
		});

	}

	T.get('statuses/show/:id', {id : in_reply_to_status_id_str} , gotData);


	
	//console.log (rslt);
	//console.log ("there " + contentsStr);
	
	

	//tweetIt(eventMsg.user_mentions)
}




function tweetIt(txt, statID){
	var tweet = {
		status: txt,
		in_reply_to_status_id: statID,
		//auto_populate_reply_metadata : true

	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response){
		if (err) {
			console.log("error1");
		}else{
			console.log("success")
		}
	}
}


