import { configureStore } from '@reduxjs/toolkit';
import dailyTaskSlice from './reducer';

export const store = configureStore({
    reducer: {
        dailyTask: dailyTaskSlice,
    },
})



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;