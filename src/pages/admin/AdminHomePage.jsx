import { List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';


function AdminHomePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:5000/destinations")
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div >AdminHomePage</div>
      <Link to={"/add_destination"}>Add a Destination</Link>
      <List>
        {data.map((ele) => (
          <ListItem key={ele.id} className="border border-black ">
            <ListItemText
              primary={`Name: ${ele.name}`}
              secondary={`Address: ${ele.tables}`}
            />
            <img
              src={"http://localhost:5000/" + ele.image}
              alt={ele.name}
              style={{ width: "100px", height: "auto", marginLeft: "10px" }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default AdminHomePage;
