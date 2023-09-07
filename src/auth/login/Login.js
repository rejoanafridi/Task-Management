import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const history = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem('user');
    if (!storedUserData) {
      alert('User not found. Please sign up.');
      return;
    }

    const userData = JSON.parse(storedUserData);

    if (userData.email === email && userData.password === password) {
      alert('successfully Login');
      history('/')
      // Successful login, redirect to the dashboard or another page
    } else {
      alert('Incorrect email or password.');
    }
  };

  return (
    <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-lg'>
        <h1 className='text-center text-2xl font-bold text-indigo-600 sm:text-3xl'>
          Get started today
        </h1>

        <form
          onSubmit={handleLogin}
          className='mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8'>
          <p className='text-center text-lg font-medium'>
            Sign in to your account
          </p>

          <div>
            <label htmlFor='email' className='sr-only'>
              Email
            </label>

            <div className='relative'>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                placeholder='Enter email'
              />
            </div>
          </div>

          <div>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>

            <div className='relative'>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                placeholder='Enter password'
              />
            </div>
          </div>

          <button
            type='submit'
            className=' w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-black'>
            Sign in
          </button>

          <p className='text-center text-sm text-gray-500'>
            No account?{' '}
            <Link to='/signup' className='underline'>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
