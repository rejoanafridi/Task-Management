import React, { useEffect, useState } from 'react';
import { useGetProjectsQuery } from '../../features/projects/projecstApi';
import { useGetTeamQuery } from '../../features/team/teamApi';
import Options from './Options';
import { useAddTasksMutation } from '../../features/tasks/tasksApi';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [addTasks, { isLoading, isSuccess }] = useAddTasksMutation();
  const [inputFrom, setInputFrom] = useState({
    taskName: '',
    description: '',
    teamMember: '',
    project: '',
    deadline: '',
    priority: '',
  });
  const navigate = useNavigate();

  const { data: projects } = useGetProjectsQuery();
  const { data: teamMembers } = useGetTeamQuery();

  const submitHandleForm = async (e) => {
    e.preventDefault();
    const findByName = teamMembers.find((member) =>
      member.name.includes(inputFrom.teamMember),
    );
    const findByProjectName = projects.find((project) =>
      project.projectName.includes(inputFrom.project),
    );

    addTasks({
      taskName: inputFrom.taskName,
      teamMember: await findByName,
      project: await findByProjectName,
      deadline: inputFrom.deadline,
      priority: inputFrom.priority,
      description: inputFrom.description,
      status: 'pending',
    });
    navigate('/');
  };

  return (
    <form className='space-y-6' onSubmit={submitHandleForm}>
      <div className='fieldContainer'>
        <label htmlFor='taskName'>Task title</label>
        <input
          type='text'
          name='taskName'
          required
          placeholder='Type Task Name'
          onChange={(e) =>
            setInputFrom({ ...inputFrom, taskName: e.target.value })
          }
        />
      </div>
      <div className='fieldContainer'>
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          name='description'
          required
          placeholder='description'
          onChange={(e) =>
            setInputFrom({ ...inputFrom, description: e.target.value })
          }
        />
      </div>
      <div className='fieldContainer'>
        <label>Assign To</label>
        <select
          name='teamMember'
          required
          onChange={(e) =>
            setInputFrom({ ...inputFrom, teamMember: e.target.value })
          }>
          <option value='' hidden='' selected=''>
            Select Job
          </option>
          {teamMembers?.map((member) => (
            <Options props={member} key={member.id} />
          ))}
        </select>
      </div>
      <div className='fieldContainer'>
        <label htmlFor='lws-projectName'>Project Name</label>
        <select
          name='projectName'
          required
          onChange={(e) =>
            setInputFrom({ ...inputFrom, project: e.target.value })
          }>
          <option value='' hidden='' selected=''>
            Select Project
          </option>
          {projects?.map((project) => (
            <Options props={project} key={project.id} />
          ))}
        </select>
      </div>
      <div className='fieldContainer'>
        <label htmlFor='deadline'>Deadline</label>
        <input
          type='date'
          name='deadline'
          required
          onChange={(e) =>
            setInputFrom({ ...inputFrom, deadline: e.target.value })
          }
        />
      </div>
      <div className='fieldContainer'>
        <label htmlFor='priority'>priority</label>
        <input
          type='text'
          name='deadline'
          required
          onChange={(e) =>
            setInputFrom({ ...inputFrom, priority: e.target.value })
          }
        />
      </div>
      <div className='text-right'>
        <button type='submit' className='lws-submit' disabled={isSuccess}>
          Save
        </button>
      </div>
    </form>
  );
};

export default Form;
