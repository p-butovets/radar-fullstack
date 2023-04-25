import { configureStore } from '@reduxjs/toolkit';
import slideMenu from '../components/slideMenu/slideMenuSlice';

const store = configureStore({
    reducer: { slideMenu },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;