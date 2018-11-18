import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

class BookBuilder extends Component {
  state = {};

  render() {
    const { books } = this.props;
    const currentlyReading = books.filter(
      book => book.shelf === "currentlyReading"
    );
    const read = books.filter(book => book.shelf === "read");
    const wantToRead = books.filter(book => book.shelf === "wantToRead");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              {currentlyReading.length > 0 &&
                <Book
                  Books_Chosen={currentlyReading}
                  moveToShelf={this.props.moveToShelf}
                />}
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              {wantToRead.length > 0 &&
                <Book
                  Books_Chosen={wantToRead}
                  moveToShelf={this.props.moveToShelf}
                />}
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              {read.length > 0 &&
                <Book
                  Books_Chosen={read}
                  moveToShelf={this.props.moveToShelf}
                />}
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}

export default BookBuilder;
