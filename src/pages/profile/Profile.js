import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTeamQuery } from '../../features/team/teamApi';

function Profile() {
  const { data: members, isLoading, isError, error } = useGetTeamQuery();
  const { name } = useParams();
  console.log(name);
  const [member, setMember] = useState({});
  console.log(member)

  useEffect(() => {
    if (name) {
      const findByName = members.find(
        (mb) => mb.name.toLowerCase().replace(/\s+/g, '-') === name,
      );
      if (findByName) {
        setMember(findByName);
      }
    }
  }, [members, name]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || {},
  );
  const [bio, setBio] = useState(user.bio || '');
  

  useEffect(() => {
    // Retrieve user data from local storage and update state
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    setUser(storedUser);
    setBio(storedUser.bio || '');
    
  }, []);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };



  const handleSaveProfile = () => {
    // Update user data in local storage with bio and profile picture
    const updatedUser = { ...user, bio,  };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // You can also send updated user data to your backend for permanent storage

    alert('Profile updated successfully!');
  };

  return (
    <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-lg'>
        <h1 className='text-2xl font-bold text-indigo-600 mb-4'>
          Your Profile
        </h1>

        <div className='mb-4'>
          <label
            htmlFor='profilePicture'
            className='text-sm font-medium text-gray-600'>
            Profile Picture
          </label>
         
          {member?.avatar && (
            <img
              src={member?.avatar}
              alt='Profile'
              className='mt-2 rounded-full shadow-md max-h-40'
            />
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor='bio' className='text-sm font-medium text-gray-600'>
            Bio
          </label>
          <textarea
            id='bio'
            value={member?.bio}
            onChange={handleBioChange}
            className='w-full rounded-lg border-gray-200 p-2 text-sm shadow-sm'
            rows='4'></textarea>
        </div>

        <button
          onClick={handleSaveProfile}
          className='block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white'>
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
