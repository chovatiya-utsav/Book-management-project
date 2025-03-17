import React from 'react';
import Slider from "react-slick";
import "../../styles/top-view-book.css";

const TopViewBook = () => {
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

    return (
        <div className='block topBook_Display'>
            <h1 className='heding'> Top Book Viewer </h1>
            <div className="slider-container">
                <Slider {...settings}>
                    {[...Array(totalSlides)].map((_, index) => (
                        <div className='book-info' key={index}>
                            <img src={`/images/slied_Book_Background_img/background_BookStore(${(index % 4) + 1}).png`} alt={`Book Cover ${index + 1}`} />
                            <h3 className="image-title">Book Title {index + 1}</h3>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default TopViewBook;
