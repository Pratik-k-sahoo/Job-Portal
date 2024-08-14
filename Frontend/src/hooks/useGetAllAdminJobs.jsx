import { JOB_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAdminJobs } from "../redux/jobSlice";
import { setLoading } from "../redux/authSlice";
import { useEffect } from "react";

const useGetAllAdminJobs = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchAllAdminJobs = async () => {
			try {
				dispatch(setLoading(true));
				const response = await axios.get(`${JOB_API_END_POINT}/admin/get`, {
					withCredentials: true,
				});
				if (response.data.success) {
					dispatch(setAdminJobs(response.data.jobs));
				}
			} catch (error) {
				console.log(error);
			} finally {
				dispatch(setLoading(false));
			}
		};
		fetchAllAdminJobs();
	}, [dispatch]);
};

export default useGetAllAdminJobs;
