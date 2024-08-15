import { JOB_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setJobs } from "../redux/jobSlice";
import { setLoading } from "../redux/authSlice";
import { useEffect } from "react";

const useGetAllUnfilteredJobs = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchAllJobs = async () => {
			try {
				dispatch(setLoading(true));
				const response = await axios.get(
					`${JOB_API_END_POINT}/get`,
					{
						withCredentials: true,
					}
				);
				if (response.data.success) {
					dispatch(setJobs(response.data.jobs));
				}
			} catch (error) {
				console.log(error);
			} finally {
				dispatch(setLoading(false));
			}
		};
		fetchAllJobs();
	}, [dispatch]);
};

export default useGetAllUnfilteredJobs;
