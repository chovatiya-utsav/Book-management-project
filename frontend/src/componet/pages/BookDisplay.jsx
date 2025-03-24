import React from 'react'
import { useLocation } from 'react-router';
import UserReadBook from '../commonComponet/UserReadBook';

const BookDisplay = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const bookId = params.get('Book');

    return (
        <section className='user-Book-read'>
            <UserReadBook bookId={bookId} />
        </section>
    )
}

export default BookDisplay
