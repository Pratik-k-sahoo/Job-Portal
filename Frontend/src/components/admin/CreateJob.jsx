import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const CreateJob = () => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		requirements: "",
		salary: "",
		experience: "",
		jobType: "",
		location: "",
		position: "",
		companyId: "",
	});
	const { companies } = useSelector((state) => state.company);
	const { loading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
        formData.location =
			companies.find((company) => company._id === formData.companyId)
				?.location || "";
		try {
			dispatch(setLoading(true));
			const response = await axios.post(
				`${JOB_API_END_POINT}/post`,
				formData,
				{
					header: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);

			if (response.data.success) {
				setFormData({
					title: "",
					description: "",
					requirements: "",
					salary: "",
					experience: "",
					jobType: "",
					location: "",
					position: "",
					companyId: "",
				});
				toast.success(response.data.message);
				navigate("/admin/jobs");
			}
		} catch (error) {
			console.log(error);
			if (error?.response?.data) {
				toast.error(error?.response?.data?.message);
			}
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
		<>
			<div>
				<Navbar />
				<div className="flex flex-col items-center justify-center w-screen my-5">
					<h1 className="text-2xl font-bold font-archivo">
						POST NEW JOB
					</h1>
					<hr className="w-full mt-2 border-red-500 border-2" />
					<hr className="w-full border-green-500 border-2" />
					<hr className="w-full mb-5 border-blue-500 border-2" />
					<form
						className="p-8 max-w-4xl border border-gray-200 shadow-2xl rounded-lg"
						onSubmit={handleSubmit}
					>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col gap-2">
								<Label htmlFor="title">Title</Label>
								<Input
									type="text"
									placeholder="Title"
									name="title"
									id="title"
									value={formData.title}
									onChange={handleInputChange}
									className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
								/>
							</div>
							<div className="flex flex-col gap-2 row-span-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									type="text"
									placeholder="Description"
									name="description"
									id="description"
									value={formData.description}
									onChange={handleInputChange}
									className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 h-[126px]"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="requirements">
									Requirements
								</Label>
								<Input
									type="text"
									placeholder="Requirements"
									name="requirements"
									id="requirements"
									value={formData.requirements}
									onChange={handleInputChange}
									className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="salary">Salary</Label>
								<Input
									type="number"
									placeholder="Salary"
									name="salary"
									id="salary"
									value={formData.salary}
									onChange={handleInputChange}
									className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 remove-arrow"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="experience">Experience</Label>
								<Select
									onValueChange={(value) =>
										setFormData({
											...formData,
											experience: value,
										})
									}
									name="experience"
								>
									<SelectTrigger className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1">
										<SelectValue placeholder="Select experience level" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value={"entry-level"}>
												entry-level
											</SelectItem>
											<SelectItem value={"mid-level"}>
												mid-level
											</SelectItem>
											<SelectItem value={"senior"}>
												senior
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="jobType">Job Type</Label>
								<Select
									onValueChange={(value) =>
										setFormData({
											...formData,
											jobType: value,
										})
									}
									name="jobType"
								>
									<SelectTrigger className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1">
										<SelectValue placeholder="Select job type" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value={"full-time"}>
												full-time
											</SelectItem>
											<SelectItem value={"part-time"}>
												part-time
											</SelectItem>
											<SelectItem value={"internship"}>
												internship
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="location">Location</Label>
								<Input
									type="text"
									placeholder="Location"
									name="location"
									id="location"
									value={
										companies.find(
											(company) =>
												company._id ===
												formData.companyId
										)?.location || ""
									}
									onChange={handleInputChange}
									readOnly
									className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="position">Position</Label>
								<Input
									type="number"
									placeholder="Position"
									name="position"
									id="position"
									value={formData.position}
									onChange={handleInputChange}
									className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 remove-arrow"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="companyId">Company Id</Label>
								<Select
									onValueChange={(value) =>
										setFormData({
											...formData,
											companyId: value,
										})
									}
									name="companyId"
								>
									<SelectTrigger className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1">
										<SelectValue placeholder="Select a company" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{companies.length !== 0 &&
												companies.map((company) => (
													<SelectItem
														key={company._id}
														value={company._id}
													>
														{company.name}
													</SelectItem>
												))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div
							className={`${
								companies.length === 0
									? "cursor-not-allowed"
									: "cursor-pointer"
							}`}
						>
							<div>
								{loading ? (
									<Button disabled className="w-full mt-8">
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Please wait
									</Button>
								) : (
									<Button
										className="w-full mt-5"
										disabled={companies.length === 0}
									>
										Post
									</Button>
								)}
							</div>
						</div>
						{companies.length === 0 && (
							<p className="text-xs text-red-800 font-bold text-center mt-3">
								*Please register your company before posting the
								job.
							</p>
						)}
					</form>
				</div>
			</div>
		</>
	);
};

export default CreateJob;
