import React, { useEffect } from "react";
import userImg from "../assets/images/user.jpg";
import noImg from "../assets/images/no-img.png";
import "./Blogs.css";

const Blogs = ({ onBack, onCreateBlog, editPost, isEditing }) => {
  const [showForm, setShowForm] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [titleValid, setTitleValid] = React.useState(true);
  const [contentValid, setContentValid] = React.useState(true);

  useEffect(() => {
    if(isEditing && editPost) {
      setImage(editPost.image);
      setTitle(editPost.title);
      setContent(editPost.content);
      setShowForm(true);
    }else{
      setImage(null);
      setTitle("");
      setContent("");
      setShowForm(false);
    }
  }, [isEditing, editPost]);

  const handleImageChange = (e) => {
    if(e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const maxSize = 1 * 1024 * 1024;

      if (file.size > maxSize) {
        alert("Image size should be less than 1MB.");
        return
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setTitleValid(value.length >= 10);
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    setContent(value);
    setContentValid(value.length >= 30);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titleValid || !contentValid) {
      return;
    }
    const newBlog = {
      image ,
      title,
      content,
    };
    onCreateBlog(newBlog, isEditing);
    setTitle("");
    setContent("");
    setImage(null); // Reset images state
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onBack();
    }, 3000);
  };

  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={userImg} alt="User Image" onError={(e) => e.target.src = noImg} />
      </div>
      <div className="blogs-right">
        {!showForm && !submitted && (
          <button className="post-btn" onClick={() => setShowForm(true)}>
            Create New Post
          </button>
        )}
        {submitted && <p className="submission-message">Post Submitted!</p>}
        <div className={`blogs-right-form ${showForm ? "visible" : "hidden"}`}>
          <h1>{isEditing ? "Edit Post" : "New Post"}</h1>
          <form onSubmit={handleSubmit}>
            <div className="img-upload">
              <label htmlFor="file-upload" className="file-upload">
                <i className="bx bx-upload"></i>
                Upload Image
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
            <input
              type="text"
              placeholder="Add Title (Min 10 Characters)"
              className={`title-input ${!titleValid ? "invalid" : ""}`}
              value={title}
              onChange={handleTitleChange}
            />
            {!titleValid && <p className="error-message" style={{ color: 'red', marginTop: "-2rem" }}>Title must be at least 10 characters long.</p>}
            <textarea
              name=""
              className={`text-input ${!contentValid ? "invalid" : ""}`}
              placeholder="Add Text (Min 30 Characters)"
              value={content}
              onChange={handleContentChange}
            ></textarea>
            {!contentValid && <p className="error-message" style={{ color: 'red', marginTop: "-2rem"}}>Content must be at least 30 characters long.</p>}
            <button type="submit" className="submit-btn">
             {isEditing ? "Update Post" : "Submit Post"}
            </button>
          </form>
        </div>

        <button className="blogs-close-btn" onClick={onBack}>
          Back <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Blogs;