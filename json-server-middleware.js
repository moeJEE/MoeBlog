module.exports = (req, res, next) => {
    if (req.path.includes('/tags/')) {
        const tagName = req.path.split('/').pop();
        const db = require('./data/db.json'); // adjust the path to your db.json
        const matchingBlogs = db.blogs.filter(blog => blog.tags.includes(tagName));
        if (matchingBlogs.length > 0) {
            res.status(200).json(matchingBlogs);
        } else {
            res.status(404).send('No blogs found with tag: ' + tagName);
        }
    } else {
        next();
    }
};
