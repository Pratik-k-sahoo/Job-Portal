import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthProtectedRoutes = ({ children }) => {
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	return <>{children}</>;
};

export default AuthProtectedRoutes;
