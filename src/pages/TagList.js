import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

const TagList = () => {
    const { blogs, loading, error } = useContext(DataContext);
    const [tagCounts, setTagCounts] = useState({});

    useEffect(() => {
        if (!blogs.length) return;

        // Extract tags from blogs data
        const allTags = blogs.reduce((acc, blog) => {
            return acc.concat(blog.tags);
        }, []);

        // Calculate tag counts
        const counts = allTags.reduce((acc, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
        }, {});

        setTagCounts(counts);
    }, [blogs]);

    if (loading) return <p className="text-center text-lg text-gray-100 font-semibold my-10">Loading...</p>;
    if (error) return <p className="text-center text-lg text-red-600 font-semibold my-10">{error}</p>;

    return (
        <div className="max-w-5xl mx-auto mt-8">
            <h1 className="text-3xl font-bold text-center text-white mb-7">Tag List</h1>
            <div className="flex justify-center flex-wrap">
                {Object.entries(tagCounts).map(([tagName, count], index) => (
                    <Link to={`/tags/${tagName}`} key={index} className="mx-1 mb-3 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-full">
                        {tagName} <span className="ml-1 text-xs font-semibold px-2 py-1 bg-gray-300 text-gray-900 rounded-full">{count}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TagList;