function loadHtml(id, filename) {
  console.log(`div id:${id}, filename:${filename}`);
  let xhttp;
  let element = document.getElementById(id);
  let file = filename;
  if (file) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          element.innerHTML = this.responseText;
        }
        if (this.status == 400) {
          element.innerHTML = "<h1>Page Not Found</h1>";
        }
      }
    };
    //element.innerHTML = this.response;
    xhttp.open("GET", `screens/${file}`, true);
    xhttp.send();
    return;
  }
}
var firebaseConfig = {
  apiKey: "AIzaSyCeP1lZE5z44YyzjoGz1UZAR1raUBeZqPk",
  authDomain: "v001-91065.firebaseapp.com",
  databaseURL: "https://v001-91065-default-rtdb.firebaseio.com",
  projectId: "v001-91065",
  storageBucket: "v001-91065.appspot.com",
  messagingSenderId: "766466343523",
  appId: "1:766466343523:web:bedd4c34b023d874c8ee56",
  measurementId: "G-BVWEHVT6RW",
};
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
//var database = firebase.database()
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
function login() {
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;
  if (email.trim() == "") {
    alert("Enter Email");
  } else if (password.trim() == "") {
    alert("Enter Password");
  } else {
    authenticate(email, password);
  }
}
var AuthId = "";
var database = firebase.database();
function register() {
  const email = document.querySelector("#registration-email").value;
  const reemail = document.querySelector("#registration-reemail").value;
  const password = document.querySelector("#registration-password").value;

  // database.ref('users/' + id).set({
  //     email: email,
  //     name: id,
  //     password: password

  // })
  if (email.trim() == "") {
    alert("Enter Email");
  } else if (password.trim().length < 7) {
    alert("Password must be at least 7 characters");
  } else if (email != reemail) {
    alert("emails do not match");
  } else {
    auth
      .createUserWithEmailAndPassword(email, password)
      //.then
      // Save user here.
      // firebase.database().ref('users/' + user.uid).set({

      //     email: email,
      //     uid: users.user.uid
      // })

      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
    console.log("REgistered");
  }
  delay(1000).then(() => authenticate(email, password));
  var v = document.getElementById("home");
  v.style.display = "none";
  var v = document.getElementById("forms-out");
  v.style.display = "none";
  var v = document.getElementById("top-stats");
  v.style.display = "none";
  var v = document.getElementById("navbar");
  v.style.display = "none";
  var v = document.getElementById("details-page");
  v.style.display = "block";

  // database.ref('users/' + id).set({
  //     email: email,
  //     name: id,
  //     password: password

  // })
}
function authenticate(email, password) {
  auth.signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}
function showLogin() {
  //var v = document.getElementById("registration-page"); v.style.display = "none";
  var v = document.getElementById("registration-page");
  v.style.display = "none";
  var v = document.getElementById("login-page");
  v.style.display = "block";
}
function showRegister() {
  // document.getElementById("#registration-page").classList.remove(".hide");
  // document.getElementById("#login-page").classList.add(".hide");
  var v = document.getElementById("registration-page");
  v.style.display = "block";
  var v = document.getElementById("login-page");
  v.style.display = "none";
}
function submitDetails() {
  firebase.auth().currentUser.updateProfile({
    displayName: document.getElementById("user-name").value,
  });
  const AuthId = firebase.auth().currentUser.uid;
  const ID = document.querySelector("#user-id").value;
  const name = document.querySelector("#user-name").value;
  firebase
    .database()
    .ref("users/" + AuthId)
    .set({
      Name: name,
      UserId: ID,
      health: 360,
      Level: 0,
      Money: 0,
      EXP: 0,
    });

  var v = document.getElementById("home");
  v.style.display = "block";
  var v = document.getElementById("menu");
  v.style.display = "block";

  var v = document.getElementById("forms-out");
  v.style.display = "none";
  var v = document.getElementById("top-stats");
  v.style.display = "block";
  var v = document.getElementById("navbar");
  v.style.display = "block";
  var v = document.getElementById("details-page");
  v.style.display = "none";
}
function updateLog() {
  u = firebase.auth().currentUser.displayName; //FirebaseAuth.getInstance().getCurrentUser().getUid()
  console.log("after change:", u);
}

