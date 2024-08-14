import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const jobs = [1, 2, 3, 4, 5, 6, 7];

const AppliedJobsTable = () => {
	const { appliedApplications } = useSelector((state) => state.application);
	const isSelected = true;
	const isPending = true;

	return (
		<>
			<div>
				<Table>
					<TableCaption>A list of your applied jobs.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[120px]">Date</TableHead>
							<TableHead>Job Role</TableHead>
							<TableHead>Company</TableHead>
							<TableHead className="text-right">status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{appliedApplications.length > 0 &&
							appliedApplications.map((application) => (
								<TableRow key={application?._id}>
									<TableCell className="font-medium">
										{application?.createdAt.split("T")?.[0]}
									</TableCell>
									<TableCell>
										{application?.job?.title}
									</TableCell>
									<TableCell>
										{application?.job?.company?.name}
									</TableCell>
									<TableCell className="text-right">
										<Badge
											className={`${
												application.status ===
												"accepted"
													? "bg-green-500"
													: application.status ===
													  "rejected"
													? "bg-red-500"
													: "bg-gray-500"
											} ${
												application.status ===
												"accepted"
													? "hover:bg-green-300"
													: application.status ===
													  "rejected"
													? "hover:bg-red-300"
													: "hover:bg-gray-300"
											} cursor-pointer`}
										>
											{application.status}
										</Badge>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
				{appliedApplications.length <= 0 && (
                    <p className="text-center text-gray-600">
                        You have not applied for any jobs yet.
                    </p>
                )}
			</div>
		</>
	);
};

export default AppliedJobsTable;
