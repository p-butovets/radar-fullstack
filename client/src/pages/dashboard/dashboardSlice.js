import { format } from "date-fns";
import { createSlice } from "@reduxjs/toolkit";
const today = format(new Date(), "yyyy-MM-dd");

const initialState = {
    countingStatus: "idle",
    startDate: today,
    endDate: today
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        countingStart: state => {
            state.countingStatus = "counting"
        },
        countingEnd: state => {
            state.countingStatus = "idle"
        },
        setStartDate: (state, action) => {
            state.startDate = action.payload
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload
        }
    }
})

const { actions, reducer } = dashboardSlice;

export default reducer;
export const {
    countingStart,
    countingEnd,
    setStartDate,
    setEndDate
} = actions;