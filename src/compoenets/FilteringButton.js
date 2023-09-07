import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFilter } from '../features/tasks/tasksSlice';

const FilteringButton = () => {
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedOption, setSelectedOption] = useState('pending');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    dispatch(addFilter(selectedOption));
  }, [dispatch, selectedOption]);

  return (
    <div
      className='relative inline-block text-left'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div>
        <span className='rounded-md shadow-sm'>
          <button
            type='button'
            className='inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
            id='options-menu'
            aria-haspopup='true'>
            {selectedOption}
            <svg
              className='-mr-1 ml-2 h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'>
              <path
                fillRule='evenodd'
                d='M9.293 9.293a1 1 0 011.414 0L12 10.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </span>
      </div>

      {/* Options Dropdown */}
      {isHovered && (
        <div
          className='origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='options-menu'>
          <div className='py-1' role='none'>
            <button
              onClick={() => handleOptionChange('pending')}
              className={`${
                selectedOption === 'pending'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700'
              } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
              role='menuitem'>
              Pending
            </button>
            <button
              onClick={() => handleOptionChange('inProgress')}
              className={`${
                selectedOption === 'inProgress'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700'
              } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
              role='menuitem'>
              In Progress
            </button>
            <button
              onClick={() => handleOptionChange('complete')}
              className={`${
                selectedOption === 'complete'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700'
              } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
              role='menuitem'>
              Completed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilteringButton;
