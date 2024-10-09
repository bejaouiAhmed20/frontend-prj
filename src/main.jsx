import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddDestination from './pages/admin/AddDestinationPage'
import DestinationDetailsPage from './pages/user/DestinationDetailsPage'
import ClientPage from "./pages/user/DestinationsPage";
import DemoPageContent from './pages/admin/Dashboard'
const router = createBrowserRouter([
  {
    path: "/dashboard",
    element:<DemoPageContent/>,
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
    path: "/destinations/",
    element: <ClientPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
