import React, { useState, useEffect } from "react"; // Added useEffect import
import Weather from "./Weather";
import Calender from "./calender";
import "./News.css";
import userImg from "../assets/images/user.jpg";
import techImg from "../assets/images/tech.jpg";
import sportsImg from "../assets/images/sports.jpg";
import scienceImg from "../assets/images/science.jpg";
import worldImg from "../assets/images/world.jpg";
import healthImg from "../assets/images/health.jpg";
import nationImg from "../assets/images/nation.jpg";
import axios from "axios";
import NewsModel from "./NewsModal";
import Bookmarks from "./Bookmarks";
import noImg from "../assets/images/no-img.png"; // Import noImg
import BlogsModal from "./BlogsModal";

const News = ({ onShowBlogs, blogs, onEditBlog, onDeleteBlog }) => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]); // Fixed variable name
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showBlogModal, setShowBlogModal] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=1265ad91dd56284db7de8334bd2276b6`; // Updated API key

      try {
        const response = await axios.get(url);
        const fetchedNews = response.data.articles; // Fixed variable name
        setHeadline(fetchedNews[0]);
        setNews(fetchedNews); // Added to set news state
        console.log(fetchedNews[0]);
      } catch (error) {
        console.error("Error fetching news:", error); // Added error handling
      }
      const saveBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
      setBookmarks(saveBookmarks); // Load bookmarks from local storage
    };

    fetchNews();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        const url = `https://gnews.io/api/v4/search?q=${searchQuery}&apikey=1265ad91dd56284db7de8334bd2276b6`; // Updated API key

        try {
          const response = await axios.get(url);
          const fetchedNews = response.data.articles;
          setNews(fetchedNews);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleCategoryChange = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const filteredNews = news.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleBlogClick = (blog) => {
    setSelectedPost(blog);
    setShowBlogModal(true);
  };

  const CloseBlogModal = () => {
    setShowBlogModal(false);
    setSelectedPost(null);
  };

  const handleBookmarkClick = (article) => {
    setBookmarks((prevBookmarks) => {
      const updateBookmark = prevBookmarks.find(
        (bookmark) => bookmark.title === article.title
      );
      const newBookmarks = updateBookmark
        ? prevBookmarks
        : [...prevBookmarks, article];
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks)); // Save updated bookmarks to local storage
      return newBookmarks;
    });
  };

  const categories = [
    "General",
    "World",
    "Business",
    "Technology",
    "Entertainment",
    "Sports",
    "Science",
    "Health",
    "Nation",
  ];

  return (
    <div className="news">
      {/* navbar */}
      <header className="news-header">
        <h1 className="logo">CWP - News & Blog</h1>
        <div className="search-bar">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search News..."
              value={searchInput}
              onChange={handleSearchChange}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>

      {/* navbar content */}
      <div className="news-content">
        <div className="navbar">
          <div className="user" onClick={onShowBlogs}>
            <img src={userImg} alt="User Image" />
            <p>
              <abbr title="CodeWithPanda">CWP</abbr> Blog
            </p>
          </div>

          {/* categories */}
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              {categories.map((category, index) => (
                <a
                  key={index}
                  href="#"
                  className="nav-link"
                  onClick={(e) =>
                    handleCategoryChange(e, category.toLowerCase())
                  }
                >
                  {category}
                </a>
              ))}
              <a
                href="#"
                className="nav-link"
                onClick={() => setShowBookmarksModal(true)}
              >
                Bookmarks <i className="fa-solid fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>

        {/* news section */}
        <div className="news-section">
          {headline && (
            <div
              className="headline"
              onClick={() => handleArticleClick(headline)}
            >
              <img src={headline.image || noImg} alt={headline.title} />
              <h2
                className="headline-title"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {headline.title}
                <i
                  className={`${
                    bookmarks.some(
                      (bookmark) => bookmark.title === headline.title
                    )
                      ? "fa-solid"
                      : "fa-regular"
                  } fa-bookmark bookmark`}
                  onClick={() => handleBookmarkClick(headline)}
                ></i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {filteredNews.slice(1, 7).map((article, index) => (
              <div
                key={index}
                className="news-grid-item"
                onClick={() => handleArticleClick(article)}
              >
                <img src={article.image || noImg} alt="News Image" />
                <h3>
                  {article.title.split(" ").slice(0, 4).join(" ")}...
                  <i
                    className={`${
                      bookmarks.some(
                        (bookmark) => bookmark.title === article.title
                      )
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-bookmark bookmark`}
                    onClick={() => handleBookmarkClick(article)}
                  ></i>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <NewsModel
          show={showModal}
          onClose={() => setShowModal(false)}
          article={selectedArticle}
        />
        <Bookmarks
          show={showBookmarksModal}
          article={selectedArticle}
          bookmarks={bookmarks}
          onSelectedBookmark={setSelectedArticle}
          onDeleteBookmark={(article) =>
            setBookmarks(bookmarks.filter((b) => b.title !== article.title))
          }
          onClose={() => setShowBookmarksModal(false)}
        />

        {/* my blogs */}
        <div className="my-blogs">
          <h1 className="my-blogs-heading">My Blogs</h1>
          <div className="blog-posts">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="blog-post"
                onClick={() => handleBlogClick(blog)}
              >
                <img
                  src={blog.image ? blog.image : noImg}
                  alt={blog.title}
                  onError={(e) => (e.target.src = noImg)}
                />
                <h3>{blog.title}</h3>

                <div className="post-buttons">
                  <button
                    className="edit-post"
                    onClick={() => onEditBlog(blog)}
                  >
                    {" "}
                    <i className="bx bxs-edit"></i>
                  </button>
                  <button
                    className="delete-post"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBlog(blog);
                    }}
                  >
                    {" "}
                    <i className="bx bxs-x-circle"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {selectedPost && showBlogModal && (
            <BlogsModal
              show={showBlogModal}
              onClose={CloseBlogModal}
              blog={selectedPost}
            />
          )}
          <BlogsModal />
        </div>

        <div className="weather-calender">
          {/* weather */}
          <Weather />

          {/* calender */}
          <Calender />
        </div>
      </div>
      {/* footer */}
      <footer className="news-footer">
        <p>
          <span>CWP - news & blog</span>
        </p>
        <p>&copy; All Rights Reserved. By CodeWithPanda</p>
      </footer>
    </div>
  );
};

export default News;