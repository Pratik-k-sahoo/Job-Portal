import { Company } from "../models/companyModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const registerCompany = async (req, res) => {
	try {
		const { companyName } = req.body;
		if (!companyName) {
			return res.status(400).json({
				message: "Company name is required",
				success: false,
			});
		}

		let company = await Company.findOne({ name: companyName });
		if (company) {
			return res.status(400).json({
				message: "Company already registered",
				success: false,
			});
		}

		company = await Company.create({
			name: companyName,
			userId: req.id,
		});

		return res.status(201).json({
			message: "Company registered",
			success: true,
			company,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getCompany = async (req, res) => {
	try {
		const userId = req.id;
		const companies = await Company.find({ userId });
		if (!companies) {
			return res.status(404).json({
				message: "Companies not found",
				success: false,
			});
		}

		return res.status(200).json({
			message: "Companies found",
			companies,
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getCompanyById = async (req, res) => {
	try {
		const companyId = req.params.id;
		const company = await Company.findById(companyId);
		if (!company) {
			return res.status(404).json({
				message: "Company not found",
				success: false,
			});
		}

		return res.status(200).json({
			message: "Company found",
			company,
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};

export const updateCompany = async (req, res) => {
	try { 
		const { companyName, description, website, location } = req.body;
		const image = req.files?.image?.[0];
        
		const company = await Company.findById(req.params.id);
        
		if (!company) {
            return res.status(404).json({
                message: "Company not found",
				success: false,
			});
		}

        if(companyName?.length > 0 && companyName === company.name) {
            return res.status(404).json({
				message: "Company already registered or cannot be same as before",
				success: false,
			}); 
        } 
        let cloudResponseImage;
        if (image) {
			const fileUri = getDataUri(image);
			cloudResponseImage = await cloudinary.uploader.upload(
				fileUri.content,
				{
					resource_type: "auto",
				}
			);
		}

        company.name = companyName?.length > 0 ? companyName : company.name;
        company.description = description?.length > 0? description : company.description;
        company.website = website?.length > 0? website : company.website;
        company.location = location?.length > 0? location : company.location;
        if (image && cloudResponseImage) {
			company.logo = cloudResponseImage?.secure_url;
		} 

        await company.save();

		return res.status(200).json({
			message: "Company details updated",
			company,
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};
