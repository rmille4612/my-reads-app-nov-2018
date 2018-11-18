import React, { Component } from "react";

class Book extends Component {
  render() {
    const {Books_Chosen} = this.props;

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {Books_Chosen.length > 0 &&
            Books_Chosen.map(Current_Book_Selected => (
              <li key={Current_Book_Selected.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        backgroundImage: `url(${Current_Book_Selected.imageLinks.thumbnail})`
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        name="shelf"
                        onChange={e => this.props.moveToShelf(e, Current_Book_Selected)}
                        value={Current_Book_Selected.shelf}
                      >
                        <option value="none" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">
                          Want to Read
                        </option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">
                    {Current_Book_Selected.title}
                  </div>
                  <div className="book-authors">
                    {Current_Book_Selected.authors
                      ? Current_Book_Selected.authors.join(", ")
                      : ""}
                  </div>
                </div>
              </li>
            ))}
        </ol>
      </div>
    );
  }
}

export default Book;
