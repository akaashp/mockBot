console.log("start");

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

var stream = T.stream('statuses/filter', { track: '@mockBotv1' });

stream.on('tweet', tweetEvent);



function tweetEvent(eventMsg){
	console.log("inside tweet event")
	var in_reply_to_status_id_str = eventMsg.in_reply_to_status_id_str;
	console.log(in_reply_to_status_id_str);
	//var fs = require('fs');
	//var jsonTxt = JSON.stringify(eventMsg,null,2);
	//fs.writeFile("tweet.json", jsonTxt);
	console.log("here");


	T.get('statuses/show/:id', {id : in_reply_to_status_id_str} , gotData).resolve();

	console.log ("there " + contentsStr);
	console.log (eventMsg.user_mentions);

	

	//tweetIt(eventMsg.user_mentions)
}


function gotData(err, data, response){
	console.log("got here");

	console.log(data.text);


	tweetIt(users);

}

function tweetIt(txt){
	var tweet = {
		status: 'test from node' + users
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


