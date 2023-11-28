function search() {
    var keyword = document.getElementById("searchInput").value;
    fetch('http://localhost:8080/cars?keyword=' + keyword)
        .then(response => {
            if (response.status !== 200) {
                throw new Error("No cars found");
            }
            return response.json();
        })
        .then(data => {
            var resultsDiv = document.getElementById("searchResults");
            resultsDiv.innerHTML = ""; // Clear previous results

            if (data.length > 0) {
                displayResults(data);
                alert("Search function works!");
            } else {
                // No results found, display a message
                resultsDiv.innerHTML = "Ingen resultater";
            }
        })
        .catch(error => {
            // Display a popup with the error message
            alert(error.message);
        });
}

function displayResults(results) {
    var resultsDiv = document.getElementById("searchResults");

    if (results.length === 0) {
        resultsDiv.innerText = "Ingen resultater";
        return;
    }

    var cardContainer = document.createElement("div");
    cardContainer.className = "card-container";

    results.forEach(result => {
        var resultCard = document.createElement("div");
        resultCard.className = "card";

        var carImage = document.createElement("img");
        carImage.src = result.imagePath || "../images/car.jpg";
        carImage.alt = "Car Image";
        carImage.className = "car-image";

        var contentDiv = document.createElement("div");
        contentDiv.className = "content";

        var carName = document.createElement("h2");
        carName.innerText = result.name;

        var carPrice = document.createElement("p");
        carPrice.innerText = result.price + "kr"; // Use the actual property from your result

        var carDescription = document.createElement("p");
        carDescription.innerText = result.description; // Use the actual property from your result

        var carLink = document.createElement("a");
        carLink.href = ""; // Use the actual link from your result
        carLink.innerText = "Læs Mere";

        contentDiv.appendChild(carName);
        contentDiv.appendChild(carPrice);
        contentDiv.appendChild(carDescription);
        contentDiv.appendChild(carLink);

        resultCard.appendChild(carImage);
        resultCard.appendChild(contentDiv);

        cardContainer.appendChild(resultCard);
    });

    resultsDiv.appendChild(cardContainer);
}
