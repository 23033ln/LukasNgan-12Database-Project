var GLOBAL_user;
var authenticationListener; 

function fb_login() {
  authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
}

// to check if the user is logged in
async function fb_handleLogin(_user) {
  if (_user) {
    GLOBAL_user = _user;
    console.log("User is logged in");
    
    let Name = prompt("whats your name");
    // FIXED: Changed 'name' to 'Name' to prevent undefined variable crash
    let Username = prompt("What do you want to be your username " + Name);
    
    // FIXED: Set default starter scores so the script doesn't crash on undefined variables
    let Jumpdashlevelsbeaten = 0;
    let GeoDashscore = 0;

    // FIXED: Combined all updates into one efficient block and fixed the path to match the leaderboard
    await firebase.database().ref('login/users/' + GLOBAL_user.uid).update({
        name: GLOBAL_user.displayName || Name, 
        Username: Username, 
        Jumpdashlevelsbeaten: Jumpdashlevelsbeaten, 
        GeoDashscore: GeoDashscore,
        email: GLOBAL_user.email,
        profile: GLOBAL_user.photoURL
    });

    await firebase.database().ref('login/users/' + GLOBAL_user.uid).push({
        name: GLOBAL_user.displayName || Name,
        email: GLOBAL_user.email,
        loginTime: firebase.database.ServerValue.TIMESTAMP
    });

  } else {
    console.log("User is NOT logged in - Starting the popup process");
    fb_popupLogin();
  }
}

// to have the user login
function fb_popupLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user;
    console.log("User has logged in");
  }).catch((error) => {
    console.error("Login failed: ", error);
  });
}

// Fixed variable declaration
var highscoreTable = {
  JumpDash: {
    users: { lukas: 10, Coby: 5, Pasha: 6, Josh: 9, Callum: 4 }
  },
  GeoDash: {
    users: { lukas: 1700, coby: 240, pasha: 500, josh: 2012, callum: 1923 }
  }
};

firebase.database().ref('/').update(highscoreTable);

// LEADERBOARD RENDERER
async function updateLeaderboardUI() {
  // PATH FIXED: Now correctly matches the location where users are saved
  const usersRef = firebase.database().ref('login/users');
  
  try {
    const snapshot = await usersRef.orderByChild('GeoDashscore').limitToLast(5).once('value');
    
    const tableBody = document.getElementById('leaderboardRows');
    if (!tableBody) return; // Prevent crashes if HTML element isn't loaded yet
    tableBody.innerHTML = "";

    let leaderboardData = [];
    
    snapshot.forEach((childSnapshot) => {
      const userData = childSnapshot.val();
      
      if (userData.GeoDashscore !== undefined) {
        leaderboardData.push({
          username: userData.Username || userData.name || "Anonymous Player",
          score: userData.GeoDashscore
        });
      }
    });

    leaderboardData.reverse();

    if (leaderboardData.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; padding:10px;">No scores recorded yet!</td></tr>`;
      return;
    }

    leaderboardData.forEach((player, index) => {
      let rank = index + 1;
      
      // FIXED: Added back the Rank cell so it aligns with 3-column HTML tables
      let row = `
        <tr>
          <td style="padding: 8px;"><b>#${rank}</b></td>
          <td style="padding: 8px;">${player.username}</td>
          <td style="padding: 8px;">${player.score.toLocaleString()}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });

  } catch (error) {
    console.error("Failed to load leaderboard data: ", error);
    document.getElementById('leaderboardRows').innerHTML = `
      <tr><td colspan="3" style="text-align:center; color:red; padding:10px;">Error loading leaderboard.</td></tr>
    `;
  }
}