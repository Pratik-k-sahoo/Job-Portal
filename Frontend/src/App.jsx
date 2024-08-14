import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import AdminJobs from "./components/admin/AdminJobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import useGetAllJobs from "./hooks/useGetAllJobs";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/CreateCompany";
import CompanySetup from "./components/admin/CompanySetup";
import CreateJob from "./components/admin/CreateJob";
import AdminJobSetup from "./components/admin/AdminJobSetup";
import JobApplicants from "./components/admin/JobApplicants";
import ProtectedRoutes from "./components/admin/ProtectedRoutes";

const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <Outlet />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "signup",
				element: <Signup />,
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "jobs",
				element: <Jobs />,
				children: [],
			},
			{
				path: "description/:id",
				element: <JobDescription />,
			},
			{
				path: "browse",
				element: <Browse />,
			},
			{
				path: "profile",
				element: <Profile />,
			},
			// Routes for admin
			{
				path: "/admin",
				element: (
					<ProtectedRoutes>
						<Outlet />
					</ProtectedRoutes>
				),
				children: [
					{
						path: "companies",
						element: <Outlet />,
						children: [
							{
								index: true,
								element: <Companies />,
							},
							{
								path: "create",
								element: <CreateCompany />,
							},
							{
								path: ":id",
								element: <CompanySetup />,
							},
						],
					},
					{
						path: "jobs",
						element: <Outlet />,
						children: [
							{
								index: true,
								element: <AdminJobs />,
							},
							{
								path: "create",
								element: <CreateJob />,
							},
							{
								path: ":id",
								element: <Outlet />,
								children: [
									{
										index: true,
										element: <AdminJobSetup />,
									},
									{
										path: "applicants",
										element: <JobApplicants />,
									},
								],
							},
						],
					},
				],
			},
		],
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={appRouter} />
		</>
	);
}

export default App;
