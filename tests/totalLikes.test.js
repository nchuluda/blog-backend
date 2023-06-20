const totalLikes = require('../utils/list_helper').totalLikes

const singleBlog = [
    {
        "title": "Wild Fermentation Blog",
        "author": "Sandor Katz",
        "url": "https://www.wildfermentation.com/fermentation-blog/",
        "likes": 5,
        "id": "6490e06b72ca4ea146688837"
    }
]

const multipleBlogs = [
    {
        "title": "Wild Fermentation Blog",
        "author": "Sandor Katz",
        "url": "https://www.wildfermentation.com/fermentation-blog/",
        "likes": 5,
        "id": "6490e06b72ca4ea146688837"
    },
    {
        "title": "Fermented Food Lab",
        "author": "Danielle Raminez",
        "url": "https://www.fermentedfoodlab.com/blog/",
        "likes": 3,
        "id": "6490e07b72ca4ea146688839"
    },
    {
        "title": "Make Sauerkraut!",
        "author": "Holly Howe",
        "url": "https://www.makesauerkraut.com/blog/",
        "likes": 6,
        "id": "6490e08172ca4ea14668883b"
    },
    {
        "title": "Mr. Kimchi Blog",
        "author": "Seung Hyun",
        "url": "https://mrkimchi.co.uk/blog/",
        "likes": 4,
        "id": "6490e08772ca4ea14668883d"
    }
]

describe('total likes', () => {
  test('of single blog', () => {
    expect(totalLikes(singleBlog)).toBe(5)
  })

  test('of multiple blogs is calculated correctly', () => {
    expect(totalLikes(multipleBlogs)).toBe(18)
  })

  test('of empty array is zero', () => {
    expect(totalLikes([])).toBe(0)
  })
})