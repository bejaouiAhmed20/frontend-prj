import { Container, Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Card from "./Card.jsx";
import { FaHome, FaPlus, FaUtensils, FaUser, FaTags, FaSignOutAlt } from "react-icons/fa";

function AdminHomePage() {
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("ownerId"));
    axios
      .get(`http://localhost:5000/destinations/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleClick = (id) => {
    navigate(`/destination_details/${id}`);
  };

  return (
    <div className="flex">
      <Drawer
        anchor="left"
        variant="permanent"
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            backgroundColor: "#f4f4f4",
          },
        }}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Owner Dashboard</h2>
          <Divider />
          <List>
            <ListItem button component={Link} to="/">
              <FaHome className="mr-2" />
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to={`add_destination/${id}`}>
              <FaPlus className="mr-2" />
              <ListItemText primary="Add Destination" />
            </ListItem>
            <ListItem button component={Link} to={`reservations/${id}`}>
              <FaUtensils className="mr-2" />
              <ListItemText primary="Reservation" />
            </ListItem>
            <ListItem button component={Link} to={`menus/${id}`}>
              <FaUtensils className="mr-2" />
              <ListItemText primary="Menu" />
            </ListItem>
            <ListItem button component={Link} to={`profile/${id}`}>
              <FaUser className="mr-2" />
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button component={Link} to={`offers/${id}`}>
              <FaTags className="mr-2" />
              <ListItemText primary="Offers" />
            </ListItem>
            <ListItem button component={Link} to="/logout">
              <FaSignOutAlt className="mr-2 text-red-500" />
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>

      <div className="flex-1 p-4 ml-[250px]">
        <Container>
          <Outlet /> 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((ele) => (
              <Card
                key={ele.id}
                name={ele.name}
                description={ele.description}
                adresse={ele.adresse}
                image={"http://localhost:5000/destinations" + ele.image}
                handleClick={() => handleClick(ele.id)}
              />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AdminHomePage;
