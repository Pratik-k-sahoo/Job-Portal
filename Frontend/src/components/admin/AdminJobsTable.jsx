import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEdit } from "../../redux/companySlice";

const AdminJobsTable = ({ input }) => {
	const { adminJobs } = useSelector((state) => state.jobs);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [filterJob, setFilterJob] = useState([]);

	useEffect(() => {
		const filteredJob =
			adminJobs?.length >= 0 &&
			adminJobs?.filter((job) => {
				if (!input) return true;
				return (
					job?.company?.name
						?.toLowerCase()
						.includes(input.trim().toLowerCase()) ||
					job?.title
						?.toLowerCase()
						.includes(input.trim().toLowerCase())
				);
			});
		setFilterJob(filteredJob);
	}, [input, adminJobs]);

	const handleEdit = (jobId) => {
		dispatch(setEdit(true));
		navigate(`/admin/jobs/${jobId}`);
	};

	const handleJobApplicants = (jobId) => {
		navigate(`/admin/jobs/${jobId}/applicants`);
	};
	return (
		<>
			<div>
				<Table>
					<TableCaption>
						A list of your recent posted jobs.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[200px]">
								Company Name
							</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Applicants</TableHead>
							<TableHead>Date</TableHead>
							<TableHead className="text-right">Action</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{filterJob?.map((job) => (
							<TableRow key={job?._id}>
								<TableCell className="font-medium">
									{job?.company?.name}
								</TableCell>
								<TableCell>{job?.title}</TableCell>
								<TableCell>
									{job?.applications.length}
								</TableCell>
								<TableCell className="font-medium">
									{job?.createdAt?.split("T")[0]}
								</TableCell>
								<TableCell className="text-right">
									<Popover className="cursor-pointer">
										<PopoverTrigger>
											<MoreHorizontal />
										</PopoverTrigger>
										<PopoverContent className="w-fit border border-gray-300 shadow-xl">
											<div
												className="flex items-center gap-3 cursor-pointer w-fit my-3"
												onClick={() =>
													handleEdit(job?._id)
												}
											>
												<Edit2 className="w-4" />
												<span>Edit</span>
											</div>
											<div
												className="flex items-center gap-3 cursor-pointer w-fit my-3"
												onClick={() =>
													handleJobApplicants(
														job?._id
													)
												}
											>
												<Eye className="w-4" />
												<span>Applicants</span>
											</div>
										</PopoverContent>
									</Popover>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{filterJob?.length === 0 && (
					<div className="text-center w-full font-bold font-platypi">
						<h2>No Jobs Found</h2>
					</div>
				)}
			</div>
		</>
	);
};

export default AdminJobsTable;
