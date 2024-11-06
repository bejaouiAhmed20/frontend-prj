import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaUtensils, FaPhone, FaCalendarAlt } from "react-icons/fa";
import { MdTableBar } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Alert, Snackbar, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import MenuDisplayPage from "../owner/MenuDisplayPage";

function CoffeeShopPage() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [nbPersons, setNbPersons] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // For dialog visibility

  useEffect(() => {
    GetOneDestination();
  }, [id]);

  function GetOneDestination() {
    axios
      .get("http://localhost:5000/destinations/" + id)
      .then((res) => {
        setData(res.data);
        console.log("Data received: ", res.data);
      })
      .catch((err) => console.log(err));
  }

  function handleReserve() {
    axios
      .post("http://localhost:5000/reservations/add/" + id, {
        idClient: 1,
        numberOfPersons: nbPersons,
        reservationDate: selectedDate,
      })
      .then((res) => {
        if (res.status === 200) {
          setOpenSnackbar(true);
        }
      })
      .catch((err) => console.log(err));
  }

  const handleOpenDialog = () => {
    setOpenDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  return (
    <div className="container mx-auto p-4">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Reservation Added successfully
        </Alert>
      </Snackbar>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="reservation-dialog"
        aria-describedby="dialog-for-reservation-form"
      >
        <DialogTitle>Reserve a Table</DialogTitle>
        <DialogContent>
          <div className="space-y-4">
            <div>
              <p className="text-lg">Select Date</p>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date.toLocaleDateString())}
                className="w-full p-3 border border-gray-300 rounded-lg"
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select a Date"
              />
            </div>
            <div>
              <TextField
                fullWidth
                label="Number of Persons"
                type="number"
                variant="outlined"
                onChange={(e) => setNbPersons(e.target.value)}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleReserve();
              handleCloseDialog();
            }}
            color="primary"
            variant="contained"
          >
            Confirm Reservation
          </Button>
        </DialogActions>
      </Dialog>

      {data[0] && (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 lg:w-2/5">
            <img
              src={"http://localhost:5000" + data[0].image}
              alt={data[0].name}
              className="w-full rounded-xl shadow-lg"
            />
          </div>

          <div className="flex-1 lg:w-3/5 bg-white p-6 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-4">{data[0].name}</h1>
            <p className="text-lg mb-4">{data[0].description}</p>
            <p className="text-lg mb-4">
              <FaMapMarkerAlt className="inline mr-2" />
              {data[0].adresse}
            </p>
            <p className="text-lg mb-4">
              <FaUtensils className="inline mr-2" />
              Type: {data[0].type}
            </p>
            <p className="text-lg mb-4">
              <MdTableBar className="inline mr-2" />
              Number of Tables: {data[0].tables}
            </p>
            <p className="text-lg mb-4">
              <FaPhone className="inline mr-2" />
              Phone Number: {data[0].phone}
            </p>

            {/* Menu Section - Removed Image, Added Menu Display Page */}
            <MenuDisplayPage />

            <div className="mt-8">
              <button
                onClick={handleOpenDialog} // Open the dialog when clicked
                className="flex items-center gap-2 px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800"
              >
                <FaCalendarAlt /> Reserve Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoffeeShopPage;
