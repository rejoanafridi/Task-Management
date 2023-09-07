import React from 'react';
import { Link } from 'react-router-dom';

const TeamMember = ({ member }) => {
  const { avatar, name } = member;

  return (
    <div className='checkbox-container'>
      <Link to={`/profile/${member.name.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className='flex'>
          <img src={avatar} className='team-avater' />
          <p className='label'>{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default TeamMember;
