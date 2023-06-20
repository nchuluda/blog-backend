const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Wild Fermentation Blog",
        author: "Sandor Katz",
        url: "https://www.wildfermentation.com/fermentation-blog/",
        likes: 5
    },
    {
        title: "Fermented Food Lab",
        author: "Danielle Raminez",
        url: "https://www.fermentedfoodlab.com/blog/",
        likes: 3
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}