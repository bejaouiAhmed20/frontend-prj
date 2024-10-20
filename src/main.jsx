import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddDestination from './pages/admin/AddDestinationPage'
import DestinationDetailsPage from './pages/user/DestinationDetailsPage'
import ClientPage from "./pages/user/DestinationsPage";
import Dashboard from './pages/admin/Dashboard'
import AdminTable from "./pages/admin/AdminTable";
import Demands from "./pages/admin/Demands";
import AdminHomePage from "./pages/owner/ownerHomePage";
import OwnerAuthPage from "./pages/owner/ownerLogin";
const router = createBrowserRouter([
  {
    path: "/dashboard",
    element:<Dashboard/>,
    children:[
      {
        path: "tables",
        element: <AdminTable />,
      },
      {
        path: "demands",
        element: <Demands />,
      },
    ],
  },
,
  {
    path: "/add_destination/:id",
    element: <AddDestination />,
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
  },

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
