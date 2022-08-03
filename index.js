function loadHtml(id, filename) {
    console.log(`div id:${id}, filename:${filename}`)
    let xhttp;
    let element = document.getElementById(id);
    let file = filename;
    if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) { element.innerHTML = this.responseText; }
                if (this.status == 400) { element.innerHTML = "<h1>Page Not Found</h1>" }
            }
        }
        //element.innerHTML = this.response;
        xhttp.open("GET", `screens/${file}`, true);
        xhttp.send();
        return;
    }
}

//invokes firebase authentication. 

var firebaseConfig = {
    apiKey: "AIzaSyCeP1lZE5z44YyzjoGz1UZAR1raUBeZqPk",
    authDomain: "v001-91065.firebaseapp.com",
    projectId: "v001-91065",
    storageBucket: "v001-91065.appspot.com",
    messagingSenderId: "766466343523",
    appId: "1:766466343523:web:bedd4c34b023d874c8ee56",
    measurementId: "G-BVWEHVT6RW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
document.querySelector("#show-register").addEventListener("click", () => {
    showRegistration();
});

const showRegistration = () => {
    document.querySelector("#registration-page").classList.remove("hide");
    document.querySelector("#login-page").classList.add("hide");
    //document.querySelector("#homepage").classList.add("hide");
};

document.querySelector("#show-login").addEventListener("click", () => {
    showLogin();
});

const showLogin = () => {
    document.querySelector("#registration-page").classList.add("hide");
    document.querySelector("#login-page").classList.remove("hide");
    document.querySelector("#homepage").classList.add("hide");
};

// document.querySelector("#signout").addEventListener("click", () => {
//     signOut();
// });
var database = firebase.database()
const register = () => {
    const name = document.querySelector("#registration-id").value;
    const email = document.querySelector("#registration-email").value;
    const reemail = document.querySelector("#registration-reemail").value;
    const password = document.querySelector("#registration-password").value;
    database.ref('users/' + name).set({
        email: email,
        name: name,
        password: password


    })
    if (email.trim() == "") {
        alert("Enter Email");
    } else if (password.trim().length < 7) {
        alert("Password must be at least 7 characters");
    } else if (email != reemail) {
        alert("emails do not match");
    } else {
        auth
            .createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
                // ...

            });


    }

};

document.querySelector("#register").addEventListener("click", () => {
    register();
});

//register when you hit the enter key
document
    .querySelector("#registration-password")
    .addEventListener("keyup", (e) => {
        if (event.keyCode === 13) {
            e.preventDefault();

            register();
        }
    });

const login = () => {
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    if (email.trim() == "") {
        alert("Enter Email");
    } else if (password.trim() == "") {
        alert("Enter Password");
    } else {
        authenticate(email, password);
    }
};

document.querySelector("#login").addEventListener("click", () => {
    login();
});

//sign in when you hit enter
document
    .querySelector("#login-password")
    .addEventListener("keyup", (e) => {
        if (event.keyCode === 13) {
            e.preventDefault();

            login();
        }
    });

const authenticate = (email, password) => {
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password);
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });

};

const showHomepage = () => {
    //document.querySelector("#registration-page").classList.add("hide");
    //document.querySelector("#login-page").classList.add("hide");
    //document.querySelector("#homepage").classList.remove("hide");
    loadHtml("body", "home.html")
};

const signOut = () => {
    firebase
        .auth()
        .signOut()
        .then(function () {
            location.reload();
        })
        .catch(function (error) {
            alert("error signing out, check network connection");
        });
};

auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
        showHomepage();
    }
});

document
    .querySelector("#forgot-password")
    .addEventListener("click", () => {
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
            alert("invalid email or bad network connection");
        });
};


function get() {
    console.log("getting")

    var user_ref = database.ref('users/' + id)
    user_ref.on('value', function (snapshot) {
        var data = snapshot.val()
        console.log(data.id)
    })
}
const rootRef = database.ref('users');

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

var ref = firebase.database().ref();
ref.on("value", function (snapshot) {
    data = snapshot.val().users
    list = [data]
    console.log("all", data);
    console.log("list", list)
}, function (error) {
    console.log("Error: " + error.code);
});
