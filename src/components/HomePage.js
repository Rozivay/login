// HomePage.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, deleteUser, selectUser } from '../userSlice';


function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDelete = () => {
    dispatch(deleteUser(user.id));
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
}

export default HomePage;
