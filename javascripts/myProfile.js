// Initialize Firebase
var config = {
  apiKey: "AIzaSyCH_4kPXSGIeWunJCznFLDb4fP5PZpSRr4",
  authDomain: "mentorfunding.firebaseapp.com",
  databaseURL: "https://mentorfunding.firebaseio.com",
  storageBucket: "mentorfunding.appspot.com",
  messagingSenderId: "448935507675"
};

firebase.initializeApp(config);
//global variables

window.onload = function(){
  //get name to display at top instead of sign in
  var user = firebase.auth().currentUser;
  var userId = user.uid;
  firebase.database().ref('/Users/' + userId+'/personalInfo/').once('value').then(function(snapshot) {
    var obj = Object(snapshot.val());
    var first = obj.firstName;
    var last = obj.lastName;
    var name = first + last;
    //console.log(name);
  });
  firebase.database().ref('/Users/' + userId+'/schoolInfo/').once('value').then(function(snapshot) {
    var obj = Object(snapshot.val());
    //console.log(obj);
    var school = obj.school;
    var program = obj.undergraduateprogram;
    var graduation_date = obj.undergradGraduation;
  });
  /*firebase.database().ref('/Users/' + userId+'/employmentInfo/').once('value').then(function(snapshot) {
    var obj = Object(snapshot.val());
    console.log(obj);
    var job;
    var grad;
  });*/
  
}

