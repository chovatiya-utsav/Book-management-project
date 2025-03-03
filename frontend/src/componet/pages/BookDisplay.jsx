import React, { useState } from "react";
import "../../styles/pages_styles/BookDisplay.css";

const BookDisplay = () => {
    const [flippedPages, setFlippedPages] = useState(0);
    const [frontPageDisplay, setFrontPageDisplay] = useState(1);
    const totalPages = 3; // Total pages

    const flipPage = (direction) => {
        setFlippedPages((prev) => {
            if (direction === "next" && prev < totalPages) {
                return prev + 1;
            } else if (direction === "prev" && prev > 0) {
                return prev - 1;
            }
            return prev;
        });
        setFrontPageDisplay((prev) => {
            if (direction === "next") {
                return prev + 1;
            } else if (direction === "prev" && prev > 0) {
                return prev - 1;
            }
            return prev;
        })
    };

    return (
        <div className="Book_Body">
            {/* Left Arrow Button */}
            <button
                className={`prev_button ${flippedPages > 0 && flippedPages < 3 ? "prve_button_move" : ""}`}
                onClick={() => flipPage("prev")}
            >
                <i className="fa fa-arrow-circle-left"></i>
            </button>

            {/* Book Pages */}
            <div className={`Book ${flippedPages > 0 && flippedPages < 3 ? "Book_move" : ""} ${flippedPages === 3 ? "Book_curent_location" : ""}`} >
                {[1, 2, 3].map((page) => (
                    <div key={page} id={`${frontPageDisplay === page ? "p1" : "p2"}`} className={`page ${flippedPages >= page ? "flipped" : ""}`}>
                        <div className="front">
                            <div className="front-content">
                                <h1>Front {page}
                                </h1>
                            </div>
                        </div>
                        <div className="back">
                            <div className="back-content">
                                <h1>Back {page}</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Arrow Button */}
            <button
                className={`next_button ${flippedPages > 0 && flippedPages < 3 ? "next_button_move" : ""}`}
                onClick={() => flipPage("next")}
            >
                <i className="fa fa-arrow-circle-right"></i>
            </button>
        </div >
    );
};

export default BookDisplay;
