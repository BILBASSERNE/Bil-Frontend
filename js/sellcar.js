

document.addEventListener('DOMContentLoaded', function () {
    const sellCarModalHandler = new ModalHandler('sellCarModal', 'sellCarBtn');

});

class ModalHandler {
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
}

