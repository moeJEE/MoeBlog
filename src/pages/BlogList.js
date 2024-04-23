import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import BlogCard from './../components/BlogCard';
import ConfirmationModal from './../components/ConfirmationModal';

const BlogList = ({ title }) => {
    const { blogs, loading, error, deleteBlog } = useData();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);

    const handleDelete = async (id) => { // Corrected the parameter passing
        try {
            await deleteBlog(id);
            setShowConfirmation(false);
        } catch (error) {
            console.error('Failed to delete blog:', error);
        }
    };

    const openConfirmation = (blogId) => {
        setShowConfirmation(true);
        setBlogToDelete(blogId);
    };

    if (loading) return <p className="text-center text-lg text-gray-100 font-semibold my-10">Loading...</p>;
    if (error) return <p className="text-center text-lg text-red-600 font-semibold my-10">{error}</p>;

    return (
        <div className="max-w-5xl mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-4 text-center text-white p-4 rounded-lg">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {blogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} onConfirmDelete={openConfirmation} />
                ))}
            </div>
            {showConfirmation && (
                <ConfirmationModal
                    onCancel={() => setShowConfirmation(false)}
                    onConfirm={() => handleDelete(blogToDelete)} // Corrected the parameter passing
                />
            )}
        </div>
    );
};


export default BlogList;