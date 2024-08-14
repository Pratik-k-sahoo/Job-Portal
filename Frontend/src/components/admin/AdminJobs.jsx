import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";

const AdminJobs = () => {
    useGetAllAdminJobs();
	const navigate = useNavigate();
	const [input, setInput] = useState("");
	return (
		<>
			<div>
				<Navbar />
				<div className="max-w-6xl mx-auto my-10">
					<div className="flex items-center justify-between my-5">
						<Input
							className="w-fit"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Filter by name, role"
						/>
						<Button
							onClick={() => navigate("/admin/jobs/create")}
						>
							New Jobs
						</Button>
					</div>
					<AdminJobsTable input={input} />
				</div>
			</div>
		</>
	);
};

export default AdminJobs;
