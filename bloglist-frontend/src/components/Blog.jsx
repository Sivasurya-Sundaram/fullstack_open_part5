import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleLinkUpdate, handleDelete }) => {
  const [isDetailView, setIsDetailView] = useState(false);
  const handleViewClick = async (event) => {
    setIsDetailView(!isDetailView);
  };
  const handleLikeClick = async (event) => {
    handleLinkUpdate({ ...blog, likes: ++blog.likes });
  };
  const handleDeleteClick = async (event) => {
    if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
      handleDelete(blog.id);
    }
  };
  const blogStyle = {
    border: '1px solid black',
    paddingTop: '10px',
    paddingLeft: '2px',
    marginBottom: '5px',
  };
  return (
    <div className="blog" style={blogStyle}>
      {!isDetailView && (
        <div className="simpleView">
          {blog.title} {blog.author}{' '}
          <button onClick={handleViewClick}>View</button>
        </div>
      )}
      {isDetailView && (
        <div className="detailedView">
          <p>
            {blog.title} {blog.author}{' '}
            <button onClick={handleViewClick}>Hide</button>
          </p>
          <a href="{blog.url}">{blog.url}</a>
          <p id="likes">
            likes {blog.likes}{' '}
            <button id="like-button" onClick={handleLikeClick}>
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
    </div>
  );
};
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLinkUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default Blog;
