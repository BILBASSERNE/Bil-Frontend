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
                alert("Bruger oprettet!");
                sessionStorage.setItem("userName", newAccount.userName)
                modal.style.display = "none"
                updateButtonsIfLoggedIn()

            } else {
                alert("Problem med at oprette bruger");
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

        if (!document.getElementById("usernameLogin").checkValidity() || !document.getElementById("passwordLogin").checkValidity()) {
            alert("Du skal bruge både et brugernavn og et kodeord for at logge ind")
        }

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

    const userName = sessionStorage.getItem("userName")

    const userButton = document.createElement("button")
    userButton.textContent = userName

    const logoutBtn = document.createElement("button")
    logoutBtn.textContent = "Log ud"

    userButton.addEventListener("click", function () {
        const editUserModal = document.getElementById("myModal")
        editUserModal.style.display = "block"

        fetchAnyUrl("http://localhost:8080/user/" + userName)
            .then(user => {
                populateEditUserModal(user)
            })
            .catch(error => {
                console.error("An error has occured", error)
            })

    })

    logoutBtn.addEventListener("click", function () {
        sessionStorage.removeItem("userName")
        location.reload()
    })

    buttons.appendChild(userButton)
    buttons.appendChild(logoutBtn)
}

function populateEditUserModal(user) {
    document.getElementById("username").value = user.userName
    document.getElementById("firstname").value = user.firstName

    document.getElementById("lastname").value = user.lastName
    document.getElementById("city").value = user.city
    document.getElementById("phoneNumber").value = user.phoneNumber
    document.getElementById("email").value = user.email

    const createForm = document.getElementById("createForm")

    document.getElementById("submitAccount").remove()

    const editButton = document.createElement("button")
    editButton.textContent = "Ret bruger"

    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Slet bruger"
    deleteButton.style.marginTop = "5px"
    deleteButton.style.backgroundColor = "red"

    createForm.appendChild(editButton)
    createForm.appendChild(deleteButton)

    // EVENTLISTENERS

    deleteButton.addEventListener("click" , function () {
        fetch('http://localhost:8080/user/' + user.userName, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    alert("Your account has been deleted")
                    sessionStorage.removeItem("userName")
                    window.location.reload()
                } else {
                    alert("Something went wrong")
                }
            })
    })

    editButton.addEventListener("click",function (event) {
        event.preventDefault()
        const editedUser = {
            userName: document.getElementById("username").value,
            firstName: document.getElementById("firstname").value,
            password: document.getElementById("password").value,
            lastName: document.getElementById("lastname").value,
            city: document.getElementById("city").value,
            phoneNumber: document.getElementById("phoneNumber").value,
            email: document.getElementById("email").value
        }
        postObjectAsJson("http://localhost:8080/user/" + user.userName, editedUser, 'PUT')
            .then(response => {
                console.log(response)
                if (response.ok) {
                    alert("User has been edited")
                    if (user.userName !== editedUser.userName) {
                        sessionStorage.removeItem("userName")
                        sessionStorage.setItem("userName", editedUser.userName)
                    }
                    window.location.reload()
                } else {
                    alert("Something went wrong while editing")
                }
            })
    })

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

