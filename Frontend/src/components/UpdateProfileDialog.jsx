import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, updateUser } from "../redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../utils/constant";

const UpdateProfileDialog = ({ open, setOpen }) => {
	const { user, loading } = useSelector((store) => store.auth);
	const [formData, setFormData] = useState({
		bio: user?.profile?.bio,
		skills: user?.profile?.skills?.toString(),
	});
	const dispatch = useDispatch();

	const handleEventChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.files?.[0] });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();  
		try {
			dispatch(setLoading(true));
			const form = new FormData();
			if(formData.fullname) {
                form.append("fullname", formData?.fullname);
            }
			if (formData.email) {
				form.append("email", formData?.email);
			}
			if (formData.username) {
				form.append("username", formData?.username);
			}
			if (formData.phoneNumber) {
				form.append("phoneNumber", formData?.phoneNumber);
			}
			form.append("bio", formData.bio);
			form.append("skills", formData.skills);
			form.append("pdf", formData.pdf);
			form.append("resumeName", formData.resumeName);
			const response = await axios.put(
				`${USER_API_END_POINT}/profile/update`,
				form,
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
				setFormData({
					bio: response.data.user?.profile?.bio,
					skills: response.data.user?.profile?.skills?.toString(),
				});
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
			<div>
				<Dialog open={open}>
					<DialogContent
						className="sm:max-w-[425px]"
						onInteractOutside={() => setOpen(false)}
					>
						<DialogHeader>
							<DialogTitle>Update Profile</DialogTitle>
							<DialogDescription>
								Make changes to your profile here. Click save
								when you're done.
							</DialogDescription>
						</DialogHeader>
						<form onSubmit={handleSubmit}>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="fullname"
										className="text-right"
									>
										Fullname:
									</Label>
									<Input
										id="fullname"
										type="text"
										value={formData.fullname}
										onChange={handleEventChange}
										className="col-span-3"
										name="fullname"
										placeholder="Fullname"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="username"
										className="text-right"
									>
										Username:
									</Label>
									<Input
										id="username"
										type="text"
										value={formData.username}
										onChange={handleEventChange}
										className="col-span-3"
										name="username"
										placeholder="Username"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="email"
										className="text-right"
									>
										Email:
									</Label>
									<Input
										id="email"
										type="email"
										value={formData.email}
										onChange={handleEventChange}
										className="col-span-3"
										name="email"
										placeholder="Email"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="phoneNumber"
										className="text-right"
									>
										Contact Number:
									</Label>
									<Input
										id="phoneNumber"
										className="col-span-3 remove-arrow"
										type="number"
										value={formData.phoneNumber}
										onChange={handleEventChange}
										name="phoneNumber"
										placeholder="Contact Number"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="bio" className="text-right">
										Bio:
									</Label>
									<Textarea
										id="bio"
										className="col-span-3"
										value={formData.bio}
										onChange={handleEventChange}
										name="bio"
										placeholder="Bio"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="skills"
										className="text-right"
									>
										Skills:
									</Label>
									<Input
										id="skills"
										className="col-span-3"
										type="text"
										value={formData.skills}
										onChange={handleEventChange}
										name="skills"
										placeholder="Skills"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="resume"
										className="text-right"
									>
										Resume:
									</Label>
									<Input
										id="resume"
										className="col-span-3 cursor-pointer"
										type="file"
										onChange={handleFileChange}
										name="pdf"
										accept="application/pdf"
										placeholder="Resume"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label
										htmlFor="resumeName"
										className="text-right"
									>
										Resume Name:
									</Label>
									<Input
										id="resumeName"
										className="col-span-3 cursor-pointer"
										type="text"
										value={formData.resumeName}
										onChange={handleEventChange}
										disabled={formData.pdf === undefined}
										name="resumeName"
										placeholder="Resume Name"
									/>
								</div>
							</div>
							<DialogFooter>
								{loading ? (
									<Button disabled className="w-full mt-4">
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Please wait
									</Button>
								) : (
									<Button
										type="submit"
										className="w-full mt-4"
									>
										Update
									</Button>
								)}
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};

export default UpdateProfileDialog;
