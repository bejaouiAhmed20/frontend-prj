// index.js (Routes)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"; // Import Navigate
import AddDestination from './pages/admin/AddDestinationPage';
import DestinationDetailsPage from './pages/user/DestinationDetailsPage';
import ClientPage from "./pages/user/DestinationsPage";
import Dashboard from './pages/admin/Dashboard';
import AdminTable from "./pages/admin/AdminTable";
import Demands from "./pages/admin/Demands";
import AdminHomePage from "./pages/owner/ownerHomePage";
import HomePage from "./pages/user/HomePage";
import AboutPage from "./pages/user/AboutPage";
import NotFoundPage from "./pages/admin/NotFoundPage";
import LoginPage from "./pages/admin/loginPage";
import OwnerAuthPage from "./pages/owner/ownerLogin";
import MenuPage from "./pages/owner/MenuPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />, 
  },
  {
    path: "/admin",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <AdminTable /> },
      { path: "tables", element: <AdminTable /> },
      { path: "demands", element: <Demands /> },
    ],
  },
  {
    path: "/destination_details/:id",
    element: <DestinationDetailsPage />,
  },
  {
    path: "/destinations",
    element: <ClientPage />,
  },
  {
    path: "/login",
    element: <OwnerAuthPage />,
  },
  {
    path: "/owner-home-page",
    element: <AdminHomePage />,
    children: [
      { path: "menus/:id", element: <MenuPage /> },
      { path: "add_destination/:id", element: <AddDestination /> },
    ],
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "*", 
    element: <NotFoundPage />, 
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
