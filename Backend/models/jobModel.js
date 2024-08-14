import { Schema, model } from "mongoose";

const jobSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		requirements: [
			{
				type: String,
			},
		],
		salary: {
			type: Number,
			required: true,
		},
        experienceLevel: {
            type: String,
            required: true,
            enum: ["entry-level", "mid-level", "senior"]
        },
		location: {
			type: String,
			required: true,
		},
		jobType: {
			type: String,
			enum: ["full-time", "part-time", "internship"],
		},
		position: {
			type: Number,
			required: true,
		},
		company: {
			type: Schema.Types.ObjectId,
			ref: "Company",
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		applications: [
			{
				type: Schema.Types.ObjectId,
				ref: "Application",
			},
		],
	},
	{ timestamps: true }
);

export const Job = model("Job", jobSchema);
