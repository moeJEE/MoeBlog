import React from 'react';

function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <h2 className="text-4xl font-semibold text-gray-700">Page Not Found</h2>
                <p className="text-lg text-gray-600 mt-4">Sorry, the page you are looking for does not exist.</p>
                <a href="/" className="mt-6 text-blue-600 hover:text-blue-800 visited:text-purple-600">Go Home</a>
            </div>
        </div>
    );
}

export default NotFound;
