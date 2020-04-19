var temp = "we are, Going to the Store."

var newString ="";

for (let i = 0; i < temp.length; i++ ){
	rand = Math.random();
	if(rand<.6){
		newString += temp[i].toUpperCase();
	}else{
		newString += temp[i];
	}
}
console.log(newString);