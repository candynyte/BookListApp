// Book Class: Represents a Book

class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handles UI Tasks



class UI {

    static displayBooks(){

        // Hardcoded Storage 
        const StoredBooks = [
            {title:"Harry Potter and The Philosopher Stone",author:"JK Rowling",isbn:123},
            {title:"Harry Potter and The Chamber of Secrets",author:"JK Rowling",isbn:1234},
            {title:"Harry Potter and The Deathly Hallows",author:"JK Rowling",isbn:12345}
        ];

        const books = StoredBooks;

        books.forEach((book)=> UI.addBookToList(book));

    };

    static addBookToList(book){
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr")
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-sm btn-danger delete">X</a></td>
        `
        list.appendChild(row);
    };

    static clearFields(){
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    };

    static deleteBook(element){
        if(element.classList.contains("delete")){
            element.parentElement.parentElement.remove();
        }
    };
}

// Store Class: Handles Storage

// Event : Add a Book
const form = document.querySelector("#book-form");
form.addEventListener("submit", (e) =>{

    e.preventDefault();
    // Get form input values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    //Instantiate Book 
    const book = new Book(title,author,isbn);
    
    // Add Book to UI
    UI.addBookToList(book);

    // Clear input fields
    UI.clearFields();

});


// Event: Display Books
document.addEventListener("DOMContentLoaded",UI.displayBooks())

// Event Remove a Book
const bookList = document.querySelector("#book-list")
bookList.addEventListener("click",(e)=>{UI.deleteBook(e.target)});
