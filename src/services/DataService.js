// DataService.js
export async function fetchBlogs() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/blogs`);
    if (!response.ok) {
        throw new Error('Failed to fetch blogs');
    }
    return response.json();
}

export async function deleteBlog(blogId) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to delete blog with ID: ${blogId}`);
    }
    return response.ok;
}




