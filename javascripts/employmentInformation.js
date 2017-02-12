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
  var user = firebase.auth().currentUser;
  var userId = user.uid;
  firebase.database().ref('/Users/' + userId).once('value').then(function(snapshot) {
    var username = Object(snapshot.val()).firstName;
    user.updateProfile({displayName: username}).catch(function(error){console.log(error)}); 
    var html_name = document.getElementById('signIn');
    html_name.innerHTML = user.displayName;
  });
  //wait for button press
  document.getElementById("continueBtn").addEventListener('click', proceed, false);
}

function proceed(){
  var employerName = document.getElementById('employerName').value;
  var selfEmployed = document.getElementById('selfEmployed').value;
  var emlpoymentStatus = document.getElementById('employmentStatus').value;
  var income = document.getElementById('income').value;
  var years = document.getElementById('yearsWorked').value;
  
  var info = {};
  if(selfEmployed == "on"){
    info['selfEmployed'] = "Yes";
  }else{
    info['selfEmployed'] = "No";
  }
  info['employerName'] = employerName;
  info['employmentStatus'] = emlpoymentStatus;
  info['income'] = income;
  info['yearsWorked'] = years;
  
  var user = firebase.auth().currentUser;
  firebase.database().ref('Users/'+user.uid+'/EmploymentInfo').set(info);

  window.location = "loanInformation.html";

}



