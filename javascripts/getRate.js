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
  //define globals
  var Fivef = document.getElementById('5yrFixed').value;
  var Tenf = document.getElementById('10yrFixed').value;
  var Fiff = document.getElementById('15yrFixed').value;

  var Fivev = document.getElementById('5yrVariable').value;
  var Tenv = document.getElementById('10yrVariable').value;
  var Fifv = document.getElementById('15yrVariable').value;

  var Fivef_row = document.getElementById('Fixed5yrRow');
  var Tenf_row = document.getElementById('Fixed10yrRow');
  var Fiff_row = document.getElementById('Fixed15yrRow');

  var Fivev_row = document.getElementById('Variable5yrRow');
  var Tenv_row = document.getElementById('Variable10yrRow');
  var Fifv_row = document.getElementById('Variable15yrRow');

  //wait for button press
  document.getElementById("continueBtn").addEventListener('click', proceed, false);
  //document.getElementById("5yrFixed").addEventListener('change',function(){checked(Fivef,Fivef_row);}, false);
  //document.getElementById("10yrFixed").addEventListener('click',checked, false);
  //document.getElementById("15yrFixed").addEventListener('click',checked, false);
  //document.getElementById("5yrVariable").addEventListener('click',checked, false);
  //document.getElementById("10yrVariable").addEventListener('click',checked, false);
  //document.getElementById("15yrVariable").addEventListener('click',checked, false);
}
//whenever option checked, get that value and turn column light blue (more efficient way but dont have time)
function checked(box,box_row){
  console.log(box);
  if(box == "on"){
    box_row.style.backgroundColor = "lightBlue";
  }else {
    box_row.style.backgroundColor = "white";
  } 
}
function proceed(){

  var info = {};
  
  //push information to database based on current user
  //var user = firebase.auth().currentUser;
  //firebase.database().ref('Users/'+user.uid+'/loanInfo').set(info);

  window.location = "upload.html";

}

