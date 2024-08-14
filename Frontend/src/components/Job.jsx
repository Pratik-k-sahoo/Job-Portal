import { Button } from "./ui/button";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Link, useNavigate } from "react-router-dom";

const Job = ({ job }) => {
	const navigate = useNavigate();
	const getDaysAgo = (createdAt) => {
		return Math.floor(
			Math.abs(new Date() - new Date(createdAt)) / 1000 / (60 * 60 * 24)
		);
	};
	return (
		<>
			<div className="border border-gray-200 shadow-xl p-5 rounded-md">
				<div className="flex items-center justify-between">
					<p className="text-sm text-gray-600">
						{getDaysAgo(job?.createdAt) === 0
							? "Today"
							: getDaysAgo(job?.createdAt) + " days ago"}
					</p>
					<Button
						variant="outline"
						className="rounded-full"
						size="icon"
					>
						<FaRegBookmark className="text-xl" />
					</Button>
				</div>
				<div className="flex gap-2 items-center my-2">
					<Button
						className="p-6 hover:shadow-xl"
						variant="outline"
						size="icon"
					>
						<Avatar>
							<AvatarImage src={job?.company?.logo} />
						</Avatar>
					</Button>
					<div>
						<h1 className="font-medium text-lg">
							{job?.company?.name}
						</h1>
						<p className="text-md text-slate-600">
							{job?.location}
						</p>
					</div>
				</div>
				<div>
					<h1 className="font-bold text-lg my-2">{job?.title}</h1>
					<p className="text-sm text-gray-500">
						{job?.description?.length >= 30
							? job?.description.slice(0, 30) + "..."
							: job?.description}
					</p>
				</div>
				<div className="flex items-center gap-3 mt-2">
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
				<div className="flex items-center gap-5 mt-4">
					<Button
						variant="outline"
						className="shadow-lg hover:shadow-none"
					>
						<Link to={`/description/${job?._id}`}>Details</Link>
					</Button>
					<Button className="bg-sky-900 hover:bg-sky-700 shadow-md  shadow-sky-900/50 hover:shadow-none">
						Save for later
					</Button>
				</div>
			</div>
		</>
	);
};

export default Job;
