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
  document.getElementById("continueBtn").addEventListener("click", checkConsent,false);
}
function checkConsent(evt){
  evt.preventDefault();
  var consent = document.getElementById('consent_state').value;
  if (consent == 'off'){
    alert('Need to consent to continue\nWindow will reload');
    var delay = 3000;
    setTimeout(function(){
      window.location = "./personalInformation.html";
    },delay);
  } else {
    console.log('got to end of consent');
    signUp();
  } 
}
//sing user in with firebase
function signUp() {
    var first = document.getElementById('firstName').value;
    var middle = document.getElementById('middleName').value;
    var last = document.getElementById('lastName').value;
    var phone = document.getElementById('phoneNum').value;
    var st = document.getElementById('streetAddress').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var zip = document.getElementById('zipCode').value;
    var dob = document.getElementById('DOB').value;
    var citizen = document.getElementById('citizen_state').value;
    var homeOwner = document.getElementById('homeOwner').value;

    //account sign in information
    var email = document.getElementById('emailTxt').value;
    username = email.split("@")[0];
    try {
      username = username.split(".")[0];
    }catch(err){
      console.log(err);
    }
    var password = document.getElementById('passwordTxt').value;
    if (email.length < 4 ) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }

    info = {};
    info['email'] = email;
    info['password'] = password;
    info['firstName'] = first;
    info['middleName'] = middle;
    info['lastName'] = last;
    info['phoneNumber'] = phone;
    info['streetAddress'] = st;
    info['city'] = city;
    info['state'] = state;
    info['dateOfBirth'] = dob;
    if(citizen == "on"){
      info['citizen'] = "yes";
    } else {
      info['citizen'] = "no";
    }
    info['homeOwner'] = homeOwner;
    console.log("about to store info");
    var user = firebase.auth().currentUser;
    //second set to database doesn't work if first set is commented out; no idea why
    firebase.database().ref('Users/'+username).set(info).then(function(){
      firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
        var user = firebase.auth().currentUser;
        if(user != null){
          firebase.database().ref('Users/'+user.uid+'/personalInfo').set(info);
          firebase.database().ref().child('Users/'+username).remove();
          window.location = './schoolInformation.html';
        }
      }).catch(function(error){
          alert(error.code+'\n'+error.message);
          if (error.code == 'auth/wrong-password'){
            alert('Wrong password.');
          }
      });
    }).catch(function(error){
        alert(error.code+'\n'+error.message);
    });
}

