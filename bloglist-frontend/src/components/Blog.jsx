import { useState } from 'react';

const Blog = ({ blog, handleLinkUpdate }) => {
  const [isDetailView, setIsDetailView] = useState(false);
  const handleViewClick = async (event) => {
    setIsDetailView(!isDetailView);
  };
  const handleLikeClick = async (event) => {
    handleLinkUpdate({ ...blog, likes: ++blog.likes });
  };
  const blogStyle = {
    border: '1px solid black',
    paddingTop: '10px',
    paddingLeft: '2px',
    marginBottom: '5px',
  };
  return (
    <div style={blogStyle}>
      {!isDetailView && (
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={handleViewClick}>View</button>
        </div>
      )}
      {isDetailView && (
        <div>
          <p>
            {blog.title} {blog.author}{' '}
            <button onClick={handleViewClick}>Hide</button>
          </p>
          <a href="{blog.url}">{blog.url}</a>
          <p>
            links {blog.likes} <button onClick={handleLikeClick}>like</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
