import React, { useEffect, useState } from 'react'
import TopViewBook from '../commonComponet/TopViewBook';
import useApiUrl from '../commonComponet/useApiUrl';
import BookReviewModal from '../commonComponet/BookReviewModal';
import "../../styles/pages_styles/Library.css"

const Library = () => {
    const baseUrl = useApiUrl();

    const [bookData, setBookData] = useState(null)
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
        <div>
            <section className='top-view-book-display'>
                <TopViewBook toggalModal={toggalModal} bookData={bookData} />
            </section>
            <section className='book-Library-Container'>
                <div className='book-card'>
                    <img src="./images/slied_Book_Background_img/background_BookStore(3).png" alt="" />
                    <div className='book-info'>
                        <h1 className='book-name'>book title</h1>
                        <h2 className='author-name'>author name</h2>
                        <p className='book-amount'>price</p>
                    </div>
                </div>
            </section>
            
            <BookReviewModal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                book={selectedBook}
                userReview={userReview}
            />
        </div>
    )
}

export default Library;
