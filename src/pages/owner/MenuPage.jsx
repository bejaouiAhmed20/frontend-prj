import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, Box, Container } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MenuDisplayPage from "./MenuDisplayPage";

const MenuPage = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState({
    name: "",
    category: "",
    price: ""
  });

  // Function to handle changes in form inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMenu((prevMenu) => ({
      ...prevMenu,
      [name]: value
    }));
  };

  // Save menu to the database
  const saveMenu = async () => {
    try {
      await axios.post("http://localhost:5000/menus", {
        name: menu.name,
        category: menu.category,
        price: parseFloat(menu.price),
        id_destination: parseInt(id, 10)
      });
      toast.success("Menu saved successfully");
      setMenu({ name: "", category: "", price: "" }); // Clear fields on success
    } catch (error) {
      console.error("Error saving menu:", error);
      toast.error("Failed to save menu");
    }
  };

  return (
    <Container maxWidth="sm" className="mt-8 p-4 bg-gray-100 rounded-lg">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Box className="mb-4">
        <h2 className="text-xl font-semibold">Add Menu</h2>
      </Box>

      <Box className="border rounded-md p-4 mb-4 flex flex-col space-y-4 bg-white shadow">
        <TextField
          label="Name"
          name="name"
          value={menu.name}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Category"
          name="category"
          value={menu.category}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Price"
          name="price"
          value={menu.price}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          type="number"
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={saveMenu}
        className="mt-4 w-full bg-blue-500 text-white"
      >
        Save Menu
      </Button>
    </Container>
  );
};

export default MenuPage;
