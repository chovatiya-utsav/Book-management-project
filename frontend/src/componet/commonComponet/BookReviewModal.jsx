import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import '../../styles/BookReviewModal.css';

const BookReviewModal = ({ show, onClose, book, userReview }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (userReview) {
            setRating(userReview.rating);
            setReviewText(userReview.reviewText);
        } else {
            setRating(0);
            setReviewText("");
        }
    }, [show, userReview])

    const navigate = useNavigate()

    if (!show || !book) return null;


    const handleSubmit = () => {
        if (!rating || !reviewText.trim()) {
            setSuccessMessage("Please select a rating and write a review.");
            setTimeout(() => {
                setSuccessMessage(null)
            }, 2000);
            return;
        }

        // You can send this data to your backend here
        console.log({
            bookId: book._id,
            rating,
            reviewText
        });
        setSuccessMessage("✅ Review successfully submitted!");
        setTimeout(() => {
            setSuccessMessage(null)
        }, 2000);
        setRating(0);
        setReviewText("");
    };

    const readBook = (id) => {
        if (rating && reviewText && !userReview) {
            setSuccessMessage("✅ Review successfully submitted!");
        }
        setTimeout(() => {
            navigate(`/BookDisplay?Book=${id}`)
            onClose()
        }, 1000);
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {successMessage ?
                    <div className='success-msg'>
                        <h1>{successMessage}</h1>
                    </div>

                    : null}
                <button className="close-btn" onClick={onClose}>✖</button>
                <div className='book-detail'>
                    <div className='book-img'>
                        <img src={book.coverImage} alt="Book Cover" className="modal-book-image" />
                    </div>
                    <div className='book-info'>
                        <div className='book-content'>
                            <h2 className="modal-book-title">{book.bookName}</h2>
                            <p className="modal-author">By {book.author}</p>
                            <div className="star-rating">
                                <div className='rating'>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`star ${star <= hover || rating ? 'filled' : ''}`}
                                            onClick={!userReview ? () => setRating(star) : undefined}
                                            onMouseEnter={!userReview ? () => setHover(star) : undefined}
                                            onMouseLeave={!userReview ? () => setHover(null) : undefined}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>

                                {userReview ? (
                                    <p className="read-only-review">{userReview.reviewText}</p>
                                ) : (
                                    <textarea
                                        placeholder="Write your review..."
                                        className="review-input"
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="modal-buttons">
                            {!userReview && (
                                <div className="review-btn">
                                    <button className="btn primary" onClick={handleSubmit}>Submit Review</button>
                                </div>
                            )}
                            <div className='book-btn'>
                                <button className="btn primary" onClick={() => alert("Added to cart")}>Add to Cart</button>
                                <button className="btn success" onClick={() => readBook(book._id)}>Read Book</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default BookReviewModal;
