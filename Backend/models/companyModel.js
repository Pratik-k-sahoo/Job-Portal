import { Schema, model } from "mongoose";

const companySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
            unique: true
		},
		description: {
			type: String,
		},
		website: {
			type: String,
		},
		location: {
			type: String,
		},
		logo: {
			type: String, //URL of company Logo
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

export const Company = model("Company", companySchema);