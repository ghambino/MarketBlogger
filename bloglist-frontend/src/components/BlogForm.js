/* eslint-disable linebreak-style */
import React from "react";
import PropTypes from "prop-types";

function BlogForm(props) {
  const { title, setTitle, author, setAuthor, url, setUrl, handleBlogCreate } =
    props;

  return (
    <>
      <h2>create new Blog post</h2>
      <form onSubmit={handleBlogCreate}>
        <div>
          title:
          <input
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <br />
        <div>
          Author:
          <input
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            required
          />
        </div>
        <br />
        <div>
          Url:
          <input
            type="text"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            required
          />
        </div>
        <br />
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  );
}
BlogForm.propTypes = {
  setTitle: PropTypes.func,
  setAuthor: PropTypes.func,
  setUrl: PropTypes.func,
};
export default BlogForm;
