
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, selectUser } from '../userSlice';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    const action = await dispatch(register({ username, password }));
    if (register.fulfilled.match(action)) {
      alert('Registration successful');
      navigate('/login');
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
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
        <button type="submit" disabled={userStatus === 'loading'}>Register</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default RegisterPage;
