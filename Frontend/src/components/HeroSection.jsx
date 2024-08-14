import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { setSearchQuery } from "../redux/jobSlice";
import { useDispatch } from "react-redux";

const HeroSection = () => {
	const [input, setInput] = useState("");
	const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSearch = () => {
        dispatch(setSearchQuery(input));
        navigate("/browse");
    }
	return (
		<>
			<div className="text-center mt-5 px-3">
				<div className="flex flex-col gap-5">
					<h1 className="shadow-xl px-4 py-2 rounded-full bg-gray-100 text-[#fe2c3a] font-bold w-fit mx-auto">
						No. 1 Job Hunt Website
					</h1>
					<h1 className="text-5xl font-bold font-sans">
						Search, Apply & <br /> Get Your{" "}
						<span className="text-[#6A38C2] drop-shadow-xl hover:drop-shadow-none">
							Dream Job
						</span>
					</h1>
					<p className="font-mono">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Iure at, eius quam asperiores illo impedit.
					</p>
					<div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Find Your Dream Jobs"
							className="outline-none border-none w-full"
						/>
						<Button
							className="rounded-r-full bg-[#20b2bd] hover:bg-[#01a4af]"
							onClick={handleSearch}
						>
							<Search className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default HeroSection;
