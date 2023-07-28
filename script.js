/*
  1. Create a web application that pulls book data from the Seussology API (https://seussology.info/api/books).
  2. The application should display the title of each book.
  3. The application should allow the user to mark a book as read.
  4. Clicking on a book should display a modal with the book's title, description, and cover image.
*/


const $books = document.querySelector('#books')
const $modal = document.querySelector('.modal')
const ls = localStorage.getItem('readBooks')
const readBooks = ls ? JSON.parse(ls) : []

function createBookTitle (title) {
  const $bookTitle = document.createElement('h2')
  $bookTitle.classList.add('book-title')
  $bookTitle.textContent = title
  return $bookTitle
}

function createBookButton (title) {
  const $readButton = document.createElement('button')
  $readButton.classList.add('book-button')
  $readButton.dataset.title = title

  if(readBooks.includes(title)){
    $readButton.classList.add('read')
  }

  return $readButton
}

function createBook (book) {
  const $bookContainer = document.createElement('div')
  $bookContainer.classList.add('book')

  $bookContainer.dataset.title = book.title
  $bookContainer.dataset.description = book.description
  $bookContainer.dataset.image = book.image

  $bookContainer.append(createBookTitle(book.title), createBookButton(book.title))
  return $bookContainer
}

function renderBooks (books) {
  const $bookContainer = document.querySelector('#books')
  $bookContainer.innerHTML = ''
  books.forEach(function (book) {
    $bookContainer.append(createBook(book))
  })
}


async function fetchBooks() {

  const books = JSON.parse(localStorage.getItem('books'))
  if (!books){
  const response = await fetch('https://seussology.info/api/books')
  const json = await response.json()
  localStorage.setItem('books', JSON.stringify(json))
  return renderBooks(json)

  }

return renderBooks(books)

}

fetchBooks()

// create readBook array to hold the read book title
// use event dele
$books.addEventListener("click", function(e){
  const book = e.target.closest('.book')

  if (e.target.matches('.book-button')){
    if (readBooks.includes(e.target.dataset.title)){
      // to get the title index
      const index = readBooks.index(e.target.dataset.title)
      readBooks.splice(index, 1)
    } else {
      readBooks.push(e.target.dataset.title)
    }

   localStorage.setItem('readBooks', JSON.stringify(readBooks))
   fetchBooks()

  } else if (book) {
    $modal.innerHTML = ` <div class="modal-content">
    <img class="book-cover" src="${book.dataset.image}">
    <div class="modal-details">
      <h3 class="modal-content-title">${book.dataset.title}</h3>
      <p class="modal-content-description">${book.dataset.description}</p>
  </div>`
    $modal.classList.add('show')
  }
})

$modal.addEventListener("click", function(e){
  console.log('modal')
  if(e.target.matches('.modal')){
    $modal.classList.remove('show')
  }
 
})