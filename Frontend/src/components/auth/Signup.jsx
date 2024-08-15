import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";

const Signup = () => {
	const [role, setRole] = useState(false);
	const [formData, setFormData] = useState({ role: "student" });
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, user } = useSelector((store) => store.auth);

	const handleRoleChange = (e) => {
		e.target.value === "recruiter" ? setRole(true) : setRole(false);
	};

	const handleEventChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.files?.[0] });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = new FormData();
		form.append("fullname", formData.fullname);
		form.append("email", formData.email);
		form.append("password", formData.password);
		form.append("username", formData.username);
		form.append("phoneNumber", formData.phoneNumber);
		form.append("bio", formData.bio);
		form.append("skills", formData.skills);
		form.append("pdf", formData.pdf);
		form.append("resumeName", formData.resumeName);
		form.append("companyId", formData.companyId);
		form.append("image", formData.image);
		form.append("role", formData.role);

		try {
			dispatch(setLoading(true));
			const response = await axios.post(
				`${USER_API_END_POINT}/register`,
				form,
				{
					header: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			);
			console.log(response);
			navigate("/login");
			toast(response.data.message);
		} catch (error) {
			console.log(error);
			if (error.response) {
				toast.error(error.response.data.message);
			}
		} finally {
			dispatch(setLoading(false));
		}
	};

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [navigate, user]);

	return (
		<>
			<div>
				<Navbar />
				<div className="flex items-center justify-center max-w-7xl mx-auto">
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-4 w-1/2 border border-gray-500 rounded-md p-4 my-10"
					>
						<h1 className="font-bold text-xl mb-5 text-center">
							Sign<span className="text-red-600">up</span>
						</h1>
						<div>
							<Label htmlFor="fullname">
								Fullname<span className="text-red-600">*</span>
							</Label>
							<Input
								type="text"
								id="fullname"
								placeholder="Fullname"
								name="fullname"
								onChange={handleEventChange}
								value={formData.fullname}
								required
							/>
						</div>
						<div>
							<Label htmlFor="email">
								Email<span className="text-red-600">*</span>
							</Label>
							<Input
								type="email"
								id="email"
								placeholder="Email"
								name="email"
								onChange={handleEventChange}
								value={formData.email}
								required
							/>
						</div>
						<div>
							<Label htmlFor="username">
								Username<span className="text-red-600">*</span>
							</Label>
							<Input
								type="text"
								id="username"
								placeholder="Username"
								name="username"
								onChange={handleEventChange}
								value={formData.username}
								required
							/>
						</div>
						<div>
							<Label htmlFor="password">
								Password<span className="text-red-600">*</span>
							</Label>
							<Input
								type="password"
								id="password"
								placeholder="Password"
								autoComplete="on"
								name="password"
								onChange={handleEventChange}
								value={formData.password}
								required
							/>
						</div>
						<div>
							<Label htmlFor="phonenumber">
								Contact Number
								<span className="text-red-600">*</span>
							</Label>
							<Input
								type="number"
								id="phonenumber"
								placeholder="Contact Number"
								name="phoneNumber"
								onChange={handleEventChange}
								value={formData.phoneNumber}
								className="remove-arrow"
								required
							/>
						</div>
						<div>
							<Label htmlFor="bio">Bio</Label>
							<Input
								type="text"
								id="bio"
								placeholder="Bio"
								name="bio"
								onChange={handleEventChange}
								value={formData.bio}
							/>
						</div>
						<div>
							<Label htmlFor="skills">Skills</Label>
							<Textarea
								id="skills"
								placeholder="Skills"
								name="skills"
								onChange={handleEventChange}
								value={formData.skills}
							/>
						</div>
						{role && (
							<div>
								<Label htmlFor="companyId">Company Id</Label>
								<Input
									type="text"
									id="companyId"
									placeholder="Company Id"
									name="companyId"
									onChange={handleEventChange}
									value={formData.companyId}
								/>
							</div>
						)}
						<div>
							<Label htmlFor="resume">Resume File</Label>
							<Input
								type="file"
								id="resume"
								placeholder="Resume File"
								className="cursor-pointer"
								onChange={handleFileChange}
								name="pdf"
								accept="application/pdf"
							/>
						</div>
						<div>
							<Label htmlFor="resumeName">Resume Name</Label>
							<Input
								type="text"
								id="resumeName"
								placeholder="Resume Name"
								name="resumeName"
								disabled={formData.pdf === undefined}
								onChange={handleEventChange}
								value={formData.resumeName}
							/>
						</div>
						<div>
							<Label htmlFor="profileImage">Profile Image</Label>
							<Input
								accept="image/*"
								type="file"
								id="profileImage"
								placeholder="Profile Image"
								className="cursor-pointer"
								onChange={handleFileChange}
								name="image"
							/>
						</div>
						<div>
							<RadioGroup
								defaultValue="student"
								name="role"
								onChange={handleEventChange}
							>
								<div className="flex items-center gap-5">
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="student"
											id="student"
											onClick={handleRoleChange}
										/>
										<Label htmlFor="student">Student</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="recruiter"
											id="recruiter"
											onClick={handleRoleChange}
										/>
										<Label htmlFor="recruiter">
											Recruiter
										</Label>
									</div>
								</div>
							</RadioGroup>
						</div>
						{loading ? (
							<Button disabled className="w-full mt-4">
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Please wait
							</Button>
						) : (
							<Button type="submit" className="w-full mt-4">
								Signup
							</Button>
						)}
						<span className="text-sm">
							Already have an account?{" "}
							<Link to={"/login"} className="text-blue-600">
								Login
							</Link>
						</span>
					</form>
				</div>
			</div>
		</>
	);
};

export default Signup;
