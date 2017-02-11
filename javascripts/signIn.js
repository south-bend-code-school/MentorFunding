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
  document.getElementById('signIn').addEventListener('click', signIn, false);
}

//sing user in with firebase
function signIn() {
    var email = document.getElementById('emailTxt').value;
    var username = email.split("@")[0];
    //check for . which will mess up storage in database
    try{
      username = username.split(".")[0];
    } catch (err) {
      console.log(err);
      console.log("could not simplify username");
    }
    var password = document.getElementById('passwordTxt').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }

    //second set to database doesn't work if first set is commented out; no idea why
    firebase.database().ref('Users/'+username).set({email:email,password:password}).then(function(){
      firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
        var user = firebase.auth().currentUser;
        if(user != null){ 
          firebase.database().ref('Users/'+username+'/').set({email:email,password:password,uid:user.uid});
          window.location = '../index.html';
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
