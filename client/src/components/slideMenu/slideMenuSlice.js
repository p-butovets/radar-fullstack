import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openMenu: false
}

const slideMenuSLice = createSlice({
    name: 'slideMenu',
    initialState,
    reducers: {
        toggleMenu: state => {
            return { ...state, openMenu: !state.openMenu };
        }
    }
})

const { actions, reducer } = slideMenuSLice;

export default reducer;
export const { toggleMenu } = actions;