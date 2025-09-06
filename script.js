const showModalBtn = document.getElementById('show-modal-button');
const inputModal = document.getElementById('input-modal');
const closeModalButton = document.getElementById('close-modal-button');
const submitBookBtn = document.getElementById('submit-book-button');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookPages = document.getElementById('book-pages');
const bookIsRead = document.getElementById('book-isRead');
const libraryContainer = document.getElementById('library-container');

const book1 = {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    pages: 671,
    isRead: true
};

const book2 = {
    title: "The Stranger",
    author: "Albert Camus",
    pages: 123,
    isRead: false
};

const book3 = {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    isRead: true
};

const library = [book1, book2, book3];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
};

function renderBookCard(book) {
    const bookCardContainer = document.createElement('div');
    bookCardContainer.className = 'book-card-container';
    const titleContainer = document.createElement('p');
    const authorContainer = document.createElement('p');
    const pagesContainer = document.createElement('p');
    const toggleButton = document.createElement('button');
    toggleButton.className = 'toggle-button';
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    
    function checkBookStatus() {
        if (book.isRead) {
            toggleButton.textContent = 'Read';
            toggleButton.style.backgroundColor = 'teal';
        } else {
            toggleButton.textContent = 'Not read yet';
            toggleButton.style.backgroundColor = 'coral';
        };
    };
    
    titleContainer.textContent = 'Title: ' + book.title;
    authorContainer.textContent = 'Author: ' + book.author;
    pagesContainer.textContent = 'Pages: ' + book.pages;
    checkBookStatus();

    toggleButton.addEventListener('click', ()=> {
        book.isRead = !book.isRead;
        checkBookStatus();
    });

    deleteButton.addEventListener('click', ()=> {
        const index = library.indexOf(book);
        if (index > -1) {
            library.splice(index, 1);
        }
        renderLibrary();
    });

    bookCardContainer.append(titleContainer, authorContainer, pagesContainer, toggleButton, deleteButton);

    libraryContainer.appendChild(bookCardContainer);
};

function renderLibrary() {
    libraryContainer.innerHTML = '';
    for (const book of library) {
        renderBookCard(book);
    };
};

function clearInput() {
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    bookIsRead.checked = false;
};

showModalBtn.addEventListener('click', ()=> {
    inputModal.showModal();
});

closeModalButton.addEventListener('click', ()=> {
    inputModal.close();
    clearInput();
});

submitBookBtn.addEventListener('click', ()=> {
    const book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookIsRead.checked);

    library.push(book);
    inputModal.close();
    clearInput();
    renderLibrary();
});

renderLibrary();

