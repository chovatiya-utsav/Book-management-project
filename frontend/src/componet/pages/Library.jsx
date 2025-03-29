import React, { useEffect, useState } from 'react';
import TopViewBook from '../commonComponet/TopViewBook';
import useApiUrl from '../commonComponet/useApiUrl';
import BookReviewModal from '../commonComponet/BookReviewModal';
import '../../styles/pages_styles/Library.css';

const Library = () => {
    const baseUrl = useApiUrl();

    const [bookData, setBookData] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [userReview, setUserReview] = useState(null);

    const [searchText, setSearchText] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchBooks();
        const user =
            JSON.parse(localStorage.getItem('userLogin')) ||
            JSON.parse(localStorage.getItem('userAdminLogin')) || null;
        setUserData(user?._id || null);
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/v1/books/getAllBooks`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Failed to fetch books');
            const data = await res.json();
            setBookData(data?.data || []);
            setFilteredBooks(data?.data || []);
        } catch (err) {
            console.error('Fetch Error:', err);
        }
    };

    const uniqueAuthors = [...new Set(bookData.map(book => book.author))];

    const filterBooks = () => {
        let result = [...bookData];

        if (selectedAuthor) {
            result = result.filter(book => book.author === selectedAuthor);
        }

        if (searchText) {
            result = result.filter(book =>
                book.bookName.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        if (selectedPriceRange) {
            const [min, max] = selectedPriceRange.split('-').map(Number);
            result = result.filter(book => book.price >= min && book.price <= max);
        }

        setFilteredBooks(result);
    };

    useEffect(() => {
        filterBooks();
    }, [searchText, selectedAuthor, selectedPriceRange]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (bookName) => {
        setSearchText(bookName);
        setShowSuggestions(false);
    };

    const handleAuthorChange = (e) => {
        setSelectedAuthor(e.target.value);
        setSearchText('');
        setSelectedPriceRange('');
        setShowSuggestions(false);
    };

    const handlePriceChange = (e) => {
        setSelectedPriceRange(e.target.value);
    };

    const clearFilters = () => {
        setSearchText('');
        setSelectedAuthor('');
        setSelectedPriceRange('');
        setShowSuggestions(false);
    };

    const toggleModal = (book) => {
        setUserReview(null);
        if (book) {
            fetchBookReview(book._id);
            setSelectedBook(book);
        }
        setModalOpen(!modalOpen);
    };

    const fetchBookReview = async (bookId) => {
        if (!bookId || !userData) return;

        try {
            const res = await fetch(`${baseUrl}/api/v1/review/${bookId}`);
            if (!res.ok) throw new Error('Failed to fetch review');
            const data = await res.json();

            const userReview = data?.data?.review?.find(r => r.user._id === userData);
            if (userReview) {
                setUserReview({
                    rating: userReview.rating,
                    reviewText: userReview.comment,
                });
            }
        } catch (err) {
            console.error('Review Fetch Error:', err);
        }
    };

    return (
        <div>
            <section className='top-view-book-display'>
                <TopViewBook toggalModal={toggleModal} bookData={bookData} />
            </section>

            <section className='book-Library-Container'>
                <div className='search-bar'>
                    <input
                        type='text'
                        placeholder='Search by book name...'
                        value={searchText}
                        onChange={handleSearchChange}
                    />

                    <button onClick={filterBooks}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>

                    <div className='filter-group'>
                        <select value={selectedAuthor} onChange={handleAuthorChange} className='authoe-filter'>
                            <option value="">All Authors</option>
                            {uniqueAuthors.map((author, i) => (
                                <option key={i} value={author}>{author}</option>
                            ))}
                        </select>

                        <select value={selectedPriceRange} onChange={handlePriceChange} className='price-filter'>
                            <option value="">All Prices</option>
                            <option value="0-199">Below ₹200</option>
                            <option value="200-499">₹200 - ₹499</option>
                            <option value="500-999">₹500 - ₹999</option>
                            <option value="1000-9999">Above ₹1000</option>
                        </select>

                        <button className="clear-filters" onClick={clearFilters}>
                            Clear Filters
                        </button>
                    </div>

                    {showSuggestions && searchText && (
                        <ul className='suggestion-list'>
                            {filteredBooks.length > 0 ? (
                                filteredBooks.map((book, i) => (
                                    <li key={i} onClick={() => handleSuggestionClick(book.bookName)}>
                                        {book.bookName}
                                    </li>
                                ))
                            ) : (
                                <li>No matches found</li>
                            )}
                        </ul>
                    )}
                </div>

                <div className='book-Container'>
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book, index) => (
                            <div className='book-card' key={index} onClick={() => toggleModal(book)}>
                                <img src={book.coverImage} alt="book-cover" />
                                <div className='book-info'>
                                    <h1 className='book-name'>{book.bookName}</h1>
                                    <h2 className='author-name'>by {book.author}</h2>
                                    <p className='book-amount'>₹{book.price}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No books found matching the filters.</p>
                    )}
                </div>

                <h2 className='all-books-heading'>All Books</h2>
                <div className='book-Container '>
                    {bookData?.map((item, index) => (
                        <div className='book-card' key={index} onClick={() => toggleModal(item)}>
                            <img src={item?.coverImage} alt="book-cover" />
                            <div className='book-info'>
                                <h1 className='book-name'>{item?.bookName}</h1>
                                <h2 className='author-name'>by {item?.author}</h2>
                                <p className='book-amount'>₹{item?.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
            </section>

            <BookReviewModal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                book={selectedBook}
                userReview={userReview}
            />
        </div>
    );
};

export default Library;
