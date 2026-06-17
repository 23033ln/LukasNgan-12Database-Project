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
    GLOBAL_user = result. user;
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

highscoreTable = {
  game1: {
    users: {
      lukas: 12324432523545245,
      Coby: 12343567891234567890,
      Pasha: 897,
      Josh: 322323,
      Callum: 123456789123456
    }

  },

  game2: {
    users: {
      lukas: 23266476645656,
      coby: 16465464654,
      pasha: 64565464567,
      josh: 35464565464,
      callum: 64564564512

    }

  }

}

firebase.database().ref('/').set(highscoreTable)