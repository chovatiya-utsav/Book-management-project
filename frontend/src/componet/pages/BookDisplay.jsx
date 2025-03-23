import React from 'react'
import { useLocation } from 'react-router';

const BookDisplay = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const bookId = params.get('Book');

    return (
        <div>
            {bookId}
        </div>
    )
}

export default BookDisplay
