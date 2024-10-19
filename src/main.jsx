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
import OwnerAuthPage from "./pages/owner/owner";
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
    path: "/add_destination",
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
    path: "/owner",
    element: <OwnerAuthPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
