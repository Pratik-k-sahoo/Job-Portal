import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		fullname: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: Number,
			required: true,
		},
		role: {
			type: String,
			enum: ["student", "recruiter"],
			required: true,
		},
		profile: {
			bio: { type: String },
			skills: [{ type: String }],
			resume: { type: String }, //URL to RESUME FILE
			resumeName: { type: String },
			company: { type: Schema.Types.ObjectId, ref: "Company" },
			profileImage: { type: String, default: "" },
		},
	},
	{ timestamps: true }
);

export const User = model("User", userSchema);
