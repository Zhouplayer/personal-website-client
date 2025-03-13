import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import React from 'react';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage'
import AboutMe from './pages/AboutMePage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectPage from './pages/ProjectPage';
import BirthdayPage from "./pages/BirthdayPage";

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path='/aboutMe' element={<AboutMe />} />
                <Route path='/projects' element={<ProjectsPage />} />
                <Route path='/projects/:id' element={<ProjectPage />} />
                <Route path="/birthday/:friendName" element={<BirthdayPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        )
    )

    return (
        <RouterProvider router={router} />
    );
};

export default App