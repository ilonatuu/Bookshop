const apiKey = 'AIzaSyBvYoV8kb5Go3CrSKBP6F0H6sXa2vv6Wo8';
let startIndex = 0;
const maxResults = 6;
let currentGenre = "Architecture";

function constructApiUrl(bookGenre) {
    return `https://www.googleapis.com/books/v1/volumes?q="subject:${bookGenre}"&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=en`;
}

const allGenreButtons = document.querySelectorAll(".books-genre")

allGenreButtons.forEach(button => {
    button.addEventListener("click", async() =>{
        const bookGenre = button.getAttribute("data-genre")
        allGenreButtons.forEach(btn => btn.classList.remove("genre-selected"));
        button.classList.add("genre-selected");
        await fetchBooks(bookGenre);
        currentGenre = document.querySelector(".genre-selected").getAttribute("data-genre");
    });
});

async function fetchBooks(bookGenre) {
    let url = constructApiUrl(bookGenre);

    const isSameGenre = bookGenre == currentGenre;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayBooks(data.items, isSameGenre);
    } catch (error) {
        console.error('Error fetching data from Google Books API', error);
    }
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

function getStars(rating) {
    const starFull = '<img id="rating-stars-full" src="images/star_full.svg">';
    const starEmpty = '<img id="rating-stars-empty" src="images/star_empty.svg">';
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? starFull : starEmpty;
    }
    return stars;
}

function displayBooks(books, isAppend) {
    const booksContainer = document.getElementById('books-container');


    if (!isAppend){
        booksContainer.innerHTML = ""
    }

    books.forEach(book => {
        const bookInfo = book.volumeInfo;
        const bookElement = document.createElement('div');
    
        bookElement.className = 'book-general-info';

        const thumbnail = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'no_image.png';
        const authors = bookInfo.authors 
            ? truncateText(bookInfo.authors.join(', '), 28) 
            : 'Unknown Author';
        const title = bookInfo.title ? truncateText(bookInfo.title, 16) : 'No Title';
        const ratingsCount = bookInfo.ratingsCount || '';
        const averageRating = bookInfo.averageRating || '';
        const stars = getStars(averageRating) || '';  
        const description = bookInfo.description ? truncateText(bookInfo.description, 100) : 'No description available.';
        const price = book.saleInfo.listPrice ? `$${book.saleInfo.listPrice.amount}` : '';

        
        bookElement.innerHTML = `
        <img src="${thumbnail}" alt="${title}">
            <div class="book-general-info-text">
                <p class="book-author">${authors}</p>
                <h2 class="book-title">${title}</h2>
                <div class="book-rating">${stars} <p>${ratingsCount} reviews</p></div>
                <p class="book-description">${description}</p>
                <p class="book-price">${price}</p>
                <button class="buy-now-button"><p>BUY NOW</p></button>
            </div>
            `;

            const buyNowButtons = document.querySelectorAll(".buy-now-button")
            
            buyNowButtons.forEach(button => {
                button.addEventListener("click", () =>{
                console.log("buy now CLICKED")
                })
            })
            
            booksContainer.appendChild(bookElement);
        }); 

        addLoadMoreButton();
    }

function addLoadMoreButton() {
    const existingButton = document.getElementById('load-more-button');
    if (!existingButton) {
        const loadMoreButton = document.createElement('button');
        loadMoreButton.id = 'load-more-button';
        loadMoreButton.textContent = 'LOAD MORE';
        loadMoreButton.addEventListener('click', loadMoreBooks);
        
        const contentContainer = document.querySelector(".content-wrap");
        contentContainer.parentNode.insertBefore(loadMoreButton, contentContainer.nextSibling);
        console.log(contentContainer)
        console.log(contentContainer.parentNode)
    }
}

function loadMoreBooks() {
    startIndex += maxResults;
    fetchBooks(currentGenre);
}

// Initial load
fetchBooks(currentGenre);

