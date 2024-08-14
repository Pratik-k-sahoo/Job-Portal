import React from "react";
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
import { Check, ChevronDown, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { setApplicants } from "../../redux/applicationsSlice";

const statuss = ["accept", "reject"];

const JobApplicantsTable = () => {
	const { applicants } = useSelector((state) => state.application);
	const dispatch = useDispatch();
	const handleStatus = async (status, id) => {
		try {
			console.log(status);

			const response = await axios.put(
				`${APPLICATION_API_END_POINT}/status/${id}/update`,
				{ status },
				{ withCredentials: true }
			);
			if (response.data.success) {
				toast.success(response.data.message);
				console.log(response.data);
				const updatedApplications = applicants.map((applicant) =>
					applicant._id === response.data.application._id
						? response.data.application
						: applicant
				);
				console.log(updatedApplications);
				dispatch(setApplicants(updatedApplications));
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div>
				<Table>
					<TableCaption>
						A list of your recent applicants.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[300px]">
								Fullname
							</TableHead>
							<TableHead className="w-[300px]">Email</TableHead>
							<TableHead className="w-[190px]">
								Contact Number
							</TableHead>
							<TableHead>Resume</TableHead>
							<TableHead>Date</TableHead>
							<TableHead className="w-[150px] text-right">
								Action
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{applicants.map((applicant) => (
							<TableRow key={applicant?._id}>
								<TableCell className="font-medium">
									{applicant.applicant.fullname}
								</TableCell>
								<TableCell>
									{applicant.applicant.email}
								</TableCell>
								<TableCell>
									{applicant.applicant.phoneNumber}
								</TableCell>
								<TableCell className="text-blue-600">
									{applicant.applicant.profile.resume && (
										<a
											href={
												applicant.applicant.profile
													.resume
											}
											target="_blank"
										>
											{(applicant.applicant.profile
												.resumeName.length > 0 &&
												applicant.applicant.profile
													.resumeName) ||
												"Resume"}
										</a>
									)}
									{!applicant.applicant.profile.resume &&
										"No Resume"}
								</TableCell>
								<TableCell className="font-medium">
									{applicant?.createdAt?.split("T")[0]}
								</TableCell>
								<TableCell className="text-right">
									{applicant.status === "accepted" ? (
										<div
											className={`flex items-center gap-3 cursor-pointer px-2 rounded-lg py-2 text-white font-bold w-fit bg-green-400 my-3`}
										>
											<Check
												className="w-4 font-bold"
												strokeWidth={"2.5px"}
											/>

											<span>{applicant.status}</span>
										</div>
									) : applicant.status === "rejected" ? (
										<div
											className={`flex items-center gap-3 cursor-pointer px-2 rounded-lg py-2 text-white font-bold w-fit bg-red-400 my-3`}
										>
											<X
												className="w-4 font-bold"
												strokeWidth={"2.5px"}
											/>
											<span>{applicant.status}</span>
										</div>
									) : (
										<Popover className="cursor-pointer">
											<PopoverTrigger>
												<div className="flex items-center gap-4 border border-gray-300 bg-gray-500 text-white px-2">
													<ChevronDown />
													<span className="font-bold">
														{applicant.status.toUpperCase()}
													</span>
												</div>
											</PopoverTrigger>
											<PopoverContent className="w-fit border border-gray-300 shadow-xl">
												{statuss.map((status, idx) => (
													<div
														key={idx}
														className={`flex items-center gap-3 cursor-pointer px-2 rounded-lg py-2 text-white font-bold w-fit my-3 ${
															status === "accept"
																? "bg-green-400"
																: "bg-red-400"
														}`}
														onClick={() =>
															handleStatus(
																`${
																	status ===
																	"accept"
																		? "accepted"
																		: "rejected"
																}`,
																applicant._id
															)
														}
													>
														{status == "accept" && (
															<Check
																className="w-4 font-bold"
																strokeWidth={
																	"2.5px"
																}
															/>
														)}
														{status == "reject" && (
															<X className="w-4" />
														)}
														<span>{status}</span>
													</div>
												))}
											</PopoverContent>
										</Popover>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export default JobApplicantsTable;
