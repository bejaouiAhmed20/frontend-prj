import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import AdminTable from "./AdminTable";


function DemoPageContent() {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>
        <AdminTable />
      </Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  navigate: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutPattern() {
  const [pathname, setPathname] = React.useState("/orders");
  const navigate = React.useCallback((path) => setPathname(String(path)), []);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate,
    };
  }, [pathname, navigate]);

  return (
    // preview-start
    <AppProvider
      navigation={[
        {
          segment: "dashboard",
          title: "Dashboard",
          icon: <DashboardIcon />,
        },
        {
          segment: "orders",
          title: "Orders",
          icon: <ShoppingCartIcon />,
          pattern: "orders{/:orderId}*",
        },
      ]}
      router={router}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} navigate={navigate} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutPattern;
