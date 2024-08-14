import { Job } from "../models/jobModel.js";

export const postJob = async (req, res) => {
	try {
		const {
			title,
			description,
			requirements,
			salary,
			experience,
			jobType,
			location,
			position,
			companyId,
		} = req.body;
		console.log(
			title,
			description,
			requirements,
			salary,
			experience,
			jobType,
			location,
			position,
			companyId
		);

        const data = {
			title,
			description,
			requirements,
			salary,
			experience,
			jobType,
			location,
			position,
			companyId,
		};

		const userId = req.id;
		if (
			!title ||
			!description ||
			!requirements ||
			!salary ||
			!experience ||
			!jobType ||
			!location ||
			!position ||
			!companyId
		) {
			return res.status(400).json({
				message: "Something is missing",
                data,
				success: false,
			});
		}
		const job = await Job.create({
			title,
			description,
			requirements: requirements.split(","),
			salary: Number(salary),
			experienceLevel: experience,
			jobType,
			location,
			position: Number(position),
			company: companyId,
			createdBy: userId,
		});

		return res.status(201).json({
			message: "New job post created",
			success: true,
			job,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getAllJobs = async (req, res) => {
	try {
		const keyword = req.query.keyword || "";
		const query = {
			$or: [
				{ title: { $regex: keyword, $options: "i" } },
				{ description: { $regex: keyword, $options: "i" } },
				{ location: { $regex: keyword, $options: "i" } },
			],
		};
		const jobs = await Job.find(query)
			.populate("company", "name")
			.populate({
				path: "company",
			})
			.populate({
				path: "createdBy",
			});
		if (!jobs) {
			return res.status(404).json({
				message: "Jobs not found",
				success: false,
			});
		}
		return res.status(200).json({
			message: "Jobs found",
			success: true,
			jobs,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getJobById = async (req, res) => {
	try {
		const job = await Job.findById(req.params.id)
			.populate("company", "name")
			.populate("createdBy", "fullname")
			.populate("applications", "applicant");
		if (!job) {
			return res.status(404).json({
				message: "Job not found",
				success: false,
			});
		}
		return res.status(200).json({
			message: "Job found",
			success: true,
			job,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getAdminJob = async (req, res) => {
	try {
		const jobs = await Job.find({ createdBy: req.id }).populate(
			"company",
			"name"
		);
		if (!jobs) {
			return res.status(404).json({
				message: "Jobs not found",
				success: false,
			});
		}
		return res.status(200).json({
			message: "Jobs found",
			success: true,
			jobs,
		});
	} catch (error) {
		console.log(error);
	}
};

export const updateAdminJob = async (req, res) => {
	try {
		const {
			jobId,
			title,
			description,
			salary,
			experience,
			jobType,
			location,
			position,
		} = req.body;

		let requirements = req.body.requirements;
		requirements = requirements.length > 0 ? requirements.split(",") : [];

		const job = await Job.findById(jobId);
		if (!job) {
			return res.status(404).json({
				message: "Job not found",
				success: false,
			});
		}

		job.title = title?.length > 0 ? title : job.title;
		job.requirements =
			requirements?.length > 0 ? requirements : job.requirements;
		job.description =
			description?.length > 0 ? description : job.description;
		job.salary = salary?.length > 0 ? salary : job.salary;
		job.experience = experience?.length > 0 ? experience : job.experience;
		job.jobType = jobType?.length > 0 ? jobType : job.jobType;
		job.location = location?.length > 0 ? location : job.location;
		job.position = position?.length > 0 ? position : job.position;

		await job.save();

		return res.status(200).json({
			message: "Jobs Updated",
			success: true,
			job,
		});
	} catch (error) {
		console.log(error);
	}
};
