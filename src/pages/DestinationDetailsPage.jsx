import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
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

function DestinationDetailsPage() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(getOneDestination, [id]);

  function getOneDestination() {
    axios
      .get("http://localhost:5000/onedestinations/" + id)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    axios
      .delete("http://localhost:5000/delete/" + id)
      .then(() => {
        console.log("Element supprimé");
        setOpen(false);
        navigate("/dashboard");
        handleClose(true);
      })
      .catch((err) => {
        console.error("Erreur lors de la suppression:", err);
      });
  };

  return (
    <div>
      <h1>Name: {data[0]?.id}</h1>
      <h1>Description: {data[0]?.description}</h1>
      <h1>Nombre des tables: {data[0]?.tables}</h1>
      <img src={data[0]?.image} />
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" color="error" onClick={handleClickOpen}>
          Supprimer
        </Button>
      </Stack>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Name: {data[0]?.name}
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
            Est-ce que vous etes sur de supprimer ?
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
    </div>
  );
}

export default DestinationDetailsPage;
