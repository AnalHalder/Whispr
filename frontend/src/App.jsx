import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router";

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
  ]);
  return (
    <div>
      <Navbar />
      <RouterProvider router={router} />
    </div>
  )
}

export default App