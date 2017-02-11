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
  //check if button pressed
  document.getElementById('startApp').addEventListener('click', startApp, false);

  //get name to display at top instead of sign in
  firebase.auth().onAuthStateChanged( function(user) {
    if (user) {
      var name = user.email;
      var username = name.split("@")[0];
      try{ username = username.split(".")[0];} catch (err) { console.log(err);}
      user.updateProfile({displayName: username}).catch(function(error){console.log(error)}); 
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
  window.location = "./views/signIn.html";
}

function userPage(){
  window.location = "./views/userProfile.html";
} 
function startApp(){
  window.location = "./views/personalInformation.html";
}

