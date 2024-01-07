import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import _ from 'lodash';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(_.orderBy(blogs, 'likes', 'desc')));
  }, []);
  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedInBlogUser');
    if (userJSON) {
      const loggedInUser = JSON.parse(userJSON);
      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
    }
  }, []);
  const handleAddBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.addBlog({
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
        likes: 3,
      });
      blogFormRef.current.toggleVisibility();
      setBlogs(_.orderBy(blogs.concat(newBlog), 'likes', 'desc'));
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} is added`);
      setTimeout(() => {
        setMessage(null);
        setIsError(false);
      }, 5000);
    } catch (exception) {
      setIsError(true);
      setMessage('Cannot added the blog,Please try again with proper data ');
      setTimeout(() => {
        setMessage(null);
        setIsError(false);
      }, 5000);
    }
  };
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInBlogUser');
  };
  const handleLikeUpdate = async (toUpdatedBlog) => {
    try {
      const updatedBlog = await blogService.updateBlog(toUpdatedBlog);
      const newblogs = await _.orderBy(
        blogs.map((x) => (x.id == updatedBlog.id ? updatedBlog : x)),
        'likes',
        'desc'
      );
      setBlogs(newblogs);
    } catch (exception) {
      setIsError(true);
      setMessage('Cannot update the blog,Please try again with proper data ');
      setTimeout(() => {
        setMessage(null);
        setIsError(false);
      }, 5000);
    }
  };
  const handleDelete = async (id) => {
    try {
      await blogService.deleteBlog(id);
      const newblogs = await _.orderBy(
        blogs.filter((x) => x.id != id),
        'likes',
        'desc'
      );
      setBlogs(newblogs);
    } catch (exception) {
      setIsError(true);
      setMessage('Cannot delete the blog,Please try again with proper data ');
      setTimeout(() => {
        setMessage(null);
        setIsError(false);
      }, 5000);
    }
  };
  return (
    <div>
      {message !== null && <Notification message={message} isError={isError} />}
      {user === null && (
        <Togglable buttonLabel="Login">
          <LoginForm
            setUser={setUser}
            setMessage={setMessage}
            setIsError={setIsError}
          />
        </Togglable>
      )}
      {user !== null && (
        <div>
          <p>{user.username} logged in</p>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
          <Togglable buttonLabel="Add new Blog" ref={blogFormRef}>
            <BlogForm createBlog={handleAddBlog} />
          </Togglable>
        </div>
      )}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLinkUpdate={handleLikeUpdate}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
