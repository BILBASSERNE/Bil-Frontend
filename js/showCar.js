//import {postObjectAsJson} from "./modulejson";

async function showUserInformation(carAdvertisement) {
    const userDiv = document.createElement("div")
    userDiv.className = "usersidebar"

    const userInformation = document.createElement("h2")
    userInformation.innerText = "User Information"

    const userName = document.createElement("p")
    userName.innerText = "Name: " + carAdvertisement.firstName + " " + carAdvertisement.lastName

    const userCity = document.createElement("p")
    userCity.innerText = "City: " + carAdvertisement.city

    const userNumber = document.createElement("p")
    userNumber.innerText = "Telephone Number: " + carAdvertisement.phoneNumber

    const userNameSession = sessionStorage.getItem("userName")
    console.log(userNameSession)

    fetch("http://localhost:8080/check/" + carAdvertisement.id + "/" + userNameSession)
        .then(response => {

                if (response.ok) {
                const editButton = document.createElement("button");
                editButton.innerText = "Rediger annonce";
                userDiv.appendChild(editButton)

                const editModal = document.getElementById("sellModal")

                editButton.addEventListener("click", function (event) {
                    const editModal = document.getElementById("sellModal")
                    editModal.style.display = "block";

                    fetchAnyUrl("http://localhost:8080/existingcarinfo/" + carAdvertisement.id)
                        .then(carAdvertisement => {
                            populateEditModal(carAdvertisement)
                        })
                        .catch(error => {
                            console.error("An error has occured")
                        })
                })

                // closes modal if u click outside it
                window.addEventListener("click", function (event) {
                    if (event.target === editModal) {
                        editModal.style.display = "none";
                    }
                });
            }
        })
        .catch(error => {
            console.error("An error has occured")
        })


    userDiv.appendChild(userInformation)
    userDiv.appendChild(userName)
    userDiv.appendChild(userCity)
    userDiv.appendChild(userNumber)

    const carContainer = document.querySelector('.car-container');
    carContainer.appendChild(userDiv);
}

function populateEditModal(carAdvertisement) {

    document.getElementById("name").value = carAdvertisement.name;
    document.getElementById("description").value = carAdvertisement.description;
    document.getElementById("price").value = carAdvertisement.price;
    document.getElementById("licenseplate").value = carAdvertisement.licenseplate;
    document.getElementById("carBrand").value = carAdvertisement.carBrand;
    document.getElementById("modelYear").value = carAdvertisement.modelYear;
    document.getElementById("boughtYear").value = carAdvertisement.boughtYear;
    document.getElementById("fuelType").value = carAdvertisement.fuelType;
    document.getElementById("fuelConsumption").value = carAdvertisement.fuelConsumption;
    document.getElementById("carType").value = carAdvertisement.carType;
    document.getElementById("color").value = carAdvertisement.color;
    //document.getElementById("carImages").value = carAdvertisement.carImages;
    document.getElementById("gearType").value = carAdvertisement.gearType;
    document.getElementById("numberOfGears").value = carAdvertisement.numberOfGears;
    document.getElementById("kmDriven").value = carAdvertisement.kmDriven;

    const editCarForm = document.getElementById("editCarAdForm")

    document.getElementById("submitCar").remove()

    const newEditButton = document.createElement("button")
    newEditButton.textContent = "Ret Annonce"

    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Slet annonce"
    deleteButton.style.backgroundColor = "red";

    editCarForm.appendChild(newEditButton)
    editCarForm.appendChild(deleteButton)

    // EDIT CAR ADVERTISEMENT

    newEditButton.addEventListener("click", function(event) {
        event.preventDefault()

        const editedCarAdvertisement = {
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            price: document.getElementById("price").value,
            licenseplate: document.getElementById("licenseplate").value,
            carBrand: document.getElementById("carBrand").value,
            modelYear: document.getElementById("modelYear").value,
            boughtYear: document.getElementById("boughtYear").value,
            fuelType: document.getElementById("fuelType").value,
            fuelConsumption: document.getElementById("fuelConsumption").value,
            carType: document.getElementById("carType").value,
            color: document.getElementById("color").value,
            //fileInput: document.getElementById("carImages").value,
            gearType: document.getElementById("gearType").value,
            numberOfGears: document.getElementById("numberOfGears").value,
            kmDriven: document.getElementById("kmDriven").value
        }

            postObjectAsJson("http://localhost:8080/editcar/" + carAdvertisement.id, editedCarAdvertisement, "PUT")
                .then(response => {
                    console.log(response)
                    if (response.ok) {
                        alert("Advertisement has been edited")
                    } else {
                        alert("Something went wrong")
                    }
                })
    })

    // DELETE CAR ADVERTISEMENT

        deleteButton.addEventListener("click" , function () {
            fetch('http://localhost:8080/deletecar/' + carAdvertisement.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.ok) {
                        alert("Din annonce er blevet slettet")
                        sessionStorage.removeItem("carId")
                        window.location.href = 'index.html'
                    } else {
                        alert("Something went wrong")
                    }
                })
        })
}