auth.onAuthStateChanged((firebaseUser) => {
  console.log("hello", firebaseUser.displayName);
  if (firebaseUser.displayName == null) {
    var v = document.getElementById("home");
    v.style.display = "none";
    var v = document.getElementById("forms-out");
    v.style.display = "none";
    var v = document.getElementById("top-stats");
    v.style.display = "none";
    var v = document.getElementById("navbar");
    v.style.display = "none";
    var v = document.getElementById("details-page");
    v.style.display = "block";
  }
  // u = firebase.auth().currentUser;//FirebaseAuth.getInstance().getCurrentUser().getUid()
  // console.log("after change:", u.uid)
  else {
    a = "hi";
    if (firebaseUser) {
      console.log("Loged In");
      a = "hello";
      console.log(a);
      console.log(firebaseUser);

      var v = document.getElementById("home");
      v.style.display = "block";

      var v = document.getElementById("menuitems");
      v.style.display = "none";
      var v = document.getElementById("forms-out");
      v.style.display = "none";
      var v = document.getElementById("top-stats");
      v.style.display = "block";
      var v = document.getElementById("navbar");
      v.style.display = "block";
      var v = document.getElementById("details-page");
      v.style.display = "none";
    }
  }
  var AuthId = firebaseUser.uid;
  window.localStorage.setItem("useruid", AuthId);
  b = window.localStorage.getItem("useruid");
  console.log("AuthId", b);
  var id = "hello";
  if (firebaseUser) {
    var AuthId = firebaseUser.uid;
    console.log("ifTrue", AuthId);
    var ref = firebase.database().ref();
    ref.on(
      "value",
      function (snapshot) {
        data = snapshot.val().users;
        list = [data];
        console.log("list", list);
        id = data[AuthId].UserId;
        console.log("all", id);
        health = data[AuthId].health;
        Money = data[AuthId].Money;
        Level = data[AuthId].Level;
        EXP = data[AuthId].EXP;
        console.log("Health", health);
        window.localStorage.setItem("userID", id);
        document.getElementById("display_id").innerText = "ID: " + id;
        // document.getElementById("healthbar").value = health;
        document.getElementById("totalhealth").innerText = health + "/360";
        document.getElementById("Money").innerText = "Money:$ " + Money;
        document.getElementById("level").innerText =
          "Level: " + Level + " (" + EXP + " /10000)";
        if (Number(Level) == 2) {
          var v = document.getElementById("home");
          v.style.display = "none";
          var v = document.getElementById("CCity");
          v.style.display = "block";
          var v = document.getElementById("log");
          v.style.display = "none";
          var v = document.getElementById("chat");
          v.style.display = "none";
          var v = document.getElementById("mysystem");
          v.style.display = "none";
          var v = document.getElementById("crew");
          v.style.display = "none";
          var v = document.getElementById("place1div");
          v.style.display = "none";

          document.getElementById("place1").removeAttribute("onclick");

          console.log("LLLL" + Number(Level));
          var v = document.getElementById("place1");
          v.innerHTML = "COMPLETED";
        }
      },
      function (error) {
        console.log("Error: " + error.code);
      }
    );

    return id;
  }
  console.log("out of if", id);
  b = window.localStorage.getItem("useruid");
});

