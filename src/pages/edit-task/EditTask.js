import React from "react";
import Form from "./Form";
import { useGetTaskQuery } from "../../features/tasks/tasksApi";
import { useParams } from "react-router-dom";

const EditTask = () => {
	const { editId } = useParams();
	const { data: task, isLoading, isError } = useGetTaskQuery(editId);
	let content = null;
	if (isLoading) {
		content = <p>Loading.....</p>;
	}
	if (!isLoading && isError) {
		content = <p>There was an Error.....</p>;
	}
	if (!isLoading && !isError && !task?.id) {
		content = <p>No data found</p>;
	}
	if (!isLoading && !isError && task?.id) {
		content = <Form task={task} />;
	}

	return (
		<div className="container relative">
			<main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
				<h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
					Edit Task
				</h1>
				<div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
					{content}
				</div>
			</main>
		</div>
	);
};

export default EditTask;
