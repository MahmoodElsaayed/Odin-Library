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

function createBookCard(bookData) {
    // Card div
    const card = document.createElement('div');
    card.className = 'card';
    card.id = `book-${myLibrary.length}`;

    // Book cover div
    const cover = document.createElement('div');
    cover.className = 'book-cover';
    if (bookData.bookCover) {
        cover.style.backgroundImage = `url('${bookData.bookCover}')`;
    } else {
        cover.textContent = '*Book cover unavailable*';
    }

    // Book info div container
    const info = document.createElement('div');
    info.className = 'book-info';

    // Book title paragraph
    const titlePara = document.createElement('p');
    titlePara.className = 'title';
    titlePara.textContent = bookData.title;

    // Book sub-info div container
    const subInfo = document.createElement('div');
    subInfo.className = 'sub-info';

    // Author paragraph
    const authorPara = document.createElement('p');
    authorPara.textContent = `Author: ${bookData.author}`;

    // Status paragraph
    const statusPara = document.createElement('p');
    statusPara.textContent = `Status: ${(bookData.status) ? "Read" : "Unread"}`;

    // Rating paragraph
    const ratingPara = document.createElement('p');
    ratingPara.textContent = `Rating: ${(bookData.rating) ? bookData.rating : "--"}/10`;

    // Card buttons div container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';

    // Card rating button
    const ratingBtn = createSvg("star");
    ratingBtn.classList.add('rating-btn', 'btn');
    ratingBtn.addEventListener("click", () => {
        ratingModal.showModal();
    })

    // Card status button
    const statusBtn = createSvg("eye");
    statusBtn.classList.add('status-btn', 'btn', (bookData.status) ? 'read' : 'unread');
    statusBtn.addEventListener("click", toggleBookStatus)

    // Card delete button
    const deleteBtn = createSvg("bin");
    deleteBtn.classList.add('delete-btn', 'btn');
    deleteBtn.addEventListener("click", deleteBook)

    subInfo.appendChild(authorPara);
    subInfo.appendChild(statusPara);
    subInfo.appendChild(ratingPara);

    buttonsContainer.appendChild(ratingBtn);
    buttonsContainer.appendChild(statusBtn);
    buttonsContainer.appendChild(deleteBtn);

    info.appendChild(titlePara);
    info.appendChild(subInfo);
    info.appendChild(buttonsContainer);

    card.appendChild(cover);
    card.appendChild(info);

    return card;
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