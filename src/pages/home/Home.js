import React from "react";
import Sidebar from "../../compoenets/grid/Sidebar";
import Navbar from "../../compoenets/navbar/Navbar";
import Main from "../../compoenets/grid/Main";

const Home = () => {
	return (
		<>
			{/* nav */}
			{/* <Navbar /> */}
			<div className="container relative">
				{/* sidebar */}
				<Sidebar />
				<Main />
			</div>
		</>
	);
};

export default Home;
