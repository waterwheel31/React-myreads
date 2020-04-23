import React, {Component} from 'react'
import PropTypes from 'prop-types' 


class ListBooks extends Component{
    
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelf: PropTypes.string.isRequired,
        changeShelf: PropTypes.func.isRequired
    }
    

    render(){
   
        const books = this.props.books.filter((book)=>(
            book.shelf === this.props.shelf
        ))
        const changeShelf = this.props.changeShelf

        console.log('books:', books)

        return (
            <ol className='books-grid'>
                {books.map((book) =>(

                    <li key={book.id} className='book-list-item'>
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage:`url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">

                              <select onChange={event => changeShelf(book, event.target.value)}
                                    defaultValue={book.shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="none">None</option> 
                                <option value="wantToRead">Want to Read</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="read">Read</option>
                              
                              </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title} </div>
                        <div className="book-authors">{book.authors} </div>
                    </li>
                    
                ))}

            </ol>

        )
    }

}

export default ListBooks