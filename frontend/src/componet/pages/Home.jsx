import React from 'react';
import "../../styles/pages_styles/Home.css";
import TopViewBook from '../commonComponet/TopViewBook';

const Home = () => {
    return (
        <>
            <section className='book_slide block'>
                <div className='background_Book_image'>
                    <h1>welcome to  our online book store</h1>
                </div>
            </section>
            <section className='top-view-book-display'>
                <TopViewBook />
            </section>
        </>

    )
}

export default Home
