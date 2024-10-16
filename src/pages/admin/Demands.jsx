import {
  Button,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DialogComp from "../../components/DialogComp";

function Demands() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});
  const [id, setId] = useState(null);
  function handleClose  (){
    setItem(null)
    setOpen(false)
  }
  function accept(){
    console.log(id)
    axios.put(`http://localhost:5000/destinations/${id}`)
    .then((res) => {
      console.log(res)
      setId(null)
      console.log("normalment saye")
    })
    .catch((err) => console.log(err));
  }
  function reject(){
    console.log(id)
    axios.put(`http://localhost:5000/destinations/reject/${id}`)
    .then((res) => {
      console.log(res)
      setId(null)
      console.log("normalment saye")
    })
    .catch((err) => console.log(err));
  }
  function handleOpen  (i){
    setItem(i)
    setOpen(true)
  }
  useEffect(() => {
    axios
      .get("http://localhost:5000/destinations/demands")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
 
  return (
    <Container>
      Demands
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">destination Name</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Actions</TableCell>
              <TableCell align="center">More Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.adresse}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">
                  <div className="flex">
                  <Button variant="contained" color="success"
                  onClick={()=>{
                    setId(row.id)
                    accept()
                  }}>
                    Accept
                  </Button>
                  <Divider orientation="vertical"/>
                  <Button variant="contained" color="error">
                    Reject
                  </Button>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="info"
                    onClick={()=>{
                      handleOpen(row)
                    }}
                  >
                    See More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogComp open={open} handleClose={handleClose} item={item}/>
    </Container>
  );
}

export default Demands;
