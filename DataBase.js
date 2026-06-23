var GLOBAL_user;
var authenticationListener; 

function fb_login() {
  authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
}
//to check if the user is login//
 async function fb_handleLogin(_user) {
  if (_user) {
    GLOBAL_user = _user;
    console.log("User is logged in")
  
  await firebase.database().ref('Users that have a account or signed in/users/' + GLOBAL_user.uid).update(
      {
        name: GLOBAL_user.displayName,
        email: GLOBAL_user.email,
        profile: GLOBAL_user.photoURL
      }
    );

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



highscoreTable = {
  
  JumpDash: {
    users: {
      lukas: 10,
      Coby: 5,
      Pasha: 6,
      Josh: 9,
      Callum: 4
    }

  },

  GeoDash: {
    users: {
      lukas: 1700,
      coby: 240,
      pasha: 500,
      josh: 2012,
      callum: 1923

    }

  }

}

firebase.database().ref('/').set(highscoreTable)


 