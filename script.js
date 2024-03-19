const myLibrary = [];

function Book(bookData) {
    this.title = bookData.title;
    this.author = bookData.author;
    this.status = bookData.status;
    this.rating = bookData.rating;
    this.cover = bookData.cover;
}

function addNewBook(bookData) {
    const book = Book(bookData);
    myLibrary.push(book);
    const bookCard = createBookCard(book);
    document.querySelector(".cards-container")
            .insertBefore(bookCard, document.getElementById("add-book-btn"));
}

function getFormData(event) {
    event.preventDefault();
    const inputsObj = {}
    const formData = new FormData(event.target);
    for (let pair of formData.entries()) {
        inputsObj[pair[0]] = pair[1];
    }
    event.target.closest("dialog").close();
    event.target.reset();
    return inputsObj;
}


// DOM Stuff //
const modals = document.querySelectorAll("dialog");
const addBookBtn = document.getElementById("add-book-btn");
const addBookModal = document.getElementById("add-book-modal");
const addBookForm = document.getElementById("add-book-form");

// Close modal if clicked outside of modal
modals.forEach(modal => {
    modal.addEventListener("click", (event) => {
        const modalDimensions = modal.getBoundingClientRect()
        if (
            event.clientX < modalDimensions.left ||
            event.clientX > modalDimensions.right ||
            event.clientY < modalDimensions.top ||
            event.clientY > modalDimensions.bottom
        ) {
            modal.close()
        }
    })
})

addBookBtn.addEventListener("click", () => {
    addBookModal.showModal();
})

addBookForm.addEventListener("submit", (event) => {
    const bookData = getFormData(event);
    addNewBook(bookData);
});