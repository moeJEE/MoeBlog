import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogCard from './../components/BlogCard';
import ConfirmationModal from './../components/ConfirmationModal';
import { useData } from '../context/DataContext';

const FilteredBlogList = ({ title }) => {
    const { tagName } = useParams(); // Get the tag name from URL parameters
    const { loading, setLoading, error, setError, deleteBlog } = useData();
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);

    useEffect(() => {
        const fetchAndFilterBlogs = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/tags/${tagName}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch blogs for tag: ${tagName}`);
                }
                const taggedBlogs = await response.json();
                // Apply filtering logic here
                const filteredData = taggedBlogs.filter(blog => blog.tags.includes(tagName));
                if (filteredData.length > 0) {
                    setFilteredBlogs(filteredData);
                } else {
                    setError(`No blogs found with the tag: ${tagName}`);
                }
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };

        fetchAndFilterBlogs();
    }, [tagName, setLoading, setError]);

    const handleDelete = async () => {
        try {
            await deleteBlog(blogToDelete);
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
                {filteredBlogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} onConfirmDelete={openConfirmation} />
                ))}
            </div>
            {showConfirmation && (
                <ConfirmationModal
                    onCancel={() => setShowConfirmation(false)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
};

export default FilteredBlogList;
