import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DestinationDetailsPage() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(GetOneDestination, [id]);
  function GetOneDestination() {
    axios
      .get("http://localhost:5000/onedestinations/" + id)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>Name: {data[0]?.name}</h1>
    </div>
  );
}

export default DestinationDetailsPage;