function print() {
  console.log("AuthId", b);
}
function settings() {
  var v = document.getElementById("place1div");
  v.style.display = "none";
  var v = document.getElementById("home");
  v.style.display = "none";
  var v = document.getElementById("crew");
  v.style.display = "none";
  var v = document.getElementById("CCity");
  v.style.display = "none";
  var v = document.getElementById("log");
  v.style.display = "none";
  var v = document.getElementById("chat");
  v.style.display = "none";
  var v = document.getElementById("mysystem");
  v.style.display = "none";
  var v = document.getElementById("forms-out");
  v.style.display = "none";
  var v = document.getElementById("top-stats");
  v.style.display = "none";
  var v = document.getElementById("navbar");
  v.style.display = "none";
  var v = document.getElementById("settings");
  v.style.display = "block";
}
function backtohome() {
  var v = document.getElementById("place1div");
  v.style.display = "none";
  var v = document.getElementById("home");
  v.style.display = "block";
  var v = document.getElementById("crew");
  v.style.display = "none";
  var v = document.getElementById("CCity");
  v.style.display = "none";
  var v = document.getElementById("log");
  v.style.display = "none";
  var v = document.getElementById("chat");
  v.style.display = "none";
  var v = document.getElementById("mysystem");
  v.style.display = "none";
  var v = document.getElementById("forms-out");
  v.style.display = "none";
  var v = document.getElementById("top-stats");
  v.style.display = "block";
  var v = document.getElementById("navbar");
  v.style.display = "block";
  var v = document.getElementById("settings");
  v.style.display = "none";
}
function mysystem() {
  a = window.localStorage.getItem("userID");
  document.getElementById("displayid").innerText = "ID: " + a;
  var v = document.getElementById("place1div");
  v.style.display = "none";
  var v = document.getElementById("home");
  v.style.display = "none";
  var v = document.getElementById("crew");
  v.style.display = "none";
  var v = document.getElementById("CCity");
  v.style.display = "none";
  var v = document.getElementById("log");
  v.style.display = "none";
  var v = document.getElementById("chat");
  v.style.display = "none";
  var v = document.getElementById("mysystem");
  v.style.display = "block";
}
function crew() {
  var v = document.getElementById("place1div");
  v.style.display = "none";
  var v = document.getElementById("home");
  v.style.display = "none";
  var v = document.getElementById("CCity");
  v.style.display = "none";
  var v = document.getElementById("log");
  v.style.display = "none";
  var v = document.getElementById("chat");
  v.style.display = "none";
  var v = document.getElementById("mysystem");
  v.style.display = "none";
  var v = document.getElementById("crew");
  v.style.display = "block";
}
function CCity() {
  var v = document.getElementById("home");
  v.style.display = "none";
  var v = document.getElementById("CCity");
  v.style.display = "block";
  var v = document.getElementById("log");
  v.style.display = "none";
  var v = document.getElementById("chat");
  v.style.display = "none";
  var v = document.getElementById("mysystem");
  v.style.display = "none";
  var v = document.getElementById("crew");
  v.style.display = "none";
  var v = document.getElementById("place1div");
  v.style.display = "none";
}
function log() {
  var v = document.getElementById("place1div");
  v.style.display = "none";
  var v = document.getElementById("home");
  v.style.display = "none";
  var v = document.getElementById("CCity");
  v.style.display = "none";
  var v = document.getElementById("log");
  v.style.display = "block";
  var v = document.getElementById("chat");
  v.style.display = "none";
  var v = document.getElementById("mysystem");
  v.style.display = "none";
  var v = document.getElementById("crew");
  v.style.display = "none";
}
function chat() {
  var v = document.getElementById("place1div");
  v.style.display = "none";
  var v = document.getElementById("home");
  v.style.display = "none";
  var v = document.getElementById("CCity");
  v.style.display = "none";
  var v = document.getElementById("log");
  v.style.display = "none";
  var v = document.getElementById("chat");
  v.style.display = "block";
  var v = document.getElementById("mysystem");
  v.style.display = "none";
  var v = document.getElementById("crew");
  v.style.display = "none";
}
function home() {
  var v = document.getElementById("place1div");
  v.style.display = "none";
  var v = document.getElementById("home");
  v.style.display = "block";
  var v = document.getElementById("CCity");
  v.style.display = "none";
  var v = document.getElementById("log");
  v.style.display = "none";
  var v = document.getElementById("chat");
  v.style.display = "none";
  var v = document.getElementById("mysystem");
  v.style.display = "none";
  var v = document.getElementById("crew");
  v.style.display = "none";
  var v = document.getElementById("menuitems");
  v.style.display = "none";
  var v = document.getElementById("menu");
  v.style.display = "block";
}
function signOut() {
  window.localStorage.clear();
  firebase
    .auth()
    .signOut()
    .then(function () {
      location.reload();
    })
    .catch(function (error) {
      alert("error signing out, check CCity connection");
    });
}

