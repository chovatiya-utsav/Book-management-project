import React, { useState } from 'react';
import "../../styles/TopAuthorBook.css";

const TopAuthorBook = ({ bookData }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [expandedDescIndex, setExpandedDescIndex] = useState(null);

    const handleNext = (index = null) => {
        if (index !== null && index !== activeIndex) {
            setActiveIndex(index);
            setExpandedDescIndex(null);
        } else if (activeIndex < bookData.length - 1) {
            setActiveIndex(prev => {
                setExpandedDescIndex(null);
                return prev + 1;
            });
        }
    };
    const handlePrev = () => {
        if (activeIndex > 0) {
            setActiveIndex(prev => {
                setExpandedDescIndex(null);
                return prev - 1;
            });
        }
    };

    return (
        <div className="book-slider-container">
            <div className="book-slider">
                {bookData?.map((data, index) => {
                    // Show only active + 4 next books
                    if (index < activeIndex || index > activeIndex + 4) return null;

                    const isActive = index === activeIndex;
                    const position = index - activeIndex;
                    const isExpanded = expandedDescIndex === index;

                    return (
                        <div
                            onClick={() => !isActive && handleNext(index)}
                            key={index}
                            className={`slides ${isActive ? "active" : "deactive"}`}
                            style={{
                                "--img": `url(${data?.coverImage})`,
                                left: isActive ? '0' : `calc(50% + ${position * 260}px)`,
                                zIndex: isActive && isExpanded ? 10 : 0,
                            }}
                        >
                            <div className={`content ${isActive ? "active" : "deactive"}`}>
                                <div className='author-info'>
                                    <img src="/images/author-image.png" alt="author-image" />
                                    <h2>{data?.author}</h2>
                                </div>
                                <div className='book-info'>
                                    <h1>{data?.bookName}</h1>
                                    <p className={isExpanded ? "expanded" : "collapsed"}>
                                        {data?.description}
                                    </p>
                                    <button
                                        className="read-more-btn"
                                        onClick={() =>
                                            setExpandedDescIndex(isExpanded ? null : index)
                                        }
                                    >
                                        {isExpanded ? "Read Less" : "Read More"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation */}
            <div className='button'>
                <button className="prev-button" onClick={handlePrev}>Prev</button>
                <button className="next-button" onClick={() => handleNext()}>Next</button>
            </div>
        </div>
    );
};

export default TopAuthorBook;
