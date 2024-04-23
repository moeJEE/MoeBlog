import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchBlogs, deleteBlog as apiDeleteBlog } from '../services/DataService';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const fetchedBlogs = await fetchBlogs();
                setBlogs(fetchedBlogs);
                const allTags = new Set(fetchedBlogs.flatMap(blog => blog.tags));
                setTags([...allTags]);
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const deleteBlog = async (blogId) => {
        try {
            setLoading(true);
            await apiDeleteBlog(blogId);
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));
        } catch (error) {
            setError(`Error deleting blog: ${error.toString()}`);
            // Optionally, re-fetch blogs or use other methods to handle errors
        } finally {
            setLoading(false);
        }
    };

    return (
        <DataContext.Provider value={{
            blogs, setBlogs, tags, setTags, loading, setLoading, error, setError, deleteBlog
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);