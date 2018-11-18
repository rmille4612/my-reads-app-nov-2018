import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class BookLookup extends Component {
  state = {
    query: "",
    bookArray: []
  };

  bookNameSearch = query => {
    let bookArray = [];

    if (query) {
      let searchOutput = [];

      BooksAPI.search(query).then(results => {
        if (results && results.length) {
          searchOutput = results.map(result => {
            result.shelf = this.addShelf(result);
            return result;
          });
          this.setState({
            bookArray: searchOutput
          });
        } else {
          this.setState({
            bookArray: []
          });
        }
      });
    } else {
      this.setState({
        bookArray: []
      });
    }
    this.setState({
      query: query.trim()
    });
  };

  addShelf(result) {
    let hasShelf = this.props.books.filter(book => book.id === result.id);
    return hasShelf.length ? hasShelf[0].shelf : "none";
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            &gt;
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/* 
                                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                    You can find these search terms here:
                                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                                    
                                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                                    you don't find a specific author or title. Every search is limited by search terms.
                                  */}
            <input
              onChange={event => this.bookNameSearch(event.target.value)}
              placeholder="Search by title or author"
              type="text"
            />

          </div>
        </div>
        <div className="search-books-results">
          {this.state.bookArray.length > 0 &&
            <Book
              Books_Chosen={this.state.bookArray}
              moveToShelf={this.props.moveToShelf}
            />}
        </div>
      </div>
    );
  }
}

export default BookLookup;
