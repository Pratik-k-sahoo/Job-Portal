import { APPLICATION_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAdminJobs } from "../redux/jobSlice";
import { setLoading } from "../redux/authSlice";
import { useEffect } from "react";
import { setAppliedApplications } from "../redux/applicationsSlice";

const useGetAppliedJobs = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchAppliedJobs = async () => {
			try {
				dispatch(setLoading(true));
				const response = await axios.get(
					`${APPLICATION_API_END_POINT}/get`,
					{
						withCredentials: true,
					}
				);
				if (response.data.success) {
					dispatch(
						setAppliedApplications(response.data.applications)
					);
				}
			} catch (error) {
				console.log(error);
			} finally {
				dispatch(setLoading(false));
			}
		};
		fetchAppliedJobs();
	}, [dispatch]);
};

export default useGetAppliedJobs;
