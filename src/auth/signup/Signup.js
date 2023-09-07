import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const history = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password === passwordAgain) {
      setPassword(passwordAgain);
      const userData = {
        email,
        password,
        // Other user profile data can be added here
      };

      localStorage.setItem('user', JSON.stringify(userData));

      // Alert a success message
      alert('Signup successful!');

      // Navigate to the login page
      history('/login');
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-lg'>
        <form
          onSubmit={handleSignup}
          className='mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8'>
          <p className='text-center text-lg font-medium'>
            Sign up to your account
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

          <div>
            <label htmlFor='confirmPassword' className='sr-only'>
              Confirm Password
            </label>

            <div className='relative'>
              <input
                type='password'
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.target.value)}
                className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                placeholder='Confirm password'
              />
            </div>
          </div>

          <button
            type='submit'
            className='block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-black'>
            Sign up
          </button>

          <p className='text-center text-sm text-gray-500'>
            Already have an account?{' '}
            <Link to='/login' className='text-indigo-600'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
