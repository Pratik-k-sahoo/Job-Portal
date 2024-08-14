import { createSlice } from "@reduxjs/toolkit";

const comapnySlice = createSlice({
	name: "company",
	initialState: {
		company: null,
        companies: [],
        edit: false
	},
	reducers: {
		setCompany: (state, action) => {
			state.company = action.payload;
		},
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setEdit: (state, action) => {
            state.edit = action.payload;
        }
	},
});

export const { setCompany, setCompanies, setEdit } = comapnySlice.actions;
export default comapnySlice.reducer;
