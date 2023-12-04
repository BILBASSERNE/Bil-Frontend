// import {fetchAnyUrl} from "js/modulejson.js"

// import {postObjectAsJson} from "js/modulejson.js";

const urlBase = "http://localhost:8080/bilbassen";

async function insertCarCards(carAdvertisement) {
    const carCardDiv = document.createElement("div")
    carCardDiv.className = "card"
    carCardDiv.setAttribute("data-id", carAdvertisement.id)
    console.log(carAdvertisement.id)

    const carImage = document.createElement("img")
    carImage.className = "car-image"
    carImage.setAttribute("src", "../images/car.jpg")
    carImage.setAttribute("alt", "Car Image")

    const carContent = document.createElement("div")
    carContent.className = "content"

    const carName = document.createElement('h2');
    carName.innerText = carAdvertisement.name;

    const carPrice = document.createElement("p")
    carPrice.innerText = carAdvertisement.price + "kr"

    const favoriteButton = document.createElement("button")
    favoriteButton.innerText = "";
    favoriteButton.classList.add("favorite-button");

    favoriteButton.addEventListener("click", async() => {
        console.log("favoriteButton is clicked")

        const carId = carAdvertisement.id;
        const userName = sessionStorage.getItem("userName");

        const favoriteObject = {
            carAdvertisement: carId,
            userName: userName
        }

        const favoriteUrl = "http://localhost:8080/favorite" + "/" + carId +  "/" + userName;

        console.log(favoriteObject)
        const response = await postObjectAsJson(favoriteUrl, favoriteObject, "POST")
        console.log(response)

        if (response.ok) {
            alert("Bil er tilføjet til favoritter!")
        } else {
            const errorText = await response.text()
            console.log(errorText)
            alert("Bil kunne ikke tilføjes til favoritter")
        }

    });

    const carLink = document.createElement("a")

    carLink.addEventListener("click", function () {
        localStorage.setItem("carId", carAdvertisement.id)
        window.document.location = "showcars.html"

    })
    carLink.innerText = "Læs Mere"

    localStorage.setItem("carId", carAdvertisement.id)


    carCardDiv.appendChild(carImage)

    carContent.appendChild(carName)
    carContent.appendChild(carPrice)
    carContent.appendChild(carLink)
    carContent.appendChild(favoriteButton)

    carCardDiv.appendChild(carContent)

    const cardContainer = document.querySelector('.card-container');
    cardContainer.appendChild(carCardDiv);
}

function redirectToCarAdvertisementPage() {
    const userName = sessionStorage.getItem("userName");

    if (!userName) {
        alert("Please log in to view favorites.");
        return;
    }

    fetchCarAdvertisements();
}

async function fetchCarAdvertisements() {
    const userName = sessionStorage.getItem("userName");

    if (!userName) {
        console.error("User not logged in.");
        return;
    }

    const url = "http://localhost:8080/annoncer/" + userName;
    const response = await fetch(url);

    if (response.ok) {
        const myAdvertisedCars = await response.json();
        displayMyAdvertisedCars(myAdvertisedCars);
    } else {
        console.error("Error fetching cars.");
    }
}

function displayMyAdvertisedCars(myAdvertisedCars) {
    const myAdvertisedCarsContainer = document.getElementById("cars-container");
    myAdvertisedCarsContainer.innerHTML = ""; // Clear existing content

    myAdvertisedCars.forEach(car => {
        insertCarCards(car); // Assuming insertCarCards is a function to create card elements
    });
}


let cars = []

async function fetchCars() {
    cars = await fetchAnyUrl(urlBase);
    console.log(typeof cars); // Log the type of cars
    cars.forEach(insertCarCards);
}

function actionGetCars() {
    fetchCars()
}

function fetchAnyUrl(url) {
    return  fetch(url).then(response => response.json());
}

document.addEventListener("DOMContentLoaded", actionGetCars)