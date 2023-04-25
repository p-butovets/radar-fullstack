import { configureStore } from '@reduxjs/toolkit';
import slideMenu from '../components/slideMenu/slideMenuSlice';
import tracker from '../pages/tracker/trackerSlice';


const store = configureStore({
    reducer: { slideMenu, tracker },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;