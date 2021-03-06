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
    var username = Object(snapshot.val()).firstName;
    user.updateProfile({displayName: username}).catch(function(error){console.log(error)}); 
    var html_name = document.getElementById('signIn');
    html_name.innerHTML = user.displayName;
  });
  document.getElementById("continueBtn").addEventListener("click", checkConsent,false);

}

function checkConsent(){
  var consent = document.getElementById('upload_consent_cb').value;
  if (consent == 'off'){
    alert('Need to consent to continue\nWindow will reload');
    var delay = 3000;
    setTimeout(function(){
      window.location = "./upload.html";
    },delay);
  } else {
    window.location = "./summary.html"
  } 
  
}
