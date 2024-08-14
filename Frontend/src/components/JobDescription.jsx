import { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import axios from "axios";
import {
	APPLICATION_API_END_POINT,
	JOB_API_END_POINT,
} from "../utils/constant";
import { useParams } from "react-router-dom";
import { setLoading } from "../redux/authSlice";
import { setJob } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { CircularProgress } from "@mui/material";

const JobDescription = () => {
	const params = useParams();
	const jobId = params.id;
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { job } = useSelector((state) => state.jobs);
	const isInitiallyApplied =
		job?.appications?.some(
			(application) => application.applicant === user._id
		) || false;
	const [isApplied, setIsApplied] = useState(isInitiallyApplied);
	const { loading } = useSelector((state) => state.auth);

	const handleApplyJob = async () => {
		try {
			const response = await axios.get(
				`${APPLICATION_API_END_POINT}/apply/${jobId}`,
				{
					withCredentials: true,
				}
			);
			if (response.data.success) {
				setIsApplied(true);
				const updatedJob = {
					...job,
					applications: [
						...job.applications,
						{ applicant: user?._id },
					],
				};
				dispatch(setJob(updatedJob));
				toast.success(response.data.message);
			}
		} catch (error) {
			console.log(error);
			if (error.response) {
				toast.error(error.response.data.message);
			}
		}
	};

	useEffect(() => {
		const fetchSingleJob = async () => {
			try {
				dispatch(setLoading(true));
				const response = await axios.get(
					`${JOB_API_END_POINT}/get/${jobId}`,
					{
						withCredentials: true,
					}
				);

				if (response.data.success) {
					dispatch(setJob(response.data.job));
					setIsApplied(
						response.data.job?.applications?.some(
							(application) => application.applicant === user._id
						)
					);
				}
			} catch (error) {
				console.log(error);
			} finally {
				dispatch(setLoading(false));
			}
		};
		fetchSingleJob();
	}, [dispatch, jobId, user?._id]);
	return (
		<>
			<div>
				<Navbar />
				{loading && (
					<div className="flex justify-center items-center h-full my-10">
						<CircularProgress color="secondary" />
					</div>
				)}
				{!loading && (
					<div className="max-w-7xl mx-auto my-10">
						<div className="flex justify-between items-center">
							<div>
								<h1 className="font-bold text-2xl">
									{job?.title}
								</h1>
								<div className="flex items-center gap-4 mt-2">
									<Badge className="text-blue-700 font-bold bg-gray-200 hover:bg-gray-300">
										{job?.position} Position
									</Badge>
									<Badge className="cursor-pointer text-red-500 bg-neutral-300 font-bold hover:bg-neutral-200">
										{job?.jobType}
									</Badge>
									<Badge className="cursor-pointer text-yellow-200 bg-red-600 font-bold hover:bg-red-400">
										{job?.salary / 100000}LPA
									</Badge>
								</div>
							</div>
							{job?.position <= 0 ? (
								<Button disabled={true}>Position Filled</Button>
							) : (
								<Button
									onClick={handleApplyJob}
									disabled={isApplied}
									className={`rounded-lg font-semibold ${
										isApplied
											? "bg-slate-400"
											: "bg-green-600 hover:bg-green-700"
									}`}
								>
									{isApplied
										? "Already applied"
										: "Apply Now"}
								</Button>
							)}
						</div>
						<h1 className="border-b-2 border-b-gray-300 font-medium py-5">
							{job?.description}
						</h1>
						<div className="my-4">
							<h1 className="font-bold my-1">
								Role:{" "}
								<span className="pl-4 font-normal text-gray-800">
									{job?.title}
								</span>
							</h1>
							<h1 className="font-bold my-1">
								Location:{" "}
								<span className="pl-4 font-normal text-gray-800">
									{job?.location}
								</span>
							</h1>
							<h1 className="font-bold my-1">
								Description:{" "}
								<span className="pl-4 font-normal text-gray-800">
									{job?.description}
								</span>
							</h1>
							<h1 className="font-bold my-1">
								Experience:{" "}
								<span className="pl-4 font-normal text-gray-800">
									{job?.experienceLevel}
								</span>
							</h1>
							<h1 className="font-bold my-1">
								Salary:{" "}
								<span className="pl-4 font-normal text-gray-800">
									{job?.salary / 100000}LPA
								</span>
							</h1>
							<h1 className="font-bold my-1">
								Total Applicants:{" "}
								<span className="pl-4 font-normal text-gray-800">
									{job?.applications?.length}
								</span>
							</h1>
							<h1 className="font-bold my-1">
								Posted Date:{" "}
								<span className="pl-4 font-normal text-gray-800">
									{job?.createdAt.split("T")[0]}
								</span>
							</h1>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default JobDescription;
