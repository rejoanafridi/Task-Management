import React from "react";
import { useGetTeamQuery } from "../../features/team/teamApi";
import TeamMember from "./TeamMember";

const TeamMembers = () => {
	const { data: members, isLoading, isError, error } = useGetTeamQuery();
	let content = null;
	if (isLoading) {
		content = <p>Loading...</p>;
	}
	if (isError && !isLoading) {
		content = <div>There is an Error!!!!!</div>;
	}

	if (!isLoading && !isError && members?.length === 0) {
		content = <p> No data Found!!!!</p>;
	}

	if (!isLoading && !isError && members?.length > 0) {
		content = members?.map((member) => (
			<TeamMember key={member.id} member={member} />
		));
	}
	return (
		<div className="mt-8">
			<h3 className="text-xl font-bold">Team Members</h3>
			<div className="mt-3 space-y-4">{content}</div>
		</div>
	);
};

export default TeamMembers;
