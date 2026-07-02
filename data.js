const firebaseConfig = {
  apiKey: "AIzaSyD1H3tlWDrH8Lc_gCpRFLVthHoNzIG4dBk",
  authDomain: "comp-database-project.firebaseapp.com",
  databaseURL: "https://comp-database-project-default-rtdb.firebaseio.com",
  projectId: "comp-database-project",
  storageBucket: "comp-database-project.firebasestorage.app",
  messagingSenderId: "1075917190303",
  appId: "1:1075917190303:web:5d86cf30ab33370e3a5eaa",
  measurementId: "G-GGDJMQTZPB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


window.GLOBAL_user = null;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.GLOBAL_user = user;
    console.log("User synced globally:", user.uid);
  } else {
    window.GLOBAL_user = null;
  }
});

// FIXED: Changed the first parameter name to 'gameName' so it matches your if/else checks below
window.saveGameScore = async function(gameName, finalScore) {
  if (!window.GLOBAL_user) {
    console.error(" Cannot save: No authenticated user found.");
    return;
  }

  const userRef = firebase.database().ref('login/users/' + window.GLOBAL_user.uid);

  try {
    const snapshot = await userRef.once('value');
    const userData = snapshot.val() || {};

    let currentGeoDash = userData.GeoDashscore || 0;
    let currentJumpDash = userData.Jumpdashlevelsbeaten || 0;
    let updates = {};

    // This now works perfectly because gameName is defined above!
    if (gameName === 'GeoDash') {
      if (finalScore > currentGeoDash) {
        updates['GeoDashscore'] = finalScore;
        console.log(` New GeoDash High Score: ${finalScore}`);
      }
    } 
    else if (gameName === 'JumpDash') {
      updates['Jumpdashlevelsbeaten'] = currentJumpDash + finalScore;
      console.log(` JumpDash Total Accumulated: ${currentJumpDash + finalScore}`);
    }

    if (Object.keys(updates).length > 0) {
      await userRef.update(updates);
      console.log(" Database successfully synced.");
      
      // Call UI update if the function exists on the current page
      if (typeof window.updateLeaderboardsUI === 'function') {
        window.updateLeaderboardsUI();
      }
    }
  } catch (error) {
    console.error(" Cross-script save failed:", error);
  }
};