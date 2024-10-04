import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Typography, Container, Paper, Grid, List, ListItem, ListItemText } from "@mui/material";

function AddDestination() {
  const [name, setName] = useState("");
  const [tables, setTables] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [menu, setMenu] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/destinations")
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleImage(e) {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  }
  function handleMenuImage(e) { 
    console.log(e.target.files);
    setMenu(e.target.files[0]);
  }

  function handleApi() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("tables", tables);
    formData.append("image", image);
    formData.append("menu", menu);
    formData.append("description", description);
    formData.append("adresse", address);
    axios
      .post("http://localhost:5000/addDestination", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Add Destination
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Number of Tables"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          onChange={(e) => setTables(e.target.value)}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="description"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          name="Image"
          onChange={handleImage}
          style={{ margin: '20px 0' }}
        />
        <input
          type="file"
          name="Menu"
          onChange={handleMenuImage}
          style={{ margin: '20px 0' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleApi}
          style={{ marginTop: '10px' }}
        >
          Submit
        </Button>
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom>
        Restaurants
      </Typography>
      <List>
        {data.map((ele) => (
          <ListItem key={ele.id}>
            <ListItemText
              primary={`Name: ${ele.name}`}
              secondary={`Tables Available: ${ele.tables}`}
            />
            <img
              src={`http://localhost:5000/` + ele.image}
              alt={ele.name}
              style={{ width: '100px', height: 'auto', marginLeft: '10px' }}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default AddDestination;
