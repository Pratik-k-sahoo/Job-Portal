import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "application",
	initialState: {
		applicants: [],
		appliedApplications: [],
	},
	reducers: {
		setApplicants: (state, action) => {
			state.applicants = action.payload;
		},
		setAppliedApplications: (state, action) => {
            state.appliedApplications = action.payload;
        }
	},
});

export const { setApplicants, setAppliedApplications } = authSlice.actions;
export default authSlice.reducer;
