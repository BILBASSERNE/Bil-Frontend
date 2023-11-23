import {fetchAnyUrl} from "./modulejson.js";

const urlBase = "http://localhost:8080/bilbassen";

async function insertCarCards(carAdvertisement, carImages) {
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

    const carLink = document.createElement("a")
    carLink.href = ""
    carLink.innerText = "Læs Mere"

    carCardDiv.appendChild(carImage)

    carContent.appendChild(carName)
    carContent.appendChild(carPrice)
    carContent.appendChild(carLink)

    carCardDiv.appendChild(carContent)

    const cardContainer = document.querySelector('.card-container');
    cardContainer.appendChild(carCardDiv);
    console.log(cardContainer)
}

let cars = []

async function fetchCars() {
    cars = await fetchAnyUrl(urlBase)
    cars.forEach(insertCarCards)
}

function actionGetCars() {
    fetchCars()
}

document.addEventListener("DOMContentLoaded", actionGetCars)