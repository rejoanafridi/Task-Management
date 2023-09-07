import React from 'react';
import SingleTask from './SingleTask';
import { useGetTasksQuery } from '../../features/tasks/tasksApi';
import { useSelector } from 'react-redux';

const TasksList = () => {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();

  const { filter, sort } = useSelector((state) => state.tasks);
	console.log(sort)

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError && !isLoading) {
    content = <div>There is an Error!!!!!</div>;
  }

  if (!isLoading && !isError && tasks?.length === 0) {
    content = <p> No data Found!!!!</p>;
  }
  if (!isLoading && !isError && tasks?.length > 0) {
    content = tasks
      .filter((task) => task?.status === filter)
      ?.map((task) => <SingleTask key={task.id} task={task} />);
  }

  return <div className='lws-task-list'>{content}</div>;
};

export default TasksList;
