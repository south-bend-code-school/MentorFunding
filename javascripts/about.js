// Initialize Firebase
var config = {
  apiKey: "AIzaSyCH_4kPXSGIeWunJCznFLDb4fP5PZpSRr4",
  authDomain: "mentorfunding.firebaseapp.com",
  databaseURL: "https://mentorfunding.firebaseio.com",
  storageBucket: "mentorfunding.appspot.com",
  messagingSenderId: "448935507675"
};

firebase.initializeApp(config);

window.onload = function(){
  //get name to display at top instead of sign in
  firebase.auth().onAuthStateChanged( function(user) {
    if (user) {
      var html_name = document.getElementById('signIn');
      html_name.innerHTML = user.displayName;
      //show user name near login (get inner HTML of that div
      document.getElementById('signIn').addEventListener('click', userPage, false);
    } else {
      document.getElementById('signIn').addEventListener('click', signIn, false);
    }
  });
}

function signIn(){
  window.location = "./signIn.html";
}

function userPage(){
  window.location = "./myProfile.html";
} 

