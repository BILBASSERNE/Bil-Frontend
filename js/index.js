document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
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
        console.log(response)
        return response
    }


});