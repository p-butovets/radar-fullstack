import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Tracker from './pages/tracker/Tracker';
import Admin from './pages/admin/Admin';
import LoginPage from './pages/loginPage/LoginPage';
import Dashboard from './pages/dashboard/Dashboard';

export const useRoutes = (isAuthenticated, isAdmin) => {
    // user routes
    if (isAuthenticated && !isAdmin) {
        return (
            <Routes>
                <Route path='/tracker' element={<Tracker />} />
                <Route path="*" element={< Tracker />} />
            </Routes>
        )
    }

    // admin routes
    if (isAuthenticated && isAdmin) {
        return (
            <Routes>
                <Route path='/tracker' element={<Tracker />} />
                <Route path='/admin' element={<Admin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Tracker />} />
            </Routes>
        )
    }

    //default
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path="*" element={<LoginPage />} />
        </Routes>
    )
}