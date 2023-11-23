document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("createButton");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const city = document.getElementById("city");
    const phoneNumber = document.getElementById("phoneNumber");
    const email = document.getElementById("email");
    const submitNewAccount = document.getElementById("submitAccount")

    submitNewAccount.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const newAccount = {
            userName: username.value,
            password: password.value,
            firstName: firstname.value,
            lastName: lastname.value,
            city: city.value,
            phoneNumber: phoneNumber.value,
            email: email.value
        };

        const postUrl = "http://localhost:8080/register";


        try {
            const response = await postObjectAsJson(postUrl, newAccount, "POST");
            console.log("inside postCustomer");

            if (response.ok) {
                alert("Account Created!");
            } else {
                alert("Error creating account");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

});


document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginButton");
    loginBtn.addEventListener("click", openLoginModal);

    function openLoginModal() {
        document.getElementById("loginModal").style.display = "block";
    }

    const closeModalBtn = document.getElementById("closeLoginModal")
    closeModalBtn.addEventListener("click", closeLoginModal);

    function closeLoginModal() {
        document.getElementById("loginModal").style.display = "none"
    }

    const userName = document.getElementById("usernameLogin")
    const password = document.getElementById("passwordLogin")
    const submitLogin = document.getElementById("submitLogin")

    submitLogin.addEventListener("click", async function (event) {
        event.preventDefault()

        const userLogin = {
            userName: userName.value,
            password: password.value
        };

        const postLogin = "http://localhost:8080/authenticate"

        try {
            const response = await postObjectAsJson(postLogin, userLogin, "POST")

            if (response.ok) {
                console.log("logged in")

                closeLoginModal()
                sessionStorage.setItem("userName", userLogin.userName)
                updateButtonsIfLoggedIn()

            } else {
                console.log("failed")
            }

        } catch (error) {
            console.log("Error:", error)
        }

    })

});

// CHECK IF USER IS LOGGED IN ON REFRESH
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = sessionStorage.getItem("userName")

    if (loggedInUser) {
        updateButtonsIfLoggedIn()
    }

})

function updateButtonsIfLoggedIn() {

    const buttons = document.getElementById("buttons")

    if (buttons) {
        buttons.innerHTML = "";
    }

    const logoutBtn = document.createElement("button")
    logoutBtn.textContent = "Log ud"

    logoutBtn.addEventListener("click", function () {
        sessionStorage.removeItem("userName")
        location.reload()
    })

    buttons.appendChild(logoutBtn)
}

async function postObjectAsJson(url, object, httpVerbum) {
    const objectAsJsonString = JSON.stringify(object)
    console.log(objectAsJsonString)
    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    }
    const response = await fetch(url, fetchOptions)
    return response
}
