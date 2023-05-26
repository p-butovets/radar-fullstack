import { configureStore } from '@reduxjs/toolkit';
import slideMenu from '../components/slideMenu/slideMenuSlice';
import tracker from '../pages/tracker/trackerSlice';
import dashboard from '../pages/dashboard/dashboardSlice';


const store = configureStore({
    reducer: { slideMenu, tracker, dashboard },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;