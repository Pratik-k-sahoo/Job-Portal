import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetAllUnfilteredJobs from "../hooks/useGetAllUnfilteredJobs";

const Home = () => {
    useGetAllUnfilteredJobs();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    useEffect(() => {
        if(user?.role === 'recruiter') {
            navigate("/admin/companies");
        }
    }, [navigate, user?.role]);
    
	return (
		<div>
			<Navbar />
			<HeroSection />
			<CategoryCarousel />
			<LatestJobs />
			<Footer />
		</div>
	);
};

export default Home;
