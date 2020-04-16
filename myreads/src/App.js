import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'
import {Link} from 'react-router-dom'
import SearchBooks from './SearchBooks'



class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],

  }


  getBookShelf = () => {
    BooksAPI.getAll().then(bookShelf => {
        this.setState({ bookShelf })
    })
  }

  
  changeShelf = (book, shelf) => {
      console.log("title:", book.name)
      console.log("new shelf:", shelf)
     
      BooksAPI.update(book, shelf).then(res =>{
        book.shelf = shelf
        this.getBookShelf()
        this.setState(state => ({
          books: this.state.books.filter(b => b.name !== book.name)
          .concat([book])
        }))

      })
  }

  addBook = (book, shelf) => {
      console.log('title:', book.title)
      console.log('author:',book.authors)
      console.log('imageURL:', book.imageLinks.smallThumbnail)
      console.log(shelf)

      book = {
        "name": book.title,
        "author": book.authors,
        "shelf": shelf,
        "imageURL": book.imageLinks.smallThumbnail
      }
      this.setState(state=> ({
        books: this.state.books.concat([book])
      }))
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render = {()=>(
            <div className="list-books">
                <div className="list-books-title">
                     <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                      <div>

                        <div className="bookshelf">
                          <h2 className="bookshelf-title">Currently Reading</h2>  
                          <ListBooks books={this.state.books} shelf="currentlyReading" changeShelf={this.changeShelf}/>  
                        </div>

                        <div className="bookshelf">
                          <h2 className="bookshelf-title">Want to Read</h2>  
                          <ListBooks books={this.state.books} shelf="wantToRead" changeShelf={this.changeShelf}/>  
                        </div>

                        <div className="bookshelf">
                          <h2 className="bookshelf-title">Read</h2>  
                          <ListBooks books={this.state.books} shelf="read" changeShelf={this.changeShelf}/>  
                        </div>
                      </div>
                </div>
                <div className="open-search">
                  <Link to='/search'>
                     <button >Add a book</button>
                  </Link>
                </div>
          </div>
        )} />

        <Route path='/search' render = {() =>(
            <SearchBooks
                books = {this.state.books}
                addBook = {this.addBook}
            />
            
            
        )}/>
        
      </div>
    )
  }
}

export default BooksApp
