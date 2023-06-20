const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return "Blog list empty"
    }

    const favorite = blogs.reduce((a, b) => a.likes > b.likes ? a : b)

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return "Blog list empty"
    }
    
    const { author }  = _.maxBy(blogs, (blog) => blog.author)
    const totalBlogs = blogs.reduce((sum, e) => e.author === author ? sum + 1 : sum, 0)

    return {
        author: author,
        blogs: totalBlogs
    }
}

const totalLikes = (blogs) => {
    const likes = blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return likes
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  totalLikes
}