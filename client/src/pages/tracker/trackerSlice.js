import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showCouriers: "all" // filter courires by this kitchenID, or show ALL
}

const trackerSlice = createSlice({
    name: 'showCouriers',
    initialState,
    reducers: {
        setKitchenID: (state, action) => {
            state.showCouriers = action.payload;
        }
    }
})

const { actions, reducer } = trackerSlice;

export default reducer;
export const { setKitchenID } = actions;