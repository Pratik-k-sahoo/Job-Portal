import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
	try {
		let companyId;
		let dataQuery;
		const {
			fullname,
			email,
			username,
			password,
			phoneNumber,
			role,
			bio,

			resumeName,
		} = req.body;
		let skills = req.body.skills;
		if (
			!fullname ||
			!email ||
			!username ||
			!password ||
			!phoneNumber ||
			!role
		) {
			return res.status(400).json({
				message: "Something is missing.",
				success: false,
			});
		}

		let cloudResponseFile;
		let cloudResponseImage;

		let pdf = req.files?.pdf?.[0];

		let image = req.files?.image?.[0];

		if (pdf) {
			const fileUri = getDataUri(pdf);
			cloudResponseFile = await cloudinary.uploader.upload(
				fileUri.content,
				{
					resource_type: "auto",
				}
			);
		}

		if (image) {
			const fileUri = getDataUri(image);
			cloudResponseImage = await cloudinary.uploader.upload(
				fileUri.content,
				{
					resource_type: "auto",
				}
			);
		}

		let user = await User.findOne({ username });
		if (user) {
			return res.status(400).json({
				message: "Username not available",
				success: false,
			});
		}
		user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({
				message: "Email already registered",
				success: false,
			});
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		if (skills?.length > 0) {
			skills = skills.split(",");
		}
		if (role == "recruiter") {
			companyId = req.body.companyId;
			dataQuery = {
				fullname,
				email,
				username,
				password: hashedPassword,
				phoneNumber,
				role,
				profile: {
					bio,
					skills,
					resumeName,
					resume: cloudResponseFile?.secure_url,
					profileImage: cloudResponseImage?.secure_url,
				},
				companyId,
			};
		} else {
			dataQuery = {
				fullname,
				email,
				username,
				password: hashedPassword,
				phoneNumber,
				role,
				profile: {
					bio,
					skills,
					resumeName,
					resume: cloudResponseFile?.secure_url,
					profileImage: cloudResponseImage?.secure_url,
				},
			};
		}
		user = await User.create(dataQuery);

		user = {
			_id: user._id,
			fullname: user.fullname,
			username: user.username,
			email: user.email,
			phoneNumber: user.phoneNumber,
			role: user.role,
			profile: user.profile,
		};

		return res.status(201).json({
			message: "Account created successfully",
			success: true,
			user,
		});
	} catch (error) {
		console.log(error);
	}
};

export const login = async (req, res) => {
	try {
		const { username, password, role } = req.body;
		if (!username || !password || !role) {
			return res.status(400).json({
				message: "Something is missing.",
				success: false,
			});
		}
		let user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({
				message: "Incorrect username or password",
				success: false,
			});
		}
		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			return res.status(400).json({
				message: "Incorrect username or password",
				success: false,
			});
		}
		//Check role
		if (role !== user.role) {
			return res.status(400).json({
				message: "Account doesn't exist with current role",
				success: false,
			});
		}

		const tokenData = {
			userId: user._id,
			role: user.role,
		};
		const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
			expiresIn: "1d",
		});

		user = {
			_id: user._id,
			fullname: user.fullname,
			username: user.username,
			email: user.email,
			phoneNumber: user.phoneNumber,
			role: user.role,
			profile: user.profile,
		};

		return res
			.status(200)
			.cookie("token", token, {
				maxAge: 1 * 24 * 60 * 60 * 1000,
				httpOnly: true,
				sameSite: "strict",
			})
			.json({
				message: `Welcome back ${user.fullname}`,
				success: true,
				user,
			});
	} catch (error) {
		console.log(error);
	}
};

export const logout = async (req, res) => {
	try {
		return res
			.status(200)
			.cookie("token", "", {
				maxAge: 0,
			})
			.json({
				message: "Logged out successfully",
				success: true,
			});
	} catch (error) {
		console.log(error);
	}
};

export const updateProfile = async (req, res) => {
	try {
		const {
			fullname,
			username,
			email,
			phoneNumber,
			bio,
			skills,
			resumeName,
		} = req.body;
		const file = req.files?.pdf?.[0];
		const image = req.files?.image?.[0];

		const userId = req.id; //middleware authentication
		let user = await User.findById(userId);

		if (!user) {
			return res.status(400).json({
				message: "User not found",
				success: false,
			});
		}

		if (user.username === username) {
			return res.status(400).json({
				message: "Username cannot be same as existing username",
				success: false,
			});
		}

		if (user.fullname === fullname) {
			return res.status(400).json({
				message: "Fullname cannot be same as existing fullname",
				success: false,
			});
		}

		if (user.email === email) {
			return res.status(400).json({
				message: "Email cannot be same as existing email",
				success: false,
			});
		}

		if (user.phoneNumber === phoneNumber) {
			return res.status(400).json({
				message: "Phone number cannot be same as existing phone number",
				success: false,
			});
		}

		let isAvailable = await User.findOne({ username });
		if (isAvailable) {
			return res.status(400).json({
				message: "Username not available",
				success: false,
			});
		}

		isAvailable = await User.findOne({ email });
		if (isAvailable) {
			return res.status(400).json({
				message: "Email already registered",
				success: false,
			});
		}

		// Cloudinary upload
		let cloudResponseFile;
		let cloudResponseImage;
		if (file) {
			const fileUri = getDataUri(file);
			cloudResponseFile = await cloudinary.uploader.upload(
				fileUri.content,
				{
					resource_type: "auto",
				}
			);
		}

		if (image) {
			const fileUri = getDataUri(image);
			cloudResponseImage = await cloudinary.uploader.upload(
				fileUri.content,
				{
					resource_type: "auto",
				}
			);
		}
		const skillArray = skills?.split(",");
		user.fullname = fullname?.length > 0 ? fullname : user.fullname;
		user.username = username?.length > 0 ? username : user.username;
		user.email = email?.length > 0 ? email : user.email;
		user.phoneNumber = phoneNumber || user.phoneNumber;
		user.profile.bio = bio?.length > 0 ? bio : user.profile.bio;
		user.profile.skills =
			skills?.length > 0 ? skillArray : user.profile.skills;
		user.profile.resumeName =
			resumeName?.length > 0 ? resumeName : user.profile.resumeName;
		if (file && cloudResponseFile) {
			user.profile.resume = cloudResponseFile?.secure_url;
		}
		if (image && cloudResponseImage) {
			user.profile.profileImage = cloudResponseImage?.secure_url;
		}

		await user.save();

		user = {
			_id: user._id,
			fullname: user.fullname,
			username: user.username,
			email: user.email,
			phoneNumber: user.phoneNumber,
			role: user.role,
			profile: user.profile,
		};

		return res.status(200).json({
			message: "Profile updated successfully",
			success: true,
			user,
		});
	} catch (error) {
		console.log(error);
	}
};
