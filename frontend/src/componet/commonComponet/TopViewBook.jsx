import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "../../styles/top-view-book.css";
import useApiUrl from './useApiUrl';
import BookReviewModal from './BookReviewModal';

const TopViewBook = () => {
    const baseUrl = useApiUrl()

    const [topViewBook, setTopViewBook] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null);

    // Custom Arrows
    const PrevArrow = ({ onClick }) => (
        <div className="slick-arrow slick-prev" onClick={onClick}>
            <i className="fa fa-arrow-circle-left"></i>
        </div>
    );

    const NextArrow = ({ onClick }) => (
        <div className="slick-arrow slick-next" onClick={onClick}>
            <i className="fa fa-arrow-circle-right"></i>
        </div>
    );

    const totalSlides = 10; // Change this based on the number of slides
    const maxDots = 5; // Maximum number of dots to show

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,

        responsive: [
            {
                breakpoint: 1040,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: true,
                    dots: false
                }
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: true,
                    dots: true
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: false,
                    customPaging: function (i) {
                        return i % maxDots === 0 ? <div className="dot"></div> : <div className="dot hidden-dot"></div>;
                    },
                }
            }
        ]
    };

    const getBookData = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/v1/books/getAllBooks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include" // Important for cookies and sessions
            });

            if (!response.ok) {
                console.error("API Error:", response.status, response.statusText);
                return;
            }

            const Bookdata = await response.json();
            // console.log("JSON Data:", Bookdata);
            setTopViewBook(Bookdata.data)

        } catch (error) {
            console.error("Fetch Error:", error);
        }

    }

    useEffect(() => {
        const timer = setTimeout(() => {
            getBookData();
        }, 2000);

        return () => clearTimeout(timer); // Cleanup in case component unmounts before 2s
    }, []);


    const openModal = (book) => {
        setSelectedBook(book);
        setModalOpen(true);
    };

    return (
        <>
            <div className='block topBook_Display'>
                <h1 className='heding'> Top Book Viewer </h1>
                <div className="slider-container">
                    <Slider {...settings}>
                        {topViewBook && topViewBook.length > 0 ? (
                            topViewBook.map((book, index) => (
                                <div className='book-card' key={index} onClick={() => openModal(book)}>
                                    <img src={book.coverImage} alt={book.bookName} />
                                    <div className='book-details'>
                                        <h3 className="book-title">{book.bookName}</h3>
                                        <p className="book-author">author  {book.author}</p>
                                        <p className="book-price">${book.price}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            [...Array(4)].map((_, i) => (
                                <div className='lodar' key={i}></div>
                            ))
                        )}
                    </Slider>
                </div>
            </div >
            <BookReviewModal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                book={selectedBook}
            // userReview={{
            //     rating: 4,
            //     reviewText: "This book was amazing! Highly recommend."
            // }} 
            />
        </>
    );
}

export default TopViewBook;
