import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaUtensils,FaPhone } from "react-icons/fa";
import { MdTableBar } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

function CoffeeShopPage() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    GetOneDestination();
  }, [id]);

  function GetOneDestination() {
    axios
      .get("http://localhost:5000/onedestinations/" + id)
      .then((res) => {
        setData(res.data);
        console.log("Data received: ", res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <StyledWrapper>
      <div className="coffee-shop-container">
        {data[0] && (
          <>
            <div className="hero-image">
              <img
                src={"http://localhost:5000" + data[0].image}
                alt={data[0].name}
              />
            </div>

            <div className="content-wrapper">
              <div className="left-content">
                <h1>{data[0].name}</h1>
                <h4>{data[0].description}</h4>
                <p>
                  <FaMapMarkerAlt /> {data[0].adresse}
                </p>
                <p>
                  <FaUtensils /> Type: {data[0].type}
                </p>
                <p>
                  <MdTableBar /> Number of Tables: {data[0].tables}
                </p>
                <p>
                  <FaPhone /> Phone Number: {data[0].phone}
                </p>

                {/* <div className="tabs">
                  <button className="tab-btn">About</button>

                  <button className="tab-btn">Reviews</button>
                </div> */}

                <div className="menu-image">
                  <img
                    src={"http://localhost:5000" + data[0].menu}
                    alt="Menu"
                  />
                </div>
              </div>

              <div className="right-content">
                <h2>Reserve a Table</h2>
                <div className="reservation-calendar">
                  <p>Select Date</p>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="date-picker"
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select a Date"
                  />
                  <div className="btn-container">
                    <button className="reserve-btn">Reserve Now</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .coffee-shop-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .hero-image img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .content-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .left-content {
    width: 60%;
  }

  .left-content h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .left-content p {
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .left-content p svg {
    margin-right: 8px;
  }

  .tabs {
    margin-top: 20px;
  }

  .tab-btn {
    padding: 10px 15px;
    margin-right: 10px;
    background-color: #eee;
    border: none;
    cursor: pointer;
  }

  .menu-image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-top: 20px;
  }

  .right-content {
    width: 35%;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .right-content h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  .reservation-calendar {
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .reservation-calendar p {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  .date-picker {
    padding: 12px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
    font-size: 1rem;
    background-color: #ffffff;
  }

  .btn-container {
    margin-top: 100%;
  }

  .reserve-btn {
    padding: 15px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.2rem;
    width: 100%;
  }

  .reserve-btn:hover {
    background-color: #0056b3;
  }
`;

export default CoffeeShopPage;
