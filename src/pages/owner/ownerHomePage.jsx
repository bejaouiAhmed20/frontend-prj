import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "./Card.jsx";

function AdminHomePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [id,setId]=useState()

//Todo 
  useEffect(() => {
    setId(localStorage.getItem("ownerId"))
    axios
      .get("http://localhost:5000/destinations/${id}") //hedhi ya ahmed ne9ssa
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleClick = (id)=>{
    navigate(`/destination_details/${id}`)
  }
  return (
    <div>
      <div className="text-red-400">OwnerHomePage</div>
      <Link to={`/add_destination/${id}`}>Add a Destination</Link>

      <Container>
        {data.map((ele) => (
          <Card
            key={ele.id}
            name={ele.name}
            description={ele.description}
            adresse={ele.adresse}
            image={"http://localhost:5000/destinations" + ele.image}
            handleClick={()=>handleClick(ele.id)}
          />
        ))}
      </Container>
      
    </div>
   
  );
}

export default AdminHomePage;
