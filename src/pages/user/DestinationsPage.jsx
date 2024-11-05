import { Container, TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import AppBarComponent from "../../components/AppBarComponent";

function ClientPage() {
  const [data, setData] = useState([]); // Data from API
  const [filteredData, setFilteredData] = useState([]); // Filtered data based on search
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/destinations")
      .then((res) => {
        setData(res.data);
        console.log(res.data)
        setFilteredData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching destinations:", err);
        setError("Failed to load destinations.");
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <AppBarComponent />
      <h2 className="text-3xl text-center m-4 capitalize">Client Page</h2>
      <Container>
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Container>

      <Container style={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Grid item xs={12} key={item.id}> {/* Each item now takes full width */}
                <Card
                  item={item}
                  
                />
              </Grid>
            ))
          ) : (
            <div>No results found.</div>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default ClientPage;
