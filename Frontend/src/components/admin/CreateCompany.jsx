import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCompany } from "../../redux/companySlice";

const CreateCompany = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [companyName, setCompanyName] = useState("");

	const handleRegisterNewCompany = async (e) => {
		try {
			const response = await axios.post(
				`${COMPANY_API_END_POINT}/register`,
				{ companyName },
				{
					header: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);
			if (response?.data?.success) {
				dispatch(setCompany(response.data.company));
				toast.success(response?.data?.message);
				const companyId = response?.data?.company?._id;
				navigate(`/admin/companies/${companyId}`);
			}
		} catch (error) {
			console.log(error);
            if(error?.response?.data) {
                toast.error(error?.response?.data?.message);
            }
		}
	};
	return (
		<>
			<div>
				<Navbar />
				<div className="max-w-4xl mx-auto">
					<div className="my-10">
						<h1 className="font-bold text-2xl">
							Your Company Name
						</h1>
						<p className="text-gray-500">
							What would you like to give your name? You can
							change this later.
						</p>
					</div>
					<Label htmlFor="companyName">Company Name: </Label>
					<Input
						id="companyName"
						value={companyName}
						onChange={(e) => setCompanyName(e.target.value)}
						required
						type="text"
						className="my-2"
						placeholder="JobHunt, Microsoft, etc."
					/>
					<div className="flex items-center gap-2 my-10">
						<Button
							variant="outline"
							onClick={() => navigate("/admin/companies")}
						>
							Cancel
						</Button>
						<Button onClick={handleRegisterNewCompany}>
							Continue
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateCompany;
