import { COMPANY_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/authSlice";
import { useEffect } from "react";
import { setCompany } from "../redux/companySlice";

const useGetCompanyById = (companyId) => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchCompany = async () => {
			try {
				dispatch(setLoading(true));
				const response = await axios.get(
					`${COMPANY_API_END_POINT}/get/${companyId}`,
					{
						withCredentials: true,
					}
				);
				if (response.data.success) {
					dispatch(setCompany(response.data.company));
				}
			} catch (error) {
				console.log(error);
			} finally {
				dispatch(setLoading(false));
			}
		};
		fetchCompany();
	}, [companyId, dispatch]);
};

export default useGetCompanyById;
