import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "../../styles/top-view-book.css";

const TopViewBook = () => {

    const [topViewBook, setTopViewBook] = useState(null)

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
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,

        responsive: [
            {
                breakpoint: 1040,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
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

    useEffect(() => {
        setTimeout(async () => {
            try {
                const response = await fetch("https://d877-103-181-126-16.ngrok-free.app/api/v1/books/getAllBooks");

                if (!response.ok) {
                    console.error("API Error:", response.status, response.statusText);
                    return;
                }

                const rdata = await response.json();
                console.log("JSON Data:", rdata);
                setTopViewBook(rdata.data);

            } catch (error) {
                console.error("Fetch Error:", error);
            }
        }, 1000);
    }, [topViewBook]);


    return (
        <div className='block topBook_Display'>
            <h1 className='heding'> Top Book Viewer </h1>
            <div className="slider-container">
                <Slider {...settings}>
                    {topViewBook && topViewBook.length > 0 ? (
                        topViewBook.map((book, index) => (
                            <div className='book-info' key={book._id}>
                                <img src={book.coverImage} alt={book.bookName} />
                                <h3 className="image-title">{book.bookName}</h3>
                                <p className="author">by {book.author}</p>
                                <p className="price">${book.price}</p>
                            </div>
                        ))
                    ) : (
                        <p>Loading books...</p>
                    )}
                </Slider>

            </div>
        </div>
    );
}

export default TopViewBook;
