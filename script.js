let addBookButton = document.getElementById('add-book-button');
let form = document.getElementById('form-div');
let formBackground = document.getElementById('form-background');
let formSubmitButton = document.getElementById('form-submit');
let myLibrary = [];

// Form Display
let formChanged = 0;

function formDisplay () {
    if (!formChanged) {
        form.style.display = 'block';
        formBackground.style.display = 'block';
        formChanged++;
    } else if (formChanged) {
        form.style.display = 'none';
        formBackground.style.display = 'none';
        formChanged--;
    } else {
        console.log('Error in addBookButton EventListener');
    }
}
addBookButton.addEventListener('click', formDisplay);

// Book div functions
function addButtonEvent () {
    changeReadButton = document.querySelectorAll('.change-read');
    deleteDivButton = document.querySelectorAll('.delete-div');
    Array.from(changeReadButton).forEach( button => {button.addEventListener('click', changeReadFunc)});
    Array.from(deleteDivButton).forEach ( button => {button.addEventListener('click', deleteDivFunc)});
}

function changeReadFunc () {
    let readId = '';
    let readIndex = 0;

    readId = this.parentElement.querySelector('.read-element').id;
    readIndex = readId[readId.length - 1];

    if (myLibrary[readIndex].read === 'no') {
        myLibrary[readIndex].read = 'yes';
    } else {
        myLibrary[readIndex].read = 'no';
    }

    this.parentElement.querySelector('.read-element').innerHTML = `Read: ${myLibrary[readIndex].read}`;

    console.log(myLibrary[readIndex].read);
}

function deleteDivFunc () {
    this.parentElement.remove();
}

// Form create div
let displayDiv = document.getElementById('book-display');
let changeReadButton = document.querySelectorAll('.change-read');
let deleteDivButton = document.querySelectorAll('.delete-div');
let libraryIndex = 0;

function createDiv () {
    displayDiv.innerHTML += `
    <div class="book-div" id="div${libraryIndex}">
        <p>Ttile: ${myLibrary[libraryIndex].title}</p>
        <p>Author: ${myLibrary[libraryIndex].author}</p>
        <p>Pages: ${myLibrary[libraryIndex].pages}</p>
        <p class="read-element" id="read${libraryIndex}">Read: ${myLibrary[libraryIndex].read}</p>
        <button class="change-read" id="change-read${libraryIndex}">Change read status</button>
        <button class="delete-div" id="delete-div${libraryIndex}">Delete</button>
    </div>
    `;
    addButtonEvent();
    libraryIndex++;
}

// Form Submit
let formTitle = document.getElementById('title');
let formAuthor = document.getElementById('author');
let formPages = document.getElementById('pages');
let formRead= document.getElementsByName('read');
let readValue = Array.from(formRead).find(radio => radio.checked);

function formSubmit (event) {
    event.preventDefault();
    readValue = Array.from(formRead).find(radio => radio.checked);
    addToLibrary(new Book(formTitle.value, formAuthor.value, formPages.value, readValue.id));
    formDisplay();
    createDiv();
}
formSubmitButton.addEventListener('click', formSubmit);


// Library JS
function Book (title, author, pages, read) {
    // Properties
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    // Info
    let readOrNot = function () {
        if (read) {
            return "I've already read it";
        } else if (!read) {
            return "I haven't read it";
        } else {
            console.log('readOrNot failure');
        }
    }

    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${readOrNot()}`;
    }
}

function addToLibrary (book) {
    myLibrary.push(book);
}
