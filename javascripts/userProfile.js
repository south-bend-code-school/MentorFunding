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
      document.getElementById('signIn').addEventListener('click', logout, false);
    }
  });
}

function logout(){
  firebase.auth().signOut().then(function(){
      window.location = "../index.html";
  }).catch(function(error){
      console.log("error occured")
      var errorCode = error.code;
      alert(errroCode); 
  });
}
