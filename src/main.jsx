import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminHomePage from './pages/admin/AdminHomePage'
import AddDestination from './pages/admin/AddDestinationPage'
import DestinationDetailsPage from './pages/user/DestinationDetailsPage'

const router = createBrowserRouter([
  {
    path: "/admin_home_page",
    element:<AdminHomePage/>,
  },
  {
    path: "/add_destination",
    element: <AddDestination />,
  },
  {
    path: "/destination_details/:id",
    element: <DestinationDetailsPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
