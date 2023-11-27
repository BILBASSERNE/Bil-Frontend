function search() {
    var keyword = document.getElementById("searchInput").value;
    fetch('http://localhost:8080/cars?keyword=' + keyword)
        .then(response => {
            if (!response.ok) {
                throw new Error("No cars found");
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                displayResults(data);
                alert("Search function works!");
            } else {
                throw new Error("No cars found");
            }
        })
        .catch(error => displayErrorMessage(error.message));
}

function displayResults(results) {
    var resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = ""; // Clear previous results

    results.forEach(result => {
        var resultDiv = document.createElement("div");
        resultDiv.textContent = result.name; // Display the name of the car
        resultsDiv.appendChild(resultDiv);
    });
}

function displayErrorMessage(message) {
    var resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = "<div>" + message + "</div>";
}
