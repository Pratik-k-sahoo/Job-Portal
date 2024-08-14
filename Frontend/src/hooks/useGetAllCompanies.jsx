import { COMPANY_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/authSlice";
import { useEffect } from "react";
import { setCompanies } from "../redux/companySlice";

const useGetAllCompanies = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchCompanies = async () => {
			try {
				dispatch(setLoading(true));
				const response = await axios.get(
					`${COMPANY_API_END_POINT}/get`,
					{
						withCredentials: true,
					}
				);
				if (response.data.success) {
					dispatch(setCompanies(response.data.companies));
				}
			} catch (error) {
				console.log(error);
			} finally {
				dispatch(setLoading(false));
			}
		};
		fetchCompanies();
	}, [dispatch]);
};

export default useGetAllCompanies;