// register when you hit the enter key
document
  .querySelector("#registration-password")
  .addEventListener("keyup", (e) => {
    if (event.keyCode === 13) {
      e.preventDefault();

      register();
    }
  });
document.querySelector("#forgot-password").addEventListener("click", () => {
  const email = document.querySelector("#login-email").value;
  if (email.trim() == "") {
    alert("Enter Email");
  } else {
    forgotPassword(email);
  }
});

const forgotPassword = (email) => {
  auth
    .sendPasswordResetEmail(email)
    .then(function () {
      alert("email sent");
    })
    .catch(function (error) {
      alert("invalid email or bad CCity connection");
    });
};

function get() {
  console.log("getting");
  // var text = "Hello Dolly.";
  // document.getElementById("display_id").innerHTML = "New text!";
  //document.getElementById("display_id").innerHTML = text;
  // var user_ref = database.ref('users/' + id)
  // user_ref.on('value', function (snapshot) {
  //     var data = snapshot.val()
  //     console.log(data.id)
  // })
}
//const rootRef = database.ref('users');

// ------------------------------------//

//Check if signed in
//firebase.auth().onAuthStateChanged(function (user) {
//    if (user) {
//        console.log("usernowww", user)
//        currentU = firebase.auth().currentUser
//        console.log("****", currentU)
//        database.ref('users/' + user.uid.name).on("value", snap => {
//            console.log("----", snap.val())

//        })
//        console.log(user.name)
// User is signed in.

//        database.ref('/users/' + user.name).on('value')
//            .then(function (snapshot) {
//                console.log(snapshot.val)
//               document.getElementById("display_id").innerText = snapshot.val().name;
//          })
//} else {
//  console.log("no data")
//}
//});

function sendMessage() {
  sender = window.localStorage.getItem("userID");

  var message = document.getElementById("message").value;
  firebase.database().ref("messages").push().set({
    sender: sender,
    message: message,
  });
  document.getElementById("message").value = "";
  return false;
}
firebase
  .database()
  .ref("messages")
  .on("child_added", function (snapshot) {
    var html = "";
    html += "<li>";
    html +=
      "<b >" + snapshot.val().sender + "</b>" + " : " + snapshot.val().message;
    html += "</li>";

    document.getElementById("messages").innerHTML += html;
  });
//city //

function openplace1() {
  var v = document.getElementById("home");
  v.style.display = "none";
  var v = document.getElementById("CCity");
  v.style.display = "none";
  var v = document.getElementById("log");
  v.style.display = "none";
  var v = document.getElementById("chat");
  v.style.display = "none";
  var v = document.getElementById("mysystem");
  v.style.display = "none";
  var v = document.getElementById("crew");
  v.style.display = "none";
  var v = document.getElementById("place1div");
  v.style.display = "block";
}
function opentarget1() {
  var x = document.getElementById("target1");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  var v = document.getElementById("targets");
  v.style.display = "none";
}

document
  .getElementById("closetarget1")
  .addEventListener("click", function handleClick(event) {
    // 👇️ "parent"
    console.log(event.target.parentElement.id);
    id = event.target.parentElement.id;
    document.getElementById(id).style.display = "none";
    var v = document.getElementById("targets");
    v.style.display = "block";
  });
function opentarget2() {
  var x = document.getElementById("target2");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  var v = document.getElementById("targets");
  v.style.display = "none";
}
document
  .getElementById("closetarget2")
  .addEventListener("click", function handleClick(event) {
    // 👇️ "parent"
    console.log(event.target.parentElement.id);
    id = event.target.parentElement.id;
    document.getElementById(id).style.display = "none";
    var v = document.getElementById("targets");
    v.style.display = "block";
  });
function opentarget3() {
  var x = document.getElementById("target3");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  var v = document.getElementById("targets");
  v.style.display = "none";
}

