var GLOBAL_user;
var authenticationListener; 

function fb_login() {
  authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
}
//to check if the user is login//
function fb_handleLogin(_user) {
  if (_user) {
    console.log("User is logged in")
    GLOBAL_user = _user;
  } else {
    console.log("User is NOT logged in - Starting the popup process")
    fb_popupLogin();
  }
}
// to have the user login//
function fb_popupLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user;
    console.log("User has logged in")
    
  });
}
if (condition) {
  
}