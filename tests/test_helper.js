const Blog = require('../models/blog')
const User = require('../models/user')

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
    return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}