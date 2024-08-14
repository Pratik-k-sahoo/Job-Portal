import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
	return (
		<>
			<footer className="bg-gray-800 text-white py-6">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="mb-4 md:mb-0">
							<h1 className="text-2xl font-bold">
								Job
								<span className="text-[#F83002]">Portal</span>
							</h1>
							<p className="text-sm">
								© 2024 Job
								<span className="text-[#F83002]">Portal</span>.
								All rights reserved.
							</p>
						</div>
						<div className="flex space-x-4">
							<a
								href="#"
								className="text-gray-400 hover:text-white"
							>
								Privacy Policy
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-white"
							>
								Terms of Service
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-white"
							>
								Contact Us
							</a>
						</div>
						<div className="flex space-x-4 mt-4 md:mt-0">
							<a
								href="https://facebook.com"
								className="text-gray-400 hover:text-white"
							>
								<FaFacebook size={24} />
							</a>
							<a
								href="https://linkedin.com"
								className="text-gray-400 hover:text-white"
							>
								<FaLinkedin size={24} />
							</a>
							<a
								href="https://github.com"
								className="text-gray-400 hover:text-white"
							>
								<FaGithub size={24} />
							</a>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
