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
        const books = Store.getBooks();
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

    static showAlert(message, className){
        const div = document.createElement("div");
        div.setAttribute("role","alert");
        div.className = `alert alert-${className}`
        const text = document.createTextNode(message)
        div.append(text);
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form")
        container.insertBefore(div,form)

        // Vanish in 2 seconds

        setTimeout(() => {
            document.querySelector(".alert").remove()
        }, 2000);
    }

    static clearFields(){
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    };

    static deleteBook(element){
        if(element.classList.contains("delete")){
            element.parentElement.parentElement.remove();
            Store.removeBook(element.parentElement.previousElementSibling.innerHTML);
            // Show message
            UI.showAlert("Book Deleted.","info")

        }
    };
}
// Store Class: Handles Storage
class Store{
    // We can only store strings in local storage so we must stringify objects before adding to storage and parsing after getting them from storage.

    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book, index) =>{
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }
}
// Event : Add a Book
const form = document.querySelector("#book-form");
form.addEventListener("submit", (e) =>{

    e.preventDefault();
    // Get form input values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    // Validate
    if (title === "" || author === "" || isbn === ""){
        UI.showAlert("Please fill in all fields.","danger")
            
    }else{

        //Instantiate Book 
        const book = new Book(title,author,isbn);
    
        // Add Book to UI
        UI.addBookToList(book);
        
        // Add book to store
        Store.addBook(book);

        // Show message
        UI.showAlert("Book added successfully.","success");

        // Clear input fields
        UI.clearFields();
    }


});

// Event: Display Books
document.addEventListener("DOMContentLoaded",UI.displayBooks);

// Event Remove a Book
const bookList = document.querySelector("#book-list");
bookList.addEventListener("click",(e)=>{

    UI.deleteBook(e.target)
});
