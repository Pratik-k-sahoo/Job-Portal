import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../components/ui/carousel";
import { Button } from "./ui/button";
import { setSearchQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const categories = [
	"Frontend Developer",
	"Backend Developer",
	"Data Science",
	"Graphic Designer",
	"Fullstack Developer",
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleSearch = (input) => {
		dispatch(setSearchQuery(input));
		navigate("/browse");
	};
	return (
		<>
			<div>
				<Carousel className="w-full max-w-xl mx-auto my-20">
					<CarouselContent>
						{categories.map((category, idx) => (
							<CarouselItem
								key={idx}
								className="md:basis-1/2 lg:basis-1/3"
							>
								<Button
									variant="outline"
									className="rounded-full"
                                    onClick={() => handleSearch(category)}
								>
									{category}
								</Button>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</>
	);
};

export default CategoryCarousel;
