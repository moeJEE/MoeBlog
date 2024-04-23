import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import ConfirmationModal from '../components/ConfirmationModal';

const BlogDetails = ({ onConfirmDelete }) => {
    const navigate = useNavigate();
    const { blogId } = useParams();
    const { blogs, loading, error, deleteBlog } = useData();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);

    const handleDelete = async (id) => {
        try {
            await deleteBlog(id);
            setShowConfirmation(false);
            navigate('/blogs'); // Redirect to the blogs page after successful deletion
        } catch (error) {
            console.error('Failed to delete blog:', error);
        }
    };

    const openConfirmation = (blogId) => {
        setShowConfirmation(true);
        setBlogToDelete(blogId);
    };

    const blog = blogs.find((b) => b.id === blogId);

    if (loading) return <p className="text-center text-lg text-gray-100 font-semibold my-10">Loading...</p>;
    if (error) return <p className="text-center text-lg text-red-600 font-semibold my-10">{error}</p>;

    if (!blog) return <p>No blog found!</p>;

    const { title, publishedDate, tags, imageUrl, body } = blog;

    return (
        <article className="max-w-5xl mx-auto p-5">
            <header className="mb-14 p-5 rounded-lg bg-gray-800">
                <h1 className="text-3xl text-center font-bold text-gray-100 mt-0 mb-3">{title}</h1>
                <div className="text-center text-gray-100">
                    Published on {new Date(publishedDate).toLocaleDateString()} at {new Date(publishedDate).toLocaleTimeString()}
                </div>
                <div className="mt-3 text-center">
                    {tags && tags.map(tag => (
                        <Link key={tag} to={`/tags/${tag}`}
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-700 m-0.5">
                            #{tag}
                        </Link>
                    ))}
                </div>
                <div className="mt-10 mx-auto">
                    <img className="w-full max-w-2xl mx-auto rounded-lg" src={imageUrl} alt={`Thumbnail of ${title}`} />
                </div>
            </header>
            <div id="content" className="prose text-gray-800 max-w-none">
                <p className="text-gray-100 text-justify">{body}</p>
            </div>
            <button onClick={() => openConfirmation(blogId)}
                className="mt-5 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300">
                Delete
            </button>
            {showConfirmation && (
                <ConfirmationModal
                    onCancel={() => setShowConfirmation(false)}
                    onConfirm={() => handleDelete(blogToDelete)}
                />
            )}
        </article>
    );
};

export default BlogDetails;
