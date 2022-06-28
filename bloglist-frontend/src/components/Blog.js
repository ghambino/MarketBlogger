/* eslint-disable linebreak-style */
import React, { useState, useRef } from "react";
import blogService from "../services/blog";
import BlogForm from "./BlogForm";
import BlogToggle from "./BlogToggle";
import Togglable from "./Togglable";

const Blog = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const blogRef = useRef();

  const { blogs, setBlogs, user, handleLogout, setNotification } = props;

  const sortedArray = blogs.sort((a, b) => {
    return b.likes - a.likes;
  });

  const handleBlogCreate = async (event) => {
    event.preventDefault();
    blogRef.current.visibilityToggle();

    const blogpost = {
      title: title,
      author: author,
      url: url,
    };

    try {
      const response = await blogService.create(blogpost);
      setBlogs([...blogs, response]);
      setTitle("");
      setAuthor("");
      setUrl("");
      setNotification(`new blog tilted: ${response.title} has been created`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlogLike = async (id) => {
    const blogToUpdate = blogs.find((blog) => blog.id === id);
    const updated = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
    try {
      const output = await blogService.adjust(updated, id);
      console.log(output);
      const updatedBlog = blogs.map((blog) =>
        blog.id === id.toString() ? updated : blog
      );
      setBlogs(updatedBlog);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlogRemove = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);
    if (
      window.confirm(
        `Remove blog "${blogToDelete.title}"! By ${blogToDelete.author}`
      )
    ) {
      try {
        const output = await blogService.detached(id);
        console.log(output);
        const remainingBlogs = blogs.filter(
          (blog) => blog.id !== blogToDelete.id.toString()
        );
        setBlogs(remainingBlogs);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h2>blogs</h2>
      <p>
        <b>USER: {user.name}</b>
      </p>
      <button onClick={handleLogout}>logout</button>
      <br />

      <div className="blog-input">
        <Togglable label="create blogpost" ref={blogRef}>
          <BlogForm
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            handleBlogCreate={handleBlogCreate}
          />
        </Togglable>
      </div>

      <br />

      <div>
        {sortedArray.map((blog, index) => {
          return (
            <>
              <BlogToggle
                blog={blog}
                key={index}
                handleBlogLike={handleBlogLike}
                handleBlogRemove={handleBlogRemove}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

export default Blog;
