import { Badge } from "./ui/badge";
import {useNavigate} from "react-router-dom";

const LatestJobCards = ({ job }) => {

    const navigate = useNavigate();
	const getDaysAgo = (createdAt) => {
		return Math.floor(
			Math.abs(new Date() - new Date(createdAt)) / 1000 / (60 * 60 * 24)
		);
	};

    const handleJobDetails = () => {
        navigate("/description/" + job._id);
    }

	return (
		<>
			<div onClick={handleJobDetails} className="border rounded-md p-5 border-gray-100 cursor-pointer shadow-xl">
				<div>
					<h1 className="font-medium text-lg">
						{job?.company?.name}
					</h1>
					<p className="text-sm text-gray-400">{job?.location}</p>
				</div>
				<div>
					<h1 className="font-bold text-lg my-2">{job?.title}</h1>
					<p className="text-sm text-gray-600">{job?.description}</p>
				</div>
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
				<div className="mt-5">
					<p className="text-sm text-gray-600">
						Posted:{" "}
						{getDaysAgo(job?.createdAt) === 0
							? "Today"
							: getDaysAgo(job?.createdAt) + " days ago"}
					</p>
					<button className="border border-slate-200 rounded-full py-1 shadow-md font-bold px-3 mt-3">
						<a href="">Apply Now</a>
					</button>
				</div>
			</div>
		</>
	);
};

export default LatestJobCards;
