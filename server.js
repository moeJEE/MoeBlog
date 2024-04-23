const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Custom middleware to handle the /tags/:tagName route
server.use('/tags/:tagName', (req, res, next) => {
    const tagName = req.params.tagName;
    const blogs = router.db.get('blogs').value();
    const filteredBlogs = blogs.filter(blog => blog.tags.includes(tagName));
    if (filteredBlogs.length > 0) {
        res.json(filteredBlogs);
    } else {
        res.status(404).send('No blogs found with tag: ' + tagName);
    }
});

server.use(router);

server.listen(8000, () => {
    console.log('JSON Server is running on http://localhost:8000');
});
