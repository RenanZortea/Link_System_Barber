import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Sidebar from './hoc/sidebar/sidebar';
import Home from './containers/home/index';
import './index.css';
import Login from "./store/auth/login/index";
import Register from "./store/auth/register/index";
import { AuthProvider, useAuth } from "./contexts/auth/index";
import { Billing } from './containers/billing';
import LandingPage  from './containers/landingPage';
import Scheduler from './containers/scheduler/index';
import Customers from './containers/customers';
import { useLocation } from 'react-router-dom';
import Settings from './containers/settings';
import { DarkModeContext } from './contexts/darkModeContext';

const AppRoutes = () => {
  const routesArray = [
    { path: "/", element: <LandingPage /> },
    { path: "*", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/home", element: <Home /> },
    { path: "/faturamento", element: <Billing />},
    { path: "/scheduler", element: <Scheduler />},
    { path: "/customers", element: <Customers /> },
    { path: "/configuracoes", element: <Settings /> }
  ];
  return useRoutes(routesArray);
};

const AppContent = () => {
  const { userLoggedIn } = useAuth();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-slate-200 via-slate-300 to-white dark:from-gradient-dark-1 dark:via-gradient-dark-2 dark:to-black text-white">
      {userLoggedIn && location.pathname !== "/" && <Sidebar />}
      <div className="flex-grow">
        <AppRoutes />
      </div>
    </div>
  );
};

const HomeNL = () => {

  const [darkMode, setDarkMode] = useState();

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
    </DarkModeContext.Provider>
  );
};

export default HomeNL;