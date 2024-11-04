import { Container } from "postcss";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate()
  useEffect(()=>{
    if( localStorage.getItem('isAuthenticated')!= 'true'){
        navigate('/admin')
    }
  
  },[])
  return(
    <div>
      <h1>Dashboard</h1>
      <Link to={"tables"}>All Destinations</Link>
      <p></p>
      <Link to={"demands"}>All Demands</Link>
      <Outlet/>
    </div>
  )
}
  
export default Dashboard;
