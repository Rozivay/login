
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../userSlice';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 5) {
      alert("Password must be at least 5 characters long");
      return;
    }
    const action = await dispatch(login({ username, password }));
    if (login.fulfilled.match(action)) {
      navigate('/homepage');
    } else {
      if (action.payload) {
        alert(action.payload);
      } else {
        alert(userError);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" disabled={userStatus === 'loading'}>Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default LoginPage;
