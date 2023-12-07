document.addEventListener('DOMContentLoaded', function () {
    var sellModal = document.getElementById("sellModal");
    var sellBtn = document.getElementById("sellCarBtn");
    var closeButton = document.getElementById("closeSellModal");

    const userName = sessionStorage.getItem("userName")

    sellBtn.onclick = function () {

        if (!userName) {
            alert("Log ind for at kunne bruge denne funktion");
            return;
        }

        sellModal.style.display = "block";
    }

    closeButton.onclick = function () {
        sellModal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == sellModal) {
            sellModal.style.display = "none";
        }
    }

    const carName = document.getElementById("name")
    const description = document.getElementById("description")
    const price = document.getElementById("price")
    const licensePlate = document.getElementById("licenseplate")
    const carBrand = document.getElementById("carBrand")
    const modelYear = document.getElementById("modelYear")
    const boughtYear = document.getElementById("boughtYear")
    const fuelType = document.getElementById("fuelType")
    const fuelConsumption = document.getElementById("fuelConsumption")
    const carType = document.getElementById("carType")
    const color = document.getElementById("color")
    const fileInput = document.getElementById("carImages")
    const gearType = document.getElementById("gearType")
    const numberOfGears = document.getElementById("numberOfGears")
    const kmDriven = document.getElementById("kmDriven")
    const submitCar = document.getElementById("submitCar")


    submitCar.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = async function () {
            const base64Data = reader.result.split(',')[1];

            const car = {
                name: carName.value,
                description: description.value,
                price: price.value,
                licenseplate: licensePlate.value,
                carBrand: carBrand.value,
                modelYear: modelYear.value,
                boughtYear: boughtYear.value,
                fuelType: fuelType.value,
                fuelConsumption: fuelConsumption.value,
                carType: carType.value,
                color: color.value,
                gearType: gearType.value,
                numberOfGears: numberOfGears.value,
                kmDriven: kmDriven.value,
                images: [
                    {
                        "src": base64Data
                    }
                ]
            };

            const userName = sessionStorage.getItem("userName");
            const postUrl = "http://localhost:8080/sellcar/" + userName;

            if (!userName) {
                alert("Du skal være logget ind for at sælge en bil");
                return;
            }


            try {
                const response = await postObjectAsJson(postUrl, car, "POST");
                console.log("jeg poster");

                if (response.ok) {
                    alert("car created");
                } else {
                    alert("no car created");
                }
            } catch (error) {
                console.error("Error:", error);
            }

        }
        reader.readAsDataURL(file)
    });

});

document.addEventListener('DOMContentLoaded', function () {
    var rentModal = document.getElementById("rentModal");
    var rentBtn = document.getElementById("rentCarBtn");
    var closeButton = document.getElementById("closeRentModal");

    const userName = sessionStorage.getItem("userName")

    rentBtn.onclick = function () {

        if (!userName) {
            alert("Log ind for at kunne bruge denne funktion");
            return;
        }

        rentModal.style.display = "block";
    }

    closeButton.onclick = function () {
        rentModal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == rentModal) {
            rentModal.style.display = "none";
        }
    }

    const rentCarName = document.getElementById("rentname")
    const rentDescription = document.getElementById("rentdescription")
    const rentPrice = document.getElementById("rentprice")
    const rentCarBrand = document.getElementById("rentcarBrand")
    const rentModelYear = document.getElementById("rentmodelYear")
    const rentFuelType = document.getElementById("rentfuelType")
    const rentCarType = document.getElementById("rentcarType")
    const rentGearType = document.getElementById("rentgearType")
    const seats = document.getElementById("rentseats")
    const equipment = document.getElementById("rentequipment")
    const rules = document.getElementById("rentrules")
    const location = document.getElementById("rentlocation")
    const rentSubmitCar = document.getElementById("rentsubmitCar")
    const isRenting = true

    rentSubmitCar.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const car = {
            name: rentCarName.value,
            description: rentDescription.value,
            price: rentPrice.value,
            carBrand: rentCarBrand.value,
            modelYear: rentModelYear.value,
            fuelType: rentFuelType.value,
            carType: rentCarType.value,
            gearType: rentGearType.value,
            seats: seats.value,
            equipment: equipment.value,
            rules: rules.value,
            location: location.value,
            isRenting: true
        };
        console.log(car)

        const postUrl = "http://localhost:8080/rentcar";

        const userName = sessionStorage.getItem("userName");
        if (!userName) {
            alert("Du skal være logget ind for at kunne leje en bil ud");
            return;
        }


        try {
            const response = await postObjectAsJson(postUrl, car, "POST");
            console.log("jeg poster");

            if (response.ok) {
                alert("car created");
            } else {
                alert("no car created");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

});