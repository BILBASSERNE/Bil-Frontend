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
        .catch(error => {
            alert(error.message);
        });
}

function displayResults(results) {
    var resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = "";

    if (results.length === 0) {
        var noResultsMessage = document.createElement("p");
        noResultsMessage.innerText = "Ingen resultater";
        resultsDiv.appendChild(noResultsMessage);
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
        carLink.href = "";
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