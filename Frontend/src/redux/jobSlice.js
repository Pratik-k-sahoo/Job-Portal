import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
	name: "jobs",
	initialState: {
		jobs: [],
		job: null,
        adminJobs: [],
        searchQuery: "",
	},
	reducers: {
		setJobs: (state, action) => {
			state.jobs = action.payload;
		},
		setJob: (state, action) => {
			state.job = action.payload;
		},
        setAdminJobs: (state, action) => {
            state.adminJobs = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
	},
});

export const { setJobs, setJob, setAdminJobs, setSearchQuery } = jobSlice.actions;
export default jobSlice.reducer;
