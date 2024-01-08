import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const LoginForm = ({ setUser, setMessage, setIsError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });
      setUser(user);
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
      setMessage('Logged in Successfully');
      setTimeout(() => {
        setMessage(null);
        setIsError(false);
      }, 5000);
    } catch (exception) {
      setIsError(true);
      setMessage(
        'Wrong credentails, please enter correct username or password'
      );
      setTimeout(() => {
        setMessage(null);
        setIsError(false);
      }, 5000);
    }
  };
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username{' '}
          <input
            type="text"
            name="UserName"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password{' '}
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setIsError: PropTypes.func.isRequired,
};

export default LoginForm;
