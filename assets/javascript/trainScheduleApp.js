
// Get a reference to the database service
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDnFc0s5LhyygBtScRiNFoRIrSFKqSt58Y",
    authDomain: "trainschedule-1c91e.firebaseapp.com",
    databaseURL: "https://trainschedule-1c91e.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "794769337582"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var trainName;
var trainDestination ;
var firstTime ;
var	trainFrequency;
var arrival;
var arrival_1;
var nextArrival;
var minsAway;
//var currentTime;

// --------------------------------------------------------------
// Whenever a user clicks the click button
$(document).ready(function(){

$("#clickButton").on("click", function() {


	trainName = $('#trainName').val().trim();
	trainDestination = $('#destinationTrain').val().trim();
	firstTime = $('#firstTrainTime').val().trim();
	trainFrequency = $('#frequencyTrain').val().trim();

	var time = firstTime.split(':');
	var convertedTimeTrain = (time[0]*3600)+(time[1]*60);
	
	var currentTime = new Date();
	var convertedTimeCurrent = (currentTime.getHours()*3600)+(currentTime.getMinutes()*60);

   	console.log(convertedTimeTrain);
   	console.log(convertedTimeCurrent);
 

	if (convertedTimeCurrent > convertedTimeTrain)
	 {
	 	var diff = (convertedTimeCurrent - convertedTimeTrain)/60; 
	 	minsAway = Math.round((trainFrequency)-(diff%trainFrequency)); 

	 	console.log(minsAway);

	 	arrival = moment().add(minsAway, "minutes");
	 	arrival_1 = moment(arrival).format("hh:mm");
	 	nextArrival = arrival_1;
		console.log("ARRIVAL TIME: " + nextArrival);

	 }
	 else if (convertedTimeCurrent < convertedTimeTrain)
	 {
	 	minsAway = Math.round(((convertedTimeTrain-convertedTimeCurrent)/60));
	 	console.log(minsAway);

	 	arrival = moment().add(minsAway, "minutes");
	 	arrival_1 = moment(arrival).format("hh:mm");
	 	nextArrival = arrival_1;
		console.log("ARRIVAL TIME: " + nextArrival);
	 }



	database.ref().push({
		name: trainName,
		destination: trainDestination,
		time: firstTime,
		frequency: trainFrequency,
		arrivalTime: nextArrival,
		nextTrainMins: minsAway
	})
	return false;

});

database.ref().on("child_added", function(childSnapshot) {
	// Log everything that's coming out of snapshot
	console.log(childSnapshot.val().name);
	console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().time);
	console.log(childSnapshot.val().frequency);
	
	// full list of items to the well
 $('.table tbody').append("<tr class='child'><td> "+childSnapshot.val().name+"</td><td> "+childSnapshot.val().destination+"</td><td>"+childSnapshot.val().frequency+"</td> <td> "+childSnapshot.val().arrivalTime+"</td> <td> "+childSnapshot.val().nextTrainMins+"</td></tr>");
 

 //$('.table tbody').append("<tr class='child'><td> "+childSnapshot.val().name+"</td></tr>");
// Handle the errors
}, function(errorObject){
	//console.log("Errors handled: " + errorObject.code)
});

//dateAdded : firebase.database.ServerValue.TIMESTAMP
});