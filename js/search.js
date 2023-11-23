function search() {
    var keyword = document.getElementById("searchInput").value;
    fetch('http://localhost:8080/cars?keyword=' + keyword)
        .then(response => response.json())
        .then(data => displayResults(data));
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