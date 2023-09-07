import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addSearch } from '../../features/tasks/tasksSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null,
  );

  useEffect(() => {
    dispatch(addSearch(search));
  }, [dispatch, search]);

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('user');
    setUser(null);

    // Redirect to the login page
    history('/login');
  };

  return (
    <nav className='container relative py-3'>
      <div className='flex items-center justify-between'>
        <Link to={`/`}>Task Management</Link>

        {user ? (
          <div className='flex items-center'>
            <p className='mr-4'>{user.username || user.email}</p>
            <button
              onClick={handleLogout}
              className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700'>
              Logout
            </button>
          </div>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
