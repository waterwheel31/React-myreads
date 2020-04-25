import React, {Component} from 'react' 
import PropTypes from 'prop-types' 
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { CustomPlaceholder } from 'react-placeholder-image';

class SearchBooks extends Component{

    static propTypes = {
        books: PropTypes.array.isRequired,
        addBook: PropTypes.func.isRequired,
	}

    state = {
        query: '',
        searchResults:[]
    }


    searchBook = (query) => {
        if (query){
            BooksAPI.search(query, 10).then(books => {
                console.log(query)  
                console.log(books)
                this.setState(() => ({
                        searchResults:books
                }))
            })
            console.log(this.state.searchResults)
        } else {
            this.setState(() => ({
                searchResults:[]
            }))
        }
      }

    setDefaultValue(searchBook){
        
        console.log('setDefaultValue, searchBook:', searchBook)
        const searchBookId = searchBook.id

        let shelf = ''

        if(this.props.books.length !== undefined){
            this.props.books.forEach(function(book){
                if (book.id === searchBookId){
                    shelf = book.shelf
                }
            })
        }

    
        return(
            shelf
        )
    }

    updateQuery = query => {
        this.setState({query: query})
        this.searchBook(query)
    }


    showBookCover(result){
        try {
            const imageURL = result.imageLinks.smallThumbnail
            return(
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage:`url(${imageURL})` }}></div>
            )
        } catch (e){
            return(
                <CustomPlaceholder width={128} height={192} />
            )
        }
        
    }
    render(){

        const addBook = this.props.addBook

        return(
                <div className="search-books">
                        <div className="search-books-bar">
                            <Link to='/'>
                                    <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
                            </Link>
                            <div className="search-books-input-wrapper">
                                
                                <input 
                                    type="text" 
                                    placeholder="Search by title or author"
                                    value={this.state.query}
                                    onChange={
                                        event => this.updateQuery(event.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="search-books-results">
                        {this.state.searchResults.length > 0 && 
                            <ol className="books-grid">
                               
                                    {this.state.searchResults.map((result) => (
                                       <div>  
                                            <li key={result.title} className='book-list-item'>
                                                <div className="book-top">
                                                        {this.showBookCover(result)}
                                                        <div className="book-shelf-changer">
                                                            <select onChange={event => addBook(result, event.target.value)}
                                                                defaultValue={this.setDefaultValue(result)}
                                                                >
                                                                <option value="move" disabled>Add to...</option>
                                                                <option value="none">Add to None</option> 
                                                                <option value="wantToRead">Add to 'Want to Read'</option>
                                                                <option value="currentlyReading">Add to 'Currently Reading'</option>
                                                                <option value="read">Add to 'Read'</option>     
                                                            </select>
                                                        </div>
                                                </div>
                                                <div className="book-title">{result.title}</div>
                                                <div className="book-authors">{result.authors}</div>
                                            </li>
                                        </div>                                 
                                    ))}  
                                                           
                            </ol>
                        }   
                        </div>
                </div>

                
        )
    }

}

export default SearchBooks