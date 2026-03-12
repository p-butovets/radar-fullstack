import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Tracker from './pages/tracker/Tracker';
import Admin from './pages/admin/Admin';

export const useRoutes = (isAuthenticated, isAdmin) => {
    // user routes
    if (!isAdmin) {
        return (
            <Routes>
                <Route path='/tracker' element={<Tracker />} />
                <Route path="*" element={<Tracker />} />
            </Routes>
        )
    }

    // admin routes
    if (isAdmin) {
        return (
            <Routes>
                <Route path='/tracker' element={<Tracker />} />
                <Route path='/admin' element={<Admin />} />
                <Route path="*" element={<Tracker />} />
            </Routes>
        )
    }

    // default - always show Tracker
    return (
        <Routes>
            <Route path='/tracker' element={<Tracker />} />
            <Route path='/admin' element={<Admin />} />
            <Route path="*" element={<Tracker />} />
        </Routes>
    )
}