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
  firebase.database().ref('/Users/' + userId+'/personalInfo/').once('value').then(function(snapshot) {
    var username = Object(snapshot.val()).firstName;
    user.updateProfile({displayName: username}).catch(function(error){console.log(error)}); 
    var html_name = document.getElementById('signIn');
    html_name.innerHTML = user.displayName;
  });
  //wait for button press
  document.getElementById("continueBtn").addEventListener('click', proceed, false);
}

function proceed(){
  var gradoption = document.getElementById('gradoption_cb').value;
  var school = document.getElementById('school').value;
  var prog = document.getElementById('program').value;
  var month = document.getElementById('gradMonth').value;
  var year = document.getElementById('gradYear').value;
  var ugrad_date = month.toString()+"-"+year.toString();
  var gradSchool = document.getElementById('gradSchool').value;
  var gradProgram = document.getElementById('gradProgram').value;
  var month2 = document.getElementById('gradGradMonth').value;
  var year2 = document.getElementById('gradGradYear').value;
  var grad_date = month2.toString()+"-"+year2.toString();

  var info = {};
  if(gradoption == "on"){
    info['onTheList'] = "School not on list or has not graduated";
  }else{
    info['onTheList'] = "n/a";
  }
  info['school'] = school;
  info['undergaduateprogram'] = prog;
  info['undergradGraduation'] = ugrad_date;
  info['graduateSchool'] = gradSchool;
  info['graduateProgram'] = gradProgram;
  info['gradGraduation'] = grad_date;

  var user = firebase.auth().currentUser;
  firebase.database().ref('Users/'+user.uid+'/schoolInfo').set(info);

  window.location = "employmentInformation.html";

}


