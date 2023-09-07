import React, { useEffect, useState } from "react";
import { useGetProjectsQuery } from "../../features/projects/projecstApi";
import { useGetTeamQuery } from "../../features/team/teamApi";

import { useEditTasksMutation } from "../../features/tasks/tasksApi";
import { useNavigate } from "react-router-dom";
import Option from "./Option";

const Form = ({ task }) => {
	const [editTasks, { isSuccess, isError, isLoading, error }] =
		useEditTasksMutation();

	const {
		id,
		taskName: aTaskName,
		deadline: aDeadline,
		teamMember: aTeamMember,
		project: aProject,
	} = task || {};

	const [inputFrom, setInputFrom] = useState({
		taskName: aTaskName,
		teamMember: aTeamMember?.name,
		project: aProject?.projectName,
		deadline: aDeadline,
	});
	console.log(inputFrom);

	const navigate = useNavigate();

	const { data: projects } = useGetProjectsQuery();
	const { data: teamMembers } = useGetTeamQuery();

	const submitHandleForm = async (e) => {
		e.preventDefault();
		const findByName = teamMembers.find((member) =>
			member.name.includes(inputFrom.teamMember)
		);
		const findByProjectName = projects.find((project) =>
			project.projectName.includes(inputFrom.project)
		);

		editTasks({
			id: id,
			data: {
				taskName: inputFrom.taskName,
				teamMember: await findByName,
				project: await findByProjectName,
				deadline: inputFrom.deadline,
			},
		});
	};

	useEffect(() => {
		if (isSuccess) {
			navigate("/");
		} else {
			console.log(isError);
		}
	}, [isSuccess]);

	return (
		<form className="space-y-6" onSubmit={submitHandleForm}>
			<div className="fieldContainer">
				<label htmlFor="lws-taskName">Task Name</label>
				<input
					type="text"
					name="taskName"
					id="lws-taskName"
					value={inputFrom.taskName}
					required
					placeholder="Implement RTK Query"
					onChange={(e) =>
						setInputFrom({ ...inputFrom, taskName: e.target.value })
					}
				/>
			</div>
			<div className="fieldContainer">
				<label>Assign To</label>
				<select
					name="teamMember"
					id="lws-teamMember"
					required
					value={inputFrom.teamMember}
					onChange={(e) =>
						setInputFrom({ ...inputFrom, teamMember: e.target.value })
					}
				>
					<option value="" hidden="" selected="">
						Select Job
					</option>
					{teamMembers?.map((member) => (
						<Option props={member} key={member.id} />
					))}
				</select>
			</div>
			<div className="fieldContainer">
				<label htmlFor="lws-projectName">Project Name</label>
				<select
					value={inputFrom.project}
					id="lws-projectName"
					name="projectName"
					required
					onChange={(e) =>
						setInputFrom({ ...inputFrom, project: e.target.value })
					}
				>
					<option value="" hidden="" selected="">
						Select Project
					</option>
					{projects?.map((project) => (
						<Option props={project} key={project.id} />
					))}
				</select>
			</div>
			<div className="fieldContainer">
				<label htmlFor="lws-deadline">Deadline</label>
				<input
					type="date"
					name="deadline"
					value={inputFrom.deadline}
					id="lws-deadline"
					required
					onChange={(e) =>
						setInputFrom({ ...inputFrom, deadline: e.target.value })
					}
				/>
			</div>
			<div className="text-right">
				<button type="submit" className="lws-submit" disabled={isSuccess}>
					Save
				</button>
			</div>
		</form>
	);
};

export default Form;
