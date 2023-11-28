
document.addEventListener('DOMContentLoaded', function () {
    var sellModal = document.getElementById("sellModal");
    var sellBtn = document.getElementById("sellCarBtn");
    var closeButton = document.getElementById("closeSellModal");

    sellBtn.onclick = function () {
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
    const gearType = document.getElementById("gearType")
    const numberOfGears = document.getElementById("numberOfGears")
    const kmDriven = document.getElementById("kmDriven")
    const submitCar = document.getElementById("submitCar")

    submitCar.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const car = {
            name: carName.value,
            description: description.value,
            price: price.value,
            liscensePlate: licensePlate.value,
            carBrand: carBrand.value,
            modelYear: modelYear.value,
            boughtYear: boughtYear.value,
            fuelType: fuelType.value,
            fuelConsumption: fuelConsumption.value,
            carType: carType.value,
            color: color.value,
            gearType: gearType.value,
            numberOfGears: numberOfGears.value,
            kmDriven: kmDriven.value
        };

        const postUrl = "http://localhost:8080/sellcar";


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

document.addEventListener('DOMContentLoaded', function () {
    var rentModal = document.getElementById("rentModal");
    var rentBtn = document.getElementById("rentCarBtn");
    var closeButton = document.getElementById("closeRentModal");

    rentBtn.onclick = function () {
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

    const carName = document.getElementById("rentname")
    const description = document.getElementById("rentdescription")
    const price = document.getElementById("rentprice")
    const carBrand = document.getElementById("rentcarBrand")
    const modelYear = document.getElementById("rentmodelYear")
    const fuelType = document.getElementById("rentfuelType")
    const carType = document.getElementById("rentcarType")
    const gearType = document.getElementById("rentgearType")
    const seats = document.getElementById("rentseats")
    const equipment = document.getElementById("rentequipment")
    const rules = document.getElementById("rentrules")
    const submitCar = document.getElementById("rentsubmitCar")

    submitCar.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const car = {
            name: carName.value,
            description: description.value,
            price: price.value,
            carBrand: carBrand.value,
            modelYear: modelYear.value,
            fuelType: fuelType.value,
            carType: carType.value,
            gearType: gearType.value,
            seats: seats.value,
            equipment: equipment.value,
            rules: rules.value
        };

        const postUrl = "http://localhost:8080/rentcar";


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

/*class ModalHandler {
    constructor(modalId, triggerBtnId) {
        this.modal = document.getElementById(modalId);
        this.triggerBtn = document.getElementById(triggerBtnId);

        // Bind methods to the instance to maintain the correct 'this' context
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);

        // Attach event listeners
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.triggerBtn.addEventListener('click', this.showModal);

        // Add event listener for closing the modal (if needed)
        this.modal.addEventListener('click', this.hideModal);
    }

    showModal() {
        this.modal.style.display = 'block';
    }

    hideModal() {
        this.modal.style.display = 'none';
    }

}*/





