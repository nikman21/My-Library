const newBookButton = document.querySelector('#new-book');
const bookList = document.querySelector('#book-list');
const newBookForm = document.querySelector('#new-book-form');
const removeBook = document.querySelector('#remove-book');
const cancelButton = document.querySelector('#cancel');
const editBook = document.querySelector('#edit-book');


let myLibrary = [];
let editBookIndex = null;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  bookList.innerHTML = '';

  for (let i = 0; i < myLibrary.length; i++) {
    let book = document.createElement('div');
    book.classList.add('book');

    let bookTitle = document.createElement('h3');
    bookTitle.textContent = myLibrary[i].title;
    book.appendChild(bookTitle);

    let bookAuthor = document.createElement('p');
    bookAuthor.textContent = "Author: " + myLibrary[i].author;
    book.appendChild(bookAuthor);

    let bookPages = document.createElement('p');
    bookPages.textContent = myLibrary[i].pages + " pages";
    book.appendChild(bookPages);

    let bookReadText = document.createElement('p');
    bookReadText.textContent = myLibrary[i].read;
    book.appendChild(bookReadText);

    if (myLibrary[i].read === 'I read this book!') {
      book.style.borderColor = 'green';
    }
    if (myLibrary[i].read === 'I have not read this book!') {
      book.style.borderColor = 'red';
    }
    if (myLibrary[i].read === 'I am currently reading this book!') {
      book.style.borderColor = 'blue';
    }


    let removeBook = document.createElement('button');
    removeBook.textContent = 'Remove Book';
    removeBook.classList.add('remove-book');
    book.appendChild(removeBook);

  let editBook = document.createElement('button');
  editBook.textContent = 'Edit Book';
    editBook.dataset.index = i; 
    editBook.classList.add('edit-book');
    book.appendChild(editBook);

    removeBook.addEventListener('click', function() {
        myLibrary.splice(i, 1);
        displayBooks();
    });
    editBook.addEventListener('click', function() {
      // Set the editBookIndex variable
      editBookIndex = parseInt(editBook.dataset.index);
        
      // Display the new book form
      newBookForm.style.display = 'flex';
      document.body.classList.add('overlay');
        
      // Fill in the fields with the information of the book to be edited
      let book = myLibrary[i];
      document.querySelector('#title').value = book.title;
      document.querySelector('#author').value = book.author;
      document.querySelector('#pages').value = book.pages;
      document.querySelector('#read').value = book.read;
        
      // Change the form submission function to update the book object
      newBookForm.removeEventListener('submit', addBookToLibrary);
      newBookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Get the form data
        let title = document.querySelector('#title').value;
        let author = document.querySelector('#author').value;
        let pages = document.querySelector('#pages').value;
        let read = document.querySelector('#read').value;
        // Update the book object
        myLibrary[editBookIndex].title = title;
        myLibrary[editBookIndex].author = author;
        myLibrary[editBookIndex].pages = pages;
        myLibrary[editBookIndex].read = read;
        // Hide the new book form
        newBookForm.style.display = 'none';
        document.body.classList.remove('overlay');
        // Reset the form
        newBookForm.reset();
        // Reset the form submission function to add a new book
        newBookForm.removeEventListener('submit', arguments.callee);
        newBookForm.addEventListener('submit', addBookToLibrary);
        // Redraw the book list
        displayBooks();
      });
    });
              
    bookList.appendChild(book);
  }
}
  


newBookButton.addEventListener('click', function() {
    newBookForm.style.display = 'flex'; // Show the form
    document.body.classList.add('overlay'); // Add overlay class to body
});

newBookForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Get the form data
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let read = document.querySelector('#read').value;
  
  // Get the index of the book being edited
  let index = editBookIndex;
  
  if (index !== null) {
    // If the index is set, update the existing book
    myLibrary[index].title = title;
    myLibrary[index].author = author;
    myLibrary[index].pages = pages;
    myLibrary[index].read = read;
  } else {
    // If the index is not set, add a new book
    addBookToLibrary(title, author, pages, read);
  }
  
  // Reset the form and hide it
  event.target.reset();
  newBookForm.style.display = 'none';
  document.body.classList.remove('overlay');
  
  // Reset the index of the book being edited
  editBookIndex = null;
  
  // Update the book list
  displayBooks(); 
});


document.addEventListener('click', function(event) {
    if (event.target === newBookForm) {
        newBookForm.style.display = 'none'; // Hide the form
        document.body.style.overflow = ''; // Restore body scrollbars
        document.body.style.position = ''; // Remove relative positioning from body
    }
});

cancelButton.addEventListener('click', function() {
    newBookForm.style.display = 'none'; // Hide the form
    document.body.classList.remove('overlay'); // Remove overlay class from body
});


document.body.appendChild(newBookForm);
  



  