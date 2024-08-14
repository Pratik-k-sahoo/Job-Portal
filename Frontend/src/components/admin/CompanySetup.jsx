import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "../ui/textarea";
import { setLoading } from "../../redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { setCompany, setEdit } from "../../redux/companySlice";
import { useNavigate, useParams } from "react-router-dom";
import useGetCompanyById from "../../hooks/useGetCompanyById";

const CompanySetup = () => {
	const params = useParams();
	useGetCompanyById(params.id);
	const { company, edit } = useSelector((state) => state.company);
	const [formData, setFormData] = useState({
		companyName: company?.name || "",
		description: company?.description || "",
		website: company?.website || "",
		location: company?.location || "",
	});
	const { loading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		setFormData({
			companyName: company?.name || "",
			description: company?.description || "",
			website: company?.website || "",
			location: company?.location || "",
		});
	}, [company]);

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.files?.[0] });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(setLoading(true));
		const form = new FormData();
		if (edit && formData?.companyName !== company?.name)
			form.append("companyName", formData.companyName);
		form.append("description", formData.description);
		form.append("website", formData.website);
		form.append("location", formData.location);
		if (formData.image) {
			form.append("image", formData.image);
		}
		try {
			const response = await axios.put(
				`${COMPANY_API_END_POINT}/update/${company._id}`,
				form,
				{
					header: {
						"Content-Type": "multipart/form-data",
					},
					withCredentials: true,
				}
			);
			if (response.data.success) {
				dispatch(setCompany(null));
				toast(response.data.message);
				navigate("/admin/companies");
			}
		} catch (error) {
			console.log(error);
			toast.error(error.response?.data?.message);
		} finally {
			dispatch(setLoading(false));
			dispatch(setEdit(false));
		}
	};
	return (
		<>
			<div>
				<Navbar />
				<div className="max-w-xl mx-auto my-10">
					<form onSubmit={handleSubmit}>
						<div className="flex items-center gap-24 py-8">
							<Button
								className="flex items-center gap-2 text-gray-500 font-semibold"
								variant="outline"
								onClick={() => navigate("/admin/companies")}
							>
								<ArrowLeft />
								<span>Back</span>
							</Button>
							<h1 className="font-bold text-xl">Company Setup</h1>
						</div>
						<div className="grid grid-cols-2 gap-4">
							{edit && (
								<div>
									<Label>Company Name</Label>
									<Input
										type="text"
										name="companyName"
										value={formData.companyName}
										onChange={handleInputChange}
										placeholder="Company Name"
									/>
								</div>
							)}
							{!edit && (
								<div>
									<Label>Company Name</Label>
									<Input
										disabled={!edit}
										value={company?.name}
									/>
								</div>
							)}
							<div>
								<Label>Description</Label>
								<Textarea
									type="text"
									name="description"
									value={formData.description}
									onChange={handleInputChange}
									placeholder="Description"
								/>
							</div>
							<div>
								<Label>Website</Label>
								<Input
									type="text"
									name="website"
									value={formData.website}
									onChange={handleInputChange}
									placeholder="Website"
								/>
							</div>
							<div>
								<Label>Location</Label>
								<Input
									type="text"
									name="location"
									value={formData.location}
									onChange={handleInputChange}
									placeholder="Location"
								/>
							</div>
						</div>
						<div className="flex items-center py-5 gap-4">
							<Label>Logo</Label>
							<Input
								type="file"
								accept="image/*"
								name="image"
								onChange={handleFileChange}
								placeholder="Logo"
							/>
						</div>
						<div>
							{loading ? (
								<Button disabled className="w-full mt-8">
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Please wait
								</Button>
							) : (
								<Button type="submit" className="w-full mt-8">
									Signup
								</Button>
							)}
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default CompanySetup;
