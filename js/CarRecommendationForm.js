
const url = "http://localhost:8080/chat"; // Update the URL to match your backend endpoint

document.addEventListener("DOMContentLoaded", function () {

    var chatModal = document.getElementById("gptModal");
    var chatBtn = document.getElementById("chatBtn")
    const closeBtn = document.getElementById("closeBtn")

    chatBtn.onclick = function () {
        chatModal.style.display = "block";
    }

    closeBtn.onclick = function () {
        chatModal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == chatModal) {
            chatModal.style.display = "none";
        }
    }

    const form = document.getElementById("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Gather data from the form elements
        const moviesAndActors = document.getElementById('multi-line-input').value;

        // Create a JavaScript object with just the requestValue
        const request = {
            moviesAndActors: moviesAndActors,
            //requestValue: requestValue
        };

        const response = await fetch(url + "/" + request.moviesAndActors)
        const data = await response.json()
        document.getElementById("answerBox").value = data[0].message.content


    });
});






