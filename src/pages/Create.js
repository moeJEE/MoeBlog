import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DataContext } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const { tags, loading, error } = useContext(DataContext);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const initialValues = {
        author: '',
        title: '',
        imageUrl: '',
        body: '',
        tags: []
    };

    const validationSchema = Yup.object({
        author: Yup.string().required('Author name is required'),
        title: Yup.string().required('Title is required'),
        imageUrl: Yup.string().url('Invalid URL').required('Image URL is required'),
        body: Yup.string().required('Description is required'),
        tags: Yup.array().of(Yup.string()).required('At least one tag is required')
    });

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/blogs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                resetForm();
                setSubmitSuccess(true);
                setTimeout(() => setSubmitSuccess(false), 10000); // Success message disappears after 3 seconds
                navigate('/blogs'); // Navigate to '/blogs' after successful submission
            } else {
                throw new Error("Failed to submit blog");
            }
        } catch (error) {
            console.error("Submission error: ", error);
        }
        setSubmitting(false);
    };

    if (loading) return <p className="text-center text-lg text-gray-100 font-semibold my-10">Loading...</p>;
    if (error) return <p className="text-center text-lg text-red-600 font-semibold my-10">{error}</p>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-lg p-8 bg-gray-900 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">Create a New Blog</h2>
                {submitSuccess && (
                    <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                        Blog successfully created!
                    </div>
                )}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ setFieldValue, isSubmitting, values }) => (
                        <Form className="space-y-6">
                            <div className="flex justify-between space-x-4">
                                <div className="flex-1">
                                    <label htmlFor="author" className="block text-sm font-medium text-gray-300">Author</label>
                                    <Field name="author" type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500" />
                                    <ErrorMessage name="author" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
                                    <Field name="title" type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500" />
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300">Image URL</label>
                                <Field name="imageUrl" type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500" />
                                <ErrorMessage name="imageUrl" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div>
                                <label htmlFor="body" className="block text-sm font-medium text-gray-300">Description</label>
                                <Field as="textarea" name="body" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500" rows="3" />
                                <ErrorMessage name="body" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Tags</label>
                                <div className="mt-2">
                                    {tags.map(tag => (
                                        <label key={tag} className="inline-flex items-center mx-1 mb-2 px-3 py-1 bg-gray-300 text-gray-800 rounded-full">
                                            <input type="checkbox" value={tag} onChange={e => {
                                                const newTags = values.tags.includes(tag)
                                                    ? values.tags.filter(t => t !== tag)
                                                    : [...values.tags, tag];
                                                setFieldValue('tags', newTags);
                                            }} checked={values.tags.includes(tag)} className="mr-2" />
                                            {tag}
                                        </label>
                                    ))}
                                </div>
                                <ErrorMessage name="tags" component="div" className="text-red-500 text-sm" />
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full px-4 py-2 text-white bg-gray-800 hover:bg-gray-500 rounded-md">
                                {isSubmitting ? 'Submitting...' : 'Create Blog'}
                            </button>
                        </Form>

                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CreateBlog;