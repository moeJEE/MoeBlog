import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const { id, imageUrl, title, body, tags } = blog;
    const maxLength = 150; // Maximum number of characters to display

    // Function to truncate the text content
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substr(0, maxLength) + '...';
    };

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src={imageUrl} alt={title} />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {title}
                    </h5>
                </a>
                {tags && tags.length > 0 && (
                    <div className="mb-3">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="inline-block px-2 py-1 mr-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full dark:text-gray-300 dark:bg-gray-700"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {truncateText(body, maxLength)}
                </p>

                <Link
                    to={`/blogs/${id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Read more
                    <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </Link>
                <div></div>

            </div>
        </div>
    );
};

export default BlogCard;