import { NavLink, useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { User2, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoading, logout } from "../../redux/authSlice";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant";
import { setCompanies, setCompany, setEdit } from "../../redux/companySlice";
import { setAdminJobs, setJob, setJobs } from "../../redux/jobSlice";

const Navbar = () => {
	const { user } = useSelector((store) => store.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			dispatch(setLoading(true));
			const response = await axios.get(`${USER_API_END_POINT}/logout`, {
				withCredentials: true,
			});
			if (response.data.success) {
				dispatch(logout());
				navigate("/login");
				toast(response.data.message);
                dispatch(setEdit(false));
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
			<div className="bg-slate-800">
				<div className="flex items-center justify-between mx-auto max-w-7xl h-16">
					<div>
						<NavLink to={"/"}>
							<h1 className="text-2xl font-bold cursor-pointer text-white">
								Job
								<span className="text-[#F83002]">Portal</span>
							</h1>
						</NavLink>
					</div>
					<div className="bg-slate-400 flex items-center justify-around gap-10 py-1 px-5 rounded-xl">
						<ul className="flex font-medium items-center gap-5">
							{user && user.role === "recruiter" ? (
								<>
									<li className="cursor-pointer">
										<NavLink to={"/admin/companies"}>
											Companies
										</NavLink>
									</li>
									<li className="cursor-pointer">
										<NavLink to={"/admin/jobs"}>
											Jobs
										</NavLink>
									</li>
								</>
							) : (
								<>
									<li className="cursor-pointer">
										<NavLink to={"/"}>Home</NavLink>
									</li>
									<li className="cursor-pointer">
										<NavLink to={"/jobs"}>Jobs</NavLink>
									</li>
									<li className="cursor-pointer">
										<NavLink to={"/browse"}>Browse</NavLink>
									</li>
								</>
							)}
						</ul>
						{!user ? (
							<div className="flex gap-5">
								<NavLink to="/signup">
									<Button className="bg-[#dd4628] hover:bg-[#99301c]">
										Signup
									</Button>
								</NavLink>
								<NavLink to={"/login"}>
									<Button className="bg-[#0f172a] hover:bg-[#1e2b4b]">
										Login
									</Button>
								</NavLink>
							</div>
						) : (
							<Popover>
								<PopoverTrigger asChild>
									<Avatar>
										<AvatarImage
											className="cursor-pointer"
											src={user.profile.profileImage}
											alt="jobportal"
										/>
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</PopoverTrigger>
								<PopoverContent className="w-80">
									<div className="flex items-center gap-5">
										<Avatar>
											<AvatarImage
												className="cursor-pointer"
												src={user.profile.profileImage}
												alt="jobportal"
											/>
											<AvatarFallback>JP</AvatarFallback>
										</Avatar>
										<div>
											<h4 className="font-medium">
												{user.fullname}
											</h4>
											<p className="text-sm text-muted-foreground">
												{user.profile.bio}
											</p>
										</div>
									</div>
									<div className="flex flex-col my-2 text-gray-600">
										<NavLink to={"/profile"}>
											<div className="flex w-fit items-center gap-2 cursor-pointer">
												<User2 />
												<Button
													className="border-none outline-none"
													variant="link"
												>
													View Profile
												</Button>
											</div>
										</NavLink>
										<div className="flex w-fit items-center gap-2 cursor-pointer">
											<LogOut onClick={handleLogout} />
											<Button
												className="border-none outline-none"
												variant="link"
												onClick={handleLogout}
											>
												Logout
											</Button>
										</div>
									</div>
								</PopoverContent>
							</Popover>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
