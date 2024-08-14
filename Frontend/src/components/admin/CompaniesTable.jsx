import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEdit } from "../../redux/companySlice";

const cc = [];

const CompaniesTable = ({ input }) => {
	const { companies } = useSelector((state) => state.company);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [filterCompany, setFilterCompany] = useState(companies);

	useEffect(() => {
		const filteredCompany =
			companies?.length >= 0 &&
			companies.filter((company) => {
				if (!input) return true;
				return company?.name
					?.toLowerCase()
					.includes(input.trim().toLowerCase());
			});
        setFilterCompany(filteredCompany);
	}, [input, companies]);

	const handleEdit = (companyId) => {
		dispatch(setEdit(companyId));
		navigate(`/admin/companies/${companyId}`);
	};
	return (
		<>
			<div>
				<Table>
					<TableCaption>
						A list of your recent registered companies.
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[120px]">Logo</TableHead>
							<TableHead>Company Name</TableHead>
							<TableHead>Date</TableHead>
							<TableHead className="text-right">Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filterCompany?.map((company) => (
							<TableRow key={company?._id}>
								<TableCell className="font-medium">
									<Avatar>
										<AvatarImage src={company?.logo} />
									</Avatar>
								</TableCell>
								<TableCell>{company?.name}</TableCell>
								<TableCell className="font-medium">
									{company?.createdAt?.split("T")[0]}
								</TableCell>
								<TableCell className="text-right">
									<Popover className="cursor-pointer">
										<PopoverTrigger>
											<MoreHorizontal />
										</PopoverTrigger>
										<PopoverContent className="w-32">
											<div
												className="flex items-center gap-3 cursor-pointer w-fit"
												onClick={() =>
													handleEdit(company?._id)
												}
											>
												<Edit2 className="w-4" />
												<span>Edit</span>
											</div>
										</PopoverContent>
									</Popover>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{filterCompany?.length === 0 && (
					<div className="text-center w-full font-bold font-platypi">
						<h2>No companies found</h2>
					</div>
				)}
			</div>
		</>
	);
};

export default CompaniesTable;
