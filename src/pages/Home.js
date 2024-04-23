import React from 'react';
import BlogList from './BlogList';

const Home = () => {
    return (
        <div className="home min-h-screen bg-gray-800 py-10 px-5">
            <BlogList title="All Blogs!" />
        </div>
    );
}

export default Home;