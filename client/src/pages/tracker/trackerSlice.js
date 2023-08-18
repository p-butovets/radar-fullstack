import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showKitchen: "all", // filter courires by this kitchenID, or show ALL
    showCouriers: "all" // filter courires by this courierID, or show ALL
}

const trackerSlice = createSlice({
    name: 'showCouriers',
    initialState,
    reducers: {
        setKitchenID: (state, action) => {
            state.showCouriers = "all"
            state.showKitchen = action.payload;
        },
        setCourierID: (state, action) => {
            state.showKitchen = "all"
            state.showCouriers = action.payload;
        }
    }
})

const { actions, reducer } = trackerSlice;

export default reducer;
export const { setKitchenID, setCourierID } = actions;