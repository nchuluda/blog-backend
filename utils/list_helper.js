const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return likes
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return "Blog list empty"
    }

    const favorite = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}
  
module.exports = {
  dummy,
  favoriteBlog,
  totalLikes
}