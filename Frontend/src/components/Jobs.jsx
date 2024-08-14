import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useEffect, useState } from "react";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Jobs = () => {
	useGetAllJobs();
	const { jobs, searchQuery } = useSelector((state) => state.jobs);
	const [filterJobs, setFilterJobs] = useState(jobs);

	useEffect(() => {
		if (searchQuery?.length > 0) {
			const filteredJobs = jobs.filter(
				(job) =>
					job.title
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					job.description
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					job.location
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					(job.salary >=
						Number(searchQuery?.split("-")?.[0].split("L")?.[0]) *
							100000 &&
						job.salary <=
							Number(
								searchQuery?.split("-")?.[1]?.split("L")?.[0]
							) *
								100000) ||
					(job.salary >=
						Number(searchQuery?.split("-")?.[0]?.split("K")?.[0]) *
							1000 &&
						job.salary <=
							Number(
								searchQuery?.split("-")?.[1]?.split("L")?.[0]
							) *
								100000) ||
					(job.salary >=
						Number(searchQuery?.split("-")?.[0]) * 100000 &&
						job.salary <=
							Number(
								searchQuery?.split("-")?.[1]?.split("K")?.[0]
							) *
								1000) ||
					job.salary >=
						Number(searchQuery?.split("> ")?.[1]?.split("L")?.[0]) *
							100000
			);

			setFilterJobs(filteredJobs);
		} else {
			setFilterJobs(jobs);
		}
	}, [jobs, searchQuery]);
	return (
		<>
			<div>
				<Navbar />
				<div className="max-w-7xl mx-auto mt-5">
					<div className="flex gap-5">
						<div className="w-[20%]">
							<FilterCard />
						</div>
						{filterJobs.length <= 0 ? (
							<span>No Jobs Found</span>
						) : (
							<div className="flex-1 h-[88vh] overflow-y-auto pb-5">
								<div className="grid grid-cols-3 gap-4">
									{filterJobs.map((job) => (
										<motion.div
											initial={{ opacity: 0, x: 100 }}
											animate={{ opacity: 1, x: 0 }}
                                            exit={{opacity: 0, x: -100}}
                                            transition={{duration: 0.3}}
											key={job._id}
										>
											<Job job={job} />
										</motion.div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Jobs;
