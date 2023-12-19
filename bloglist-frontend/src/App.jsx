import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedInBlogUser');
    if (userJSON) {
      const loggedInUser = JSON.parse(userJSON);
      setUser(user);
    }
  }, []);
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInBlogUser');
  };
  return (
    <div>
      {message !== null && <Notification message={message} isError={isError} />}
      {user === null && (
        <LoginForm
          setUser={setUser}
          setMessage={setMessage}
          setIsError={setIsError}
        />
      )}
      {user !== null && (
        <div>
          <p>{user.username} logged in</p>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
          <BlogForm
            setBlogs={setBlogs}
            blogs={blogs}
            setMessage={setMessage}
            setIsError={setIsError}
          />
        </div>
      )}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
