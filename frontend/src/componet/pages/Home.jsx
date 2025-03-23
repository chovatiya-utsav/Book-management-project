import React, { useEffect, useState } from 'react';
import "../../styles/pages_styles/Home.css";
import TopViewBook from '../commonComponet/TopViewBook';

const Home = () => {


    const [textIndex, setTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    useEffect(() => {
        const texts = [
            "Designed and developed by Utsav, Vishesh, and Manan",
            "Created by  Manan, Utsav, and Vishesh"
        ];
        const currentText = texts[textIndex];
        let timeout;

        if (isDeleting) {
            timeout = setTimeout(() => {
                setDisplayText((prev) => prev.slice(0, -1));
            }, 50);
        } else {
            timeout = setTimeout(() => {
                setDisplayText((prev) => currentText.slice(0, prev.length + 1));
            }, 100);
        }

        if (!isDeleting && displayText === currentText) {
            timeout = setTimeout(() => setIsDeleting(true), 1500);
        }

        if (isDeleting && displayText === '') {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, textIndex]);
    return (
        <>
            <section className='book_slide block'>
                <div className='background_Book_image'>
                    <h1>
                        Welcome to our online book store<br />
                        <span className="typewriter-text">
                            {displayText}
                            <span className="cursor"></span>
                        </span>
                    </h1>
                </div>
            </section>
            <section className='top-view-book-display'>
                <TopViewBook />
            </section>
        </>

    )
}

export default Home