async function showCarInformation(carAdvertisement, carImage) {
    const carDiv = document.createElement("div")
    carDiv.className = "car-details"

    const carImages = document.createElement("div")
    carImages.className = "car-slideshow"

    const carImageSlideshow = document.createElement("img")
    carImageSlideshow.setAttribute("src", `data:image;base64,${carAdvertisement.images}`)
    carImageSlideshow.setAttribute("alt", "Car Image")

    carImages.appendChild(carImageSlideshow)
    carDiv.appendChild(carImages)

    const carTable = document.createElement("table")
    const tablename = document.createElement("tr")


    carTable.appendChild(tablename)
    carDiv.appendChild(carTable)

    const carFeature = document.createElement("th")
    carFeature.innerText = "Feature"

    const carDetails = document.createElement("th")
    carDetails.innerText = "Details"

    tablename.appendChild(carFeature)
    tablename.appendChild(carDetails)

    const trName= document.createElement("tr")
    const carName = document.createElement("td")
    const carNameValue = document.createElement("td")
    carName.innerText = "Car Model"
    carNameValue.innerText = carAdvertisement.name
    trName.appendChild(carName)
    trName.appendChild(carNameValue)

    const trDescription = document.createElement("tr")
    const carDescription = document.createElement("td")
    const carDescriptionValue = document.createElement("td")
    carDescription.innerText = "Car Description"
    carDescriptionValue.innerText = carAdvertisement.description
    trDescription.appendChild(carDescription)
    trDescription.appendChild(carDescriptionValue)

    const trPrice = document.createElement("tr")
    const carPrice = document.createElement("td")
    const carPriceValue = document.createElement("td")
    carPrice.innerText = "Car Price"
    carPriceValue.innerText = carAdvertisement.price
    trPrice.appendChild(carPrice)
    trPrice.appendChild(carPriceValue)

    const trLicenseplate = document.createElement("tr")
    const carLicenseplate = document.createElement("td")
    const carLicenseplateValue = document.createElement("td")
    carLicenseplate.innerText = "Car License Plate"
    carLicenseplateValue.innerText = carAdvertisement.price
    trLicenseplate.appendChild(carLicenseplate)
    trLicenseplate.appendChild(carLicenseplateValue)

    const trBrand = document.createElement("tr")
    const carBrand = document.createElement("td")
    const carBrandValue = document.createElement("td")
    carBrand.innerText = "Car Brand"
    carBrandValue.innerText = carAdvertisement.carBrand
    trBrand.appendChild(carBrand)
    trBrand.appendChild(carBrandValue)

    const trModelYear = document.createElement("tr")
    const carModelYear = document.createElement("td")
    const carModelYearValue = document.createElement("td")
    carModelYear.innerText = "Model Year"
    carModelYearValue.innerText = carAdvertisement.modelYear
    trModelYear.appendChild(carModelYear)
    trModelYear.appendChild(carModelYearValue)

    const trBoughtYear = document.createElement("tr")
    const carBoughtYear = document.createElement("td")
    const carBoughtYearValue = document.createElement("td")
    carBoughtYear.innerText = "Current Owner Bought Year"
    carBoughtYearValue.innerText = carAdvertisement.boughtYear
    trBoughtYear.appendChild(carBoughtYear)
    trBoughtYear.appendChild(carBoughtYearValue)

    const trFuelType = document.createElement("tr")
    const carFuelType = document.createElement("td")
    const carFuelTypeValue = document.createElement("td")
    carFuelType.innerText = "Fuel Type"
    carFuelTypeValue.innerText = carAdvertisement.fuelType
    trFuelType.appendChild(carFuelType)
    trFuelType.appendChild(carFuelTypeValue)

    const trFuelConsumption = document.createElement("tr")
    const carFuelConsumption = document.createElement("td")
    const carFuelConsumptionValue = document.createElement("td")
    carFuelConsumption.innerText = "Fuel Consumption L/100KM"
    carFuelConsumptionValue.innerText = carAdvertisement.price
    trFuelConsumption.appendChild(carFuelConsumption)
    trFuelConsumption.appendChild(carFuelConsumptionValue)

    const trCarType = document.createElement("tr")
    const carCarType = document.createElement("td")
    const carCarTypeValue = document.createElement("td")
    carCarType.innerText = "Car Type"
    carCarTypeValue.innerText = carAdvertisement.carType
    trCarType.appendChild(carCarType)
    trCarType.appendChild(carCarTypeValue)

    const trColor = document.createElement("tr")
    const carColor = document.createElement("td")
    const carColorValue = document.createElement("td")
    carColor.innerText = "Car Color"
    carColorValue.innerText = carAdvertisement.color
    trColor.appendChild(carColor)
    trColor.appendChild(carColorValue)

    const trGearType = document.createElement("tr")
    const carGearType = document.createElement("td")
    const carGearTypeValue = document.createElement("td")
    carGearType.innerText = "Fuel Consumption L/100KM"
    carGearTypeValue.innerText = carAdvertisement.gearType
    trGearType.appendChild(carGearType)
    trGearType.appendChild(carGearTypeValue)

    const trNumberOfGears = document.createElement("tr")
    const carNumberOfGears = document.createElement("td")
    const carNumberOfGearsValue = document.createElement("td")
    carNumberOfGears.innerText = "Number of Gears"
    carNumberOfGearsValue.innerText = carAdvertisement.numberOfGears
    trNumberOfGears.appendChild(carNumberOfGears)
    trNumberOfGears.appendChild(carNumberOfGearsValue)

    const trKmDriven = document.createElement("tr")
    const carKmDriven = document.createElement("td")
    const carKmDrivenValue = document.createElement("td")
    carKmDriven.innerText = "Kilometer Driven"
    carKmDrivenValue.innerText = carAdvertisement.kmDriven
    trKmDriven.appendChild(carKmDriven)
    trKmDriven.appendChild(carKmDrivenValue)

    carTable.appendChild(trName)
    carTable.appendChild(trDescription)
    carTable.appendChild(trPrice)
    carTable.appendChild(trLicenseplate)
    carTable.appendChild(trBrand)
    carTable.appendChild(trModelYear)
    carTable.appendChild(trBoughtYear)
    carTable.appendChild(trFuelType)
    carTable.appendChild(trFuelConsumption)
    carTable.appendChild(trCarType)
    carTable.appendChild(trColor)
    carTable.appendChild(trGearType)
    carTable.appendChild(trNumberOfGears)
    carTable.appendChild(trKmDriven)


    const carContainer = document.querySelector('.car-container');
    carContainer.appendChild(carDiv);
}

async function fetchCars() {
    try {
        const carId = localStorage.getItem("carId");
        if (!carId) {
            console.error("No carId found in local storage");
            return;
        }

        const urlBase = `http://localhost:8080/cardetails/${carId}`;
        const carAdvertisement = await fetchAnyUrl(urlBase);
        if (carAdvertisement) {
            showCarInformation(carAdvertisement);

            // Assuming you have a way to get user data
            // This could be another fetch call or part of the carAdvertisement object

            showUserInformation(carAdvertisement);
        } else {
            console.error("Car data not found");
        }
    } catch (error) {
        console.error("Error fetching car details:", error);
    }
}

function fetchAnyUrl(url) {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}

document.addEventListener("DOMContentLoaded", actionGetCars);

function actionGetCars() {
    fetchCars();
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
