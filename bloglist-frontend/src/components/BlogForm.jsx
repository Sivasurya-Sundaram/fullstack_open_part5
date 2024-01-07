import { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const handleAddBlog = async (event) => {
    event.preventDefault();
    // try {
    //   const newBlog = await blogService.addBlog({
    //     title: title,
    //     author: author,
    //     url: url,
    //     likes: 3,
    //   });
    //   setBlogs(blogs.concat(newBlog));
    //   setMessage(`a new blog ${newBlog.title} by ${newBlog.author} is added`);
    //   setTitle('');
    //   setAuthor('');
    //   setUrl('');
    //   setTimeout(() => {
    //     setMessage(null);
    //     setIsError(false);
    //   }, 5000);
    // } catch (exception) {
    //   setIsError(true);
    //   setMessage('Cannot added the blog,Please try again with proper data ');
    //   setTimeout(() => {
    //     setMessage(null);
    //     setIsError(false);
    //   }, 5000);
    // }
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };
  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:{' '}
          <input
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
export default BlogForm;
