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
var database = firebase.database()
const auth = firebase.auth();
function register() {
    const name = document.querySelector("#registration-name").value;
    const id = document.querySelector("#registration-id").value;
    const email = document.querySelector("#registration-email").value;
    const password = document.querySelector("#registration-password").value;
    database.ref('users/' + name).set({
        name: name,
        id: id,
        email: email,
        password: password
    })
    if (email.trim() == "") {
        alert("Enter Email");
    } else if (password.trim().length < 7) {
        alert("Password must be at least 7 characters");
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
}
function get() {
    console.log("getting")

    var user_ref = database.ref('users/')
    user_ref.on('value', function (data) {
        var dataa = data.val()
        console.log("111111111111111", dataa.updataDisplayName)
    })
}
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("usernowww", user.name)
        get(user.uid)
        var user_ref = database.ref('users/' + user.name)
        user_ref.on('value', function (snapshot) {
            var data = snapshot.val()
            console.log("6666666666666666", data)
        })
    }
})

