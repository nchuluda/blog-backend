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

    const mostBlogs = _(blogs)
        .groupBy("author")
        .map((author, id) => ({
            author: id,
            blogs: author.length
        }))
        .maxBy("blogs")
    
    return mostBlogs
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return "Blog list empty"
    }

    const mostLikes = _(blogs)
        .groupBy("author")
        .map((author, id) => ({
            author: id,
            likes: _.sumBy(author, "likes")
        }))
        .maxBy("likes")

    return mostLikes
}

const totalLikes = (blogs) => {
    const likes = blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return likes
}

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes
}