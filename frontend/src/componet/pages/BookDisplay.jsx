import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import UserReadBook from '../commonComponet/UserReadBook';
import "../../styles/pages_styles/BookDisplay.css"
import useApiUrl from '../commonComponet/useApiUrl';
import TopAuthorBook from '../commonComponet/TopAuthorBook';

const BookDisplay = () => {
    const baseUrl = useApiUrl()
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const bookId = params.get('Book') || "67dc204ee0fd7353583fbea7";

    const [isOpen, setIsOpen] = useState(false);
    const [bookData, setBookData] = useState(null)

    useEffect(() => {
        getBookData()
        getBookReviw()
    }, [])


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
    const getBookReviw = async (bookId) => {
        if (!bookId) {
            console.error("❌ Error: bookId is missing in API call!");
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/api/v1/review/${bookId}`);

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const responseData = await response.json();
            console.log("Book Reviews:", responseData);
            return responseData;
        } catch (error) {
            console.error("Error fetching book review:", error.message);
        }
    };

    return (
        <>
            <section className='user-Book-read'>
                <UserReadBook bookId={bookId} />
                <button className="view-comments-btn" onClick={() => setIsOpen(true)}>
                    View Comments
                </button>
                <CommentsModal isOpen={isOpen} setIsOpen={setIsOpen} />
            </section>
            <section className='top-author-book'>
                <TopAuthorBook bookData={bookData} />
            </section>
        </>
    )
}


const CommentsModal = (props) => {

    const { isOpen, setIsOpen } = props
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([
        { id: 1, user: "Alice", comment: "This book was amazing!", likes: 2, likedByUser: false },
        { id: 2, user: "Bob", comment: "Loved the storytelling.", likes: 1, likedByUser: false },
    ]);

    const toggleLike = (id) => {
        const updated = comments.map((item) =>
            item.id === id
                ? {
                    ...item,
                    likedByUser: !item.likedByUser,
                    likes: item.likedByUser ? item.likes - 1 : item.likes + 1,
                }
                : item
        );
        setComments(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const newComment = {
            id: Date.now(),
            user: "You",
            comment: commentText.trim(),
            likes: 0,
            likedByUser: false,
        };
        setComments([newComment, ...comments]);
        setCommentText("");
    };


    return (
        <>
            {/* Comments modal */}

            <div className={`comments-modal ${isOpen ? "open" : ""}`}>
                <div className="modal-header">
                    <h3>Comments</h3>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
                </div>

                <div className="modal-body">
                    {comments.length === 0 && <p className="no-comments">No comments yet.</p>}
                    {comments.map((item) => (
                        <div key={item.id} className="comment-box">
                            <div className="comment-top">
                                <p className="username">{item.user}</p>
                                <button
                                    className="like-btn"
                                    onClick={() => toggleLike(item.id)}
                                    title={item.likedByUser ? "Unlike" : "Like"}
                                >
                                    {item.likedByUser ? "❤️" : "🤍"}
                                </button>
                            </div>
                            <p className="comment-text">{item.comment}</p>
                            {item.likes > 0 && (
                                <p className="likes-count">
                                    {item.likes} {item.likes === 1 ? "like" : "likes"}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <form className="comment-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button type="submit">Post</button>
                </form>
            </div>

            {isOpen && <div className="modal-backdrop" onClick={() => setIsOpen(false)} />}
        </>
    );
};

export default BookDisplay
