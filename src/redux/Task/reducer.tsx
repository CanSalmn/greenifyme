import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
    category: "continues",
    description: "Type your tash here...",
};
export const dailyTaskSlice = createSlice({
    name: "dailyTask",
    initialState,
    reducers: {
        setCategory: (state, actions) => {
            state.category = actions.payload;
        },

        setDespription: (state, actions) => {
            state.description = actions.payload;
        },
    },
});

export const { setDespription, setCategory } =
    dailyTaskSlice.actions;

export default dailyTaskSlice.reducer;