document
  .getElementById("closetarget3")
  .addEventListener("click", function handleClick(event) {
    // 👇️ "parent"
    console.log(event.target.parentElement.id);
    id = event.target.parentElement.id;
    document.getElementById(id).style.display = "none";
    var v = document.getElementById("targets");
    v.style.display = "block";
  });
function opentarget4() {
  var x = document.getElementById("target4");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  var v = document.getElementById("targets");
  v.style.display = "none";
}

document
  .getElementById("closetarget4")
  .addEventListener("click", function handleClick(event) {
    // 👇️ "parent"
    console.log(event.target.parentElement.id);
    id = event.target.parentElement.id;
    document.getElementById(id).style.display = "none";
    var v = document.getElementById("targets");
    v.style.display = "block";
  });
function opentarget5() {
  var x = document.getElementById("target5");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  var v = document.getElementById("targets");
  v.style.display = "none";
}

document
  .getElementById("closetarget5")
  .addEventListener("click", function handleClick(event) {
    // 👇️ "parent"
    console.log(event.target.parentElement.id);
    id = event.target.parentElement.id;
    document.getElementById(id).style.display = "none";
    var v = document.getElementById("targets");
    v.style.display = "block";
  });

//city //
// home page-------------------------------------------------------------------------------------------------------------------------------------
function attack(clickedid, idd) {
  console.clear();
  deduct = 70;
  firebase
    .database()
    .ref()
    .on(
      "value",
      function (snapshot) {
        data = snapshot.val().users;
        list = [data];
        console.log("list111", list);
        healthfromdata = data[b].health;
        console.log("all1111", healthfromdata);
        m = data[b].Money;
        Oexp = data[b].EXP;
        level = data[b].Level;
        console.log("money is:" + m);
        console.log(typeof m);
      },
      function (error) {
        console.log("Error: " + error.code);
      }
    );

  if (healthfromdata > deduct) {
    realhealth = healthfromdata - deduct;
    console.log(realhealth);
    var amount = document.getElementById(clickedid).innerHTML;
    newamount = Number(m) + Number(amount);
    var exp = document.getElementById(idd).innerHTML;
    console.log("kkk" + exp);
    Uexp = Number(Oexp) + Number(exp);
    console.log("UPADTEEXP=" + Uexp);
    firebase
      .database()
      .ref("users/" + b)
      .update({ health: realhealth, Money: newamount, EXP: Uexp });
    if (Uexp >= 10000) {
      console.log("LEVELD UP");
      alert("LEVELED UP");
      newlevel = Number(level) + 1;
      exp = 0;
      firebase
        .database()
        .ref("users/" + b)
        .update({ Level: newlevel, EXP: exp });
    }

    // healthfromdata = id;
  } else {
    alert("no Health");
  }
}
function openBC() {
  var v = document.getElementById("menu");
  v.style.display = "none";
  var v = document.getElementById("menuitems");
  v.style.display = "block";
  var v = document.getElementById("blackCity");
  v.style.display = "block";
  var v = document.getElementById("shop");
  v.style.display = "none";
  var v = document.getElementById("market");
  v.style.display = "none";
  var v = document.getElementById("pets");
  v.style.display = "none";
  var v = document.getElementById("inventory");
  v.style.display = "none";
  var v = document.getElementById("collections");
  v.style.display = "none";
  var v = document.getElementById("news");
  v.style.display = "none";
  var v = document.getElementById("rank");
  v.style.display = "none";
}
function openS() {
  var v = document.getElementById("menu");
  v.style.display = "none";
  var v = document.getElementById("menuitems");
  v.style.display = "block";
  var v = document.getElementById("blackCity");
  v.style.display = "none";
  var v = document.getElementById("shop");
  v.style.display = "block";
  var v = document.getElementById("market");
  v.style.display = "none";
  var v = document.getElementById("pets");
  v.style.display = "none";
  var v = document.getElementById("inventory");
  v.style.display = "none";
  var v = document.getElementById("collections");
  v.style.display = "none";
  var v = document.getElementById("news");
  v.style.display = "none";
  var v = document.getElementById("rank");
  v.style.display = "none";
}
function openM() {
  var v = document.getElementById("menu");
  v.style.display = "none";
  var v = document.getElementById("menuitems");
  v.style.display = "block";
  var v = document.getElementById("blackCity");
  v.style.display = "none";
  var v = document.getElementById("shop");
  v.style.display = "none";
  var v = document.getElementById("market");
  v.style.display = "block";
  var v = document.getElementById("pets");
  v.style.display = "none";
  var v = document.getElementById("inventory");
  v.style.display = "none";
  var v = document.getElementById("collections");
  v.style.display = "none";
  var v = document.getElementById("news");
  v.style.display = "none";
  var v = document.getElementById("rank");
  v.style.display = "none";
}
function openP() {
  var v = document.getElementById("menu");
  v.style.display = "none";
  var v = document.getElementById("menuitems");
  v.style.display = "block";
  var v = document.getElementById("blackCity");
  v.style.display = "none";
  var v = document.getElementById("shop");
  v.style.display = "none";
  var v = document.getElementById("market");
  v.style.display = "none";
  var v = document.getElementById("pets");
  v.style.display = "block";
  var v = document.getElementById("inventory");
  v.style.display = "none";
  var v = document.getElementById("collections");
  v.style.display = "none";
  var v = document.getElementById("news");
  v.style.display = "none";
  var v = document.getElementById("rank");
  v.style.display = "none";
}
function openI() {
  var v = document.getElementById("menu");
  v.style.display = "none";
  var v = document.getElementById("menuitems");
  v.style.display = "block";
  var v = document.getElementById("blackCity");
  v.style.display = "none";
  var v = document.getElementById("shop");
  v.style.display = "none";
  var v = document.getElementById("market");
  v.style.display = "none";
  var v = document.getElementById("pets");
  v.style.display = "none";
  var v = document.getElementById("inventory");
  v.style.display = "block";
  var v = document.getElementById("collections");
  v.style.display = "none";
  var v = document.getElementById("news");
  v.style.display = "none";
  var v = document.getElementById("rank");
  v.style.display = "none";
}
function openC() {
  var v = document.getElementById("menu");
  v.style.display = "none";
  var v = document.getElementById("menuitems");
  v.style.display = "block";
  var v = document.getElementById("blackCity");
  v.style.display = "none";
  var v = document.getElementById("shop");
  v.style.display = "none";
  var v = document.getElementById("market");
  v.style.display = "none";
  var v = document.getElementById("pets");
  v.style.display = "none";
  var v = document.getElementById("inventory");
  v.style.display = "none";
  var v = document.getElementById("collections");
  v.style.display = "block";
  var v = document.getElementById("news");
  v.style.display = "none";
  var v = document.getElementById("rank");
  v.style.display = "none";
}
function openN() {
  var v = document.getElementById("menu");
  v.style.display = "none";
  var v = document.getElementById("menuitems");
  v.style.display = "block";
  var v = document.getElementById("blackCity");
  v.style.display = "none";
  var v = document.getElementById("shop");
  v.style.display = "none";
  var v = document.getElementById("market");
  v.style.display = "none";
  var v = document.getElementById("pets");
  v.style.display = "none";
  var v = document.getElementById("inventory");
  v.style.display = "none";
  var v = document.getElementById("collections");
  v.style.display = "none";
  var v = document.getElementById("news");
  v.style.display = "block";
  var v = document.getElementById("rank");
  v.style.display = "none";
}
function openR() {
  var v = document.getElementById("menu");
  v.style.display = "none";
  var v = document.getElementById("menuitems");
  v.style.display = "block";
  var v = document.getElementById("blackCity");
  v.style.display = "none";
  var v = document.getElementById("shop");
  v.style.display = "none";
  var v = document.getElementById("market");
  v.style.display = "none";
  var v = document.getElementById("pets");
  v.style.display = "none";
  var v = document.getElementById("inventory");
  v.style.display = "none";
  var v = document.getElementById("collections");
  v.style.display = "none";
  var v = document.getElementById("news");
  v.style.display = "none";
  var v = document.getElementById("rank");
  v.style.display = "block";
}
// home page------------------------------------------------------------------------------------------------------------------------------------
//--------------joy boy-------------

const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

//---------------
