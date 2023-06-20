const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

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

test('blog added without likes defaults to 0 likes', async () => {
  const newBlog = {
    title: "Test new blog without likes",
    author: "Testy Tester",
    url: "https://www.thisisatest.com/"
  }

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(result.body.likes).toBe(0)
})

test('blog added without title or url is rejected', async () => {
  const blogWithoutTitle = {
    author: "Mr. Ghost",
    url: "https://fakedomainname.com",
    likes: 10
  }

  const blogWithoutUrl = {
    title: "Invisible Blog",
    author: "Mr. Ghost",
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

afterAll(async () => {
  await mongoose.connection.close()
})