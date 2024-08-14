import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useEffect, useState } from "react";
import { setSearchQuery } from "../redux/jobSlice";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Browse = () => {
    useGetAllJobs();
	const { jobs } = useSelector((state) => state.jobs);
	const dispatch = useDispatch();

	useEffect(() => {
        return () => {
			dispatch(setSearchQuery(""));
		};
		
	}, [dispatch]);
	return (
		<>
			<div>
				<Navbar />
				<div className="max-w-7xl mx-auto my-10">
					<h1 className="font-bold text-xl my-10">
						Search Results{" "}
						<span className="text-md text-gray-600">
							({jobs.length})
						</span>
					</h1>
					<div className="grid grid-cols-3 gap-4">
						{jobs.map((job) => (
							<motion.div
								initial={{ opacity: 0, x: 100 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -100 }}
								transition={{ duration: 0.3 }}
								key={job._id}
							>
								<Job job={job} />
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Browse;
