import React, { useState, useEffect} from "react";
import './styles.css';

function Home() {
    const [bookList, setBookList] = useState([]);
    const [moreToLoad, setMoreToLoad] = useState(true);
    const [page, setPage] = useState(1);
    const perPage = 2;

    const fetchBooks = (newPage) => {
        // page 2  perpage 2
        const apiUrl = `http://localhost:3001/books?page=${newPage}&perPage=${perPage}`;
        fetch(apiUrl, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
            }
          })
          .then((response) => response.json())
          .then((data) => {
                const uniqueBooks = data.filter(
                  (book) => !bookList.some((existingBook) => existingBook.id === book.id)
                );
                if(uniqueBooks.length === 0){
                  setMoreToLoad(false);
                  alert("No more records!");
                }
                else{
                    setBookList([...bookList,...uniqueBooks]);
                }
                  
                console.log('booklist', bookList);
                console.log('unique',uniqueBooks); 
                
            })
        .catch((error) => {
            console.error('Error fetching books:', error);
          });
      };

      useEffect(() => {
        fetchBooks(page);
      }, [page]);
      
      const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        // fetchBooks(nextPage); 
      };
    
    return(
        <div className="bookslist-wrap">
            <h1>Books</h1>
            <ul>
            {bookList.map((book) => (
            <li key={book.id}>
            {/* Render book information */}
            <p>Author: {book.author}</p>
            <hr/>
            <p>Title: {book.title}</p>
            </li>
        ))}
        </ul>
        {!moreToLoad ? null : (
        <button onClick={handleLoadMore}>Load More</button>
      )}
        </div>
    );
    
}
export default Home;