
class Book {
    constructor(siteName, siteEmail, siteMessage,  siteGender,) {
        
        this.siteName = siteName;
        this.siteEmail = siteEmail;
        this.siteMessage = siteMessage;
        this.siteGender = siteGender;
    }
}

// 2. UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        // 3. predefined books
        //     const StoredBooks = [
        //       {
        //         title: 'Book One',
        //         author: 'John Boe',
        //         isbn: '11111111'
        //       },
        //       {
        //         title: 'Book One',
        //         author: 'John Boe',
        //         isbn: '11111111'
        //       }
        //     ];
        //     const books = StoredBooks;

        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    // 4. add book
    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.siteName}</td>
        <td>${book.siteEmail}</td>
        <td>${book.siteMessage}</td>
        <td>${book.siteGender}</td>
        <td><a class="btn btn-danger btn-sm delete"> X </a></td>
      `;
        list.appendChild(row);
    }


    // 11. delete book  
    static deleteBook(el) {
        // if element contains .delete class
        if (el.classList.contains('delete')) {
            // remove <a> -> <td> -> <tr>       
            el.parentElement.parentElement.remove();
        }
    }

    // 13. show alert  
    // <div class="alert alert-success/alert-danger>Message</div>
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#My-form');
        // Vanish in 3 seconds
    }

    // 9. clear fields  
    static clearFields() {

        document.querySelector('#name').value = ''; 
        document.querySelector('#email').value = '';
        document.querySelector('#message').value = '';
        document.querySelector('input[name=customRadio]:checked').value;
    }
}

// Store Class: Handles Storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        console.log(books);
        return books;

    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(siteGender) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.siteGender === siteGender) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// 4. Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// 5. Event: Add a Book
document.querySelector('#My-form').addEventListener('submit', (e) => {
    // 7. Prevent actual submit action
    e.preventDefault();

    // Get form values
    const siteName = document.querySelector('#name').value;
    const siteEmail = document.querySelector('#email').value;
    const siteMessage = document.querySelector('#message').value;
    const siteGender = document.querySelector('input[name=customRadio]:checked').value;
    

    // 12. Validate
    if (siteName === '' || siteEmail === ''|| siteMessage === '' ||  siteGender === '' ) {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // 6. Instatiate book
        const book = new Book( siteName,siteEmail,siteMessage,siteGender,);
        // console.log(book);

        // 8. Add Book to UI
        UI.addBookToList(book);

        // Add book to store
        Store.addBook(book);

        // 13. Show success message
        UI.showAlert('Information Added', 'success');

        // 9. Clear fields
        UI.clearFields();
    }
});

// 10. Event: Remove a Book - event propagation by selecting the parent
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Information Removed', 'success');
});