import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTable from "./AppliedJobsTable";
import { useRef, useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, updateUser } from "../redux/authSlice";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

const skills = ["HTML", "Css", "C++", "Java", "JS"];

const Profile = () => {
    useGetAppliedJobs();
	const [open, setOpen] = useState(false);
	const { user } = useSelector((state) => state.auth);
	const ref = useRef(null);
	const dispatch = useDispatch();
	const formData = new FormData();
	const handleEditImage = () => {
		ref.current.click();
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		formData.append("image", e.target.files?.[0]);
		try {
			dispatch(setLoading(true));

			const response = await axios.put(
				`${USER_API_END_POINT}/profile/update`,
				formData,
				{
					header: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			);
			if (response.data.success) {
				dispatch(updateUser(response.data.user));
				toast(response.data.message);
				setOpen(false);
			}
		} catch (error) {
			console.log(error);
			if (error.response) {
				toast.error(error.response.data.message);
			}
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
		<>
			<form hidden>
				<input type="file" ref={ref} onChange={handleFormSubmit} />
			</form>
			<div>
				<Navbar />
				<div className="max-w-4xl mx-auto border border-gray-200 rounded-2xl my-5 p-8">
					<div className="flex justify-between">
						<div className="flex items-center gap-4">
							<div className="relative">
								<Avatar className="h-24 w-24 border border-gray-500">
									<div onClick={handleEditImage}>
										<AvatarImage
											src={user?.profile?.profileImage}
											alt="profile"
										/>
									</div>
								</Avatar>
								<div
									className="absolute right-1 bottom-1 bg-slate-700 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
									onClick={handleEditImage}
								>
									<Pen
										className=" text-slate-200 font-bold"
										size={"15px"}
									/>
								</div>
							</div>
							<div>
								<h1 className="font-medium text-xl font-archivo">
									{user?.fullname}
									<span className="font-thin text-gray-500 font-lobster">
										(@{user?.username})
									</span>
								</h1>
								<p>{user?.profile.bio}</p>
							</div>
						</div>
						{user.role !== "recruiter" && (
							<>
								<Button
									className="text-right"
									variant="outline"
									onClick={() => setOpen(true)}
								>
									<Pen />
								</Button>
							</>
						)}
					</div>
					<div className="my-5">
						<div className="flex items-center gap-4 my-2">
							<Mail />
							<span>{user?.email}</span>
						</div>
						<div className="flex items-center gap-4 my-2">
							<Contact />
							<span>{user?.phoneNumber}</span>
						</div>
					</div>
					{user.role !== "recruiter" && (
						<>
							<div className="my-5">
								<h1>Skills</h1>
								<div className="flex items-center gap-2 my-2">
									{user?.profile?.skills?.length !== 0 ? (
										user?.profile?.skills?.map(
											(skill, idx) => (
												<Badge
													key={idx}
													className={"cursor-pointer"}
												>
													{skill}
												</Badge>
											)
										)
									) : (
										<span>NA</span>
									)}
								</div>
							</div>
							<div className="grid w-full max-w-sm items-center gap-1.5">
								<Label className="text-md font-bold">
									Resume
								</Label>
								{user?.profile?.resumeName ? (
									<a
										href={user?.profile?.resume}
										target="_blank"
										className="text-blue-500 w-fit hover:underline cursor-pointer"
									>
										{user?.profile?.resumeName}
									</a>
								) : (
									<span>NA</span>
								)}
							</div>
						</>
					)}
				</div>
				<div className="max-w-4xl mx-auto rounded-2xl">
					<h1 className="font-bold text-lg my-5">Applied Jobs</h1>
					{/* Applied Job Table */}
					<AppliedJobsTable />
				</div>
				<UpdateProfileDialog open={open} setOpen={setOpen} />
			</div>
		</>
	);
};

export default Profile;
