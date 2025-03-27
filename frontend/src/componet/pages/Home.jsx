import React, { useEffect, useState } from 'react';
import "../../styles/pages_styles/Home.css";
import TopViewBook from '../commonComponet/TopViewBook';
import useApiUrl from '../commonComponet/useApiUrl';
import BookReviewModal from '../commonComponet/BookReviewModal';
import TopAuthorBook from '../commonComponet/TopAuthorBook'

const Home = () => {
    const baseUrl = useApiUrl();

    const [bookData, setBookData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null);
    const [userReview, setUserReview] = useState(null)

    useEffect(() => {
        getBookData()
    }, [])

    const toggalModal = (book) => {
        setUserReview(null)
        if (book) {
            getBookReviw(book?._id);
            setSelectedBook(book);
        }
        setModalOpen(!modalOpen)

    }

    const getBookReviw = async (bookId) => {
        try {
            const response = await fetch(`${baseUrl}/api/v1/review/bookId/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ bookId })  // Send bookId in the request body
            });

            if (!response.ok) {
                throw new Error("Failed to fetch review data");
            }

            const responseData = await response.json();

            if (responseData?.data) {
                setUserReview({
                    rating: responseData?.data?.review[0].rating,
                    reviewText: responseData?.data?.review[0].comment

                })
            }
            return responseData;
        } catch (error) {
            console.log("Error fetching book review:", error);
            return null;
        }
    };

    const getBookData = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/v1/books/getAllBooks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if (!response.ok) {
                console.error("API Error:", response.status, response.statusText);
                return;
            }

            const Bookdata = await response.json();
            setBookData(Bookdata?.data)

        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    return (
        <>

            <section className='book_slide block'>
                <div className='background_Book_image'>
                    <h1>
                        Welcome to our online book store<br />
                        <div className="typing-container">
                            <div className="text text-1">Designed and developed by Utsav, Vishesh, and Manan</div>
                            <div className="text text-2">Created by Manan, Utsav, and Vishesh</div>
                        </div>
                    </h1>
                </div>
            </section>

            <section className='top-view-book-display'>
                <TopViewBook
                    bookData={bookData}
                    toggalModal={toggalModal}
                />
            </section>
            <section className='top-author-book'>
                <TopAuthorBook bookData={bookData} />
            </section>

            <BookReviewModal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                book={selectedBook}
                userReview={userReview}
            />
        </>

    )
}

export default Home
