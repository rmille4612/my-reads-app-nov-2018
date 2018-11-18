import React from "react";
import {Route} from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookBuilder from "./BookBuilder";
import BookLookup from "./BookLookup";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: true
  };

async componentDidMount() {
  const books = await BooksAPI.getAll()
  this.setState({ books })
}

  moveToShelf = (e, Current_Book_Selected) => {
    const books = this.state.books;
    const shelf = e.target.value;
    Current_Book_Selected.shelf = e.target.value;
    this.setState({
      books
    });

    BooksAPI.update(Current_Book_Selected, shelf).then(() => {
      this.setState(state => ({
        books: state.books
          .filter(b => b.id !== Current_Book_Selected.id)
          .concat([Current_Book_Selected])
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookBuilder
              books={this.state.books}
              moveToShelf={this.moveToShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <BookLookup
              books={this.state.books}
              moveToShelf={this.moveToShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
