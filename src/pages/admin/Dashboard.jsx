import { Container } from "postcss";
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
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
