import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";

const LatestJobs = () => {
	const { jobs } = useSelector((state) => state.jobs);

	return (
		<>
			<div className="max-w-7xl mx-auto my-20 px-5">
				<h1 className="text-4xl font-bold font-platypi text-center">
					<span className="text-[#6A38C2] font-platypi">
						Latest & <span className="text-red-400">Top</span>
					</span>{" "}
					Job Openings
				</h1>
				<div className="grid grid-cols-3 gap-4 my-5">
					{jobs.length !== 0 ? (
						jobs
							.map((job) => <LatestJobCards key={job._id} job={job} />)
					) : (
						<span>No Job applications</span>
					)}
				</div>
			</div>
		</>
	);
};

export default LatestJobs;
