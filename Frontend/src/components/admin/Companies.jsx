import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";

const Companies = () => {
	const navigate = useNavigate();
	const [input, setInput] = useState("");
	useGetAllCompanies();
    // useGetAllAdminJobs();
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
							placeholder="Filter by name"
						/>
						<Button
							onClick={() => navigate("/admin/companies/create")}
						>
							New Company
						</Button>
					</div>
					<CompaniesTable input={input} />
				</div>
			</div>
		</>
	);
};

export default Companies;
