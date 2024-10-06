import axios from "axios";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AdminTable = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null); // Handle selected item ID
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = (rowId) => {
    setId(rowId); // Set selected ID
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then(() => {
        console.log("Element supprimé");
        setOpen(false);
        setData(data.filter((item) => item.id !== id)); // Update table without refreshing
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Erreur lors de la suppression:", err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/destinations")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Find the selected destination's name for display in the dialog
  const selectedDestination = data.find((item) => item.id === id);

  return (
    <Container>
      <h1>Table des destinations</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nom du destination</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Nombre des tables</TableCell>
              <TableCell align="left" colSpan={3}>
                Num. de téléphone
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.tables}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleClickOpen(row.id)}
                    >
                      Supprimer
                    </Button>
                  </Stack>
                </TableCell>
                <TableCell align="left">
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="primary">
                      Modifier
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for deletion confirmation */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Name: {selectedDestination?.name || "Destination"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Est-ce que vous êtes sûr de vouloir supprimer ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Annuler
          </Button>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Supprimer
            </Button>
          </Stack>
        </DialogActions>
      </BootstrapDialog>
    </Container>
  );
};

export default AdminTable;
