const myLibrary = [
    {
        title: "7 Habits of highly effective people",
        author: "Stephen Covey",
        status: "true",
        rating: "9",
        bookCover: "https://m.media-amazon.com/images/I/71Koyhv2bML._AC_UF1000,1000_QL80_.jpg",
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        status: "",
        rating: "",
        bookCover: "https://m.media-amazon.com/images/I/81YkqyaFVEL._AC_UF1000,1000_QL80_.jpg",
    },
    {
        title: "Deep Work",
        author: "Cal Newport",
        status: "true",
        rating: "9",
        bookCover: "https://m.media-amazon.com/images/I/91nujEwIpYL._AC_UF1000,1000_QL80_.jpg",
    },
];

function Book(bookData) {
    this.title = bookData.title;
    this.author = bookData.author;
    this.status = bookData.status;
    this.rating = bookData.rating;
    this.bookCover = bookData.bookCover;
}

function addNewBook(bookData) {
    const book = new Book(bookData);
    myLibrary.push(book);
    const bookCard = createBookCard(book);
    document.querySelector(".cards-container")
            .insertBefore(bookCard, document.getElementById("add-book-btn"));
}

function createBookCard(bookData) {
    // Card div
    const card = document.createElement('div');
    card.className = 'card';
    card.id = `book-${myLibrary.length-1}`;

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
    statusPara.className = `status-para`;
    statusPara.textContent = `Status: ${(bookData.status) ? "Read" : "Unread"}`;

    // Rating paragraph
    const ratingPara = document.createElement('p');
    ratingPara.className = `rating-para`;
    ratingPara.textContent = `Rating: ${(bookData.rating) ? bookData.rating : "--"}/10`;

    // Card buttons div container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';

    // Card rating button
    const ratingBtn = createSvg("star");
    ratingBtn.classList.add('rating-btn', 'btn');
    ratingBtn.addEventListener("click", () => {
        ratingForm.setAttribute("data-target-book", `${ratingBtn.closest(".card").id}`); 
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

function createSvg(symbol) {
    const projectSvgStrings = {
        star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" /></svg>`,
        eye: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" /></svg>`,
        bin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>`,
    }
    let parser = new DOMParser();
    let doc = parser.parseFromString(projectSvgStrings[symbol], "image/svg+xml");
    return doc.documentElement;
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

function toggleBookStatus(event) {
    const targetBookIndex = event.target.closest(".card").id.match(/book-(\d+)/)[1];
    const isRead = myLibrary[targetBookIndex].status;

    // Toggle status property 
    myLibrary[targetBookIndex].status = !isRead;
    
    // Update status paragraph text
    const statusPara = document.querySelector(`#book-${targetBookIndex} .status-para`);
    statusPara.textContent = `Status: ${!isRead ? "Read" : "Unread"}`;
    
    // Add or remove read and unread classes based on status
    if (!isRead) {
        event.target.classList.remove("unread");
        event.target.classList.add("read");
    } else {
        event.target.classList.remove("read");
        event.target.classList.add("unread");
    }
}

function deleteBook(event) {
    const targetBookIndex = event.target.closest(".card").id.match(/book-(\d+)/)[1];
    myLibrary.splice(targetBookIndex, 1);
    document.getElementById(`book-${targetBookIndex}`).remove();
    resetCardsEnumeration()
}

function resetCardsEnumeration() {
    const cards = [...document.querySelectorAll(".card:not(.btn)")];
    cards.forEach((card, index) => {
        card.id = `book-${index}`;
    })
}

// DOM Stuff //
const modals = document.querySelectorAll("dialog");
const addBookBtn = document.getElementById("add-book-btn");
const addBookModal = document.getElementById("add-book-modal");
const addBookForm = document.getElementById("add-book-form");
const ratingModal = document.getElementById("rating-modal");
const ratingForm = document.getElementById("rating-form");

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

ratingForm.addEventListener("submit", (event) => {
    const newRating = getFormData(event).rating;
    const targetBookIndex = ratingForm.getAttribute("data-target-book").match(/book-(\d+)/)[1];
    myLibrary[targetBookIndex].rating = newRating;
    document.querySelector(`#book-${targetBookIndex} .rating-para`).textContent = `Rating: ${newRating}/10`;
})

document.addEventListener("DOMContentLoaded", () => {
    myLibrary.forEach((book, index) => {
        const bookCard = createBookCard(book);
        bookCard.id = `book-${index}`; // override repeated indecies
        document.querySelector(".cards-container")
                .insertBefore(bookCard, document.getElementById("add-book-btn"));
    })
})