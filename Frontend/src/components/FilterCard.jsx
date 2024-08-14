import { useEffect, useRef, useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";
import { Button } from "./ui/button";

const filterData = [
	{
		filterType: "Location",
		arrays: ["Delhi-NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
	},
	{
		filterType: "Industry",
		arrays: [
			"Frontend Developer",
			"Backend Developer",
			"Full stack Developer",
		],
	},
	{
		filterType: "Salary",
		arrays: ["0-40K", "42k-1L", "2L-5L", "7L-12L", "> 13L"],
	},
];

const FilterCard = () => {
	const [filterValue, setFilterValue] = useState("");
	const dispatch = useDispatch();
	const handleChange = (value) => {
		setFilterValue(value);
	};

    const handleResetFilter = () => {
        setFilterValue("");
    }
	useEffect(() => {
		dispatch(setSearchQuery(filterValue));
	}, [filterValue, dispatch]);
	return (
		<>
			<div className="w-full p-3 rounded-md">
				<h1 className="font-platypi font-bold text-xl">Filter Jobs</h1>
				<hr className="mt-3" />
				<Button
					className="bg-gray-500 my-5 font-bold text-lg w-fit"
					onClick={handleResetFilter}
				>
					Clear Filter
				</Button>
				<RadioGroup onValueChange={handleChange} value={filterValue}>
					{filterData.map((filter, idx) => (
						<div key={idx}>
							<h1 className="font-bold text-lg">
								{filter.filterType}
							</h1>
							{filter.arrays.map((array, idx) => (
								<div
									key={idx}
									className="flex items-center space-x-2 my-2"
								>
									<RadioGroupItem value={array} />
									<Label className="text-gray-900">
										{array}
									</Label>
								</div>
							))}
						</div>
					))}
				</RadioGroup>
			</div>
		</>
	);
};

export default FilterCard;
