const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('id for blog is defined', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a new blog can be added', async () => {
  const newBlog = {
    title: "Make Sauerkraut!",
    author: "Holly Howe",
    url: "https://www.makesauerkraut.com/blog",
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(n => n.title)
  expect(title).toContain("Make Sauerkraut!")

  const author = blogsAtEnd.map(n => n.author)
  expect(author).toContain("Holly Howe")

  const url = blogsAtEnd.map(n => n.url)
  expect(url).toContain("https://www.makesauerkraut.com/blog")

  const likes = blogsAtEnd.map(n => n.likes)
  expect(likes).toContain(2)
})

afterAll(async () => {
  await mongoose.connection.close()
})