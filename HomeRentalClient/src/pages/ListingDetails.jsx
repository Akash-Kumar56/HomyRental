import React from "react";
import "../styles/ListingDetails.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import "../styles/ListingDetails.scss";
import { facilities } from "../data";
import { useSelector } from "react-redux";
import Footer from "../components/Footer"

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties/${listingId}`,
        { method: "GET" }
      );
      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching listing details: ", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  //Booking date range

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    //update the selected date range
    setDateRange([ranges.selection]);
  };
  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24);

  //Submit booking

  const customerId = useSelector((state) => state?.user?._id);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!customerId) {
      //Redirect to login page
      navigate("/login");
      return;
    }
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      };

      const response = await fetch("http://localhost:3001/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });
      if (response.ok) {
        navigate(`/${customerId}/trips`);
      }
    } catch (err) {
      console.log("Error submitting booking: ", err.message);
    }
  }



  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>
        <div className="photos">
          {listing.listingPhotoPaths?.map((item, index) => (
            <img
              src={`http://localhost:3001/${item.replace("public", "")}`}
              alt="listing photos"
              key={index}
            />
          ))}
        </div>
        <h2>
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>
        <hr />

        <div className="profile">
          <img
            src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
              "public",
              ""
            )}`}
            alt=""
          />
          <h3>
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />
        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />
        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDetails}</p>
        <hr />
        <div className="booking">
          <div>
            <h2>What this place offers ?</h2>
            <div className="amenities">
              {listing?.amenities && facilities.length > 0 ? (
                facilities
                  .filter((facility) =>
                    listing.amenities.includes(facility.name)
                  ) // Only show selected ones
                  .map((facility, index) => (
                    <div className="facility" key={index}>
                      <div className="facility_icon">
                        {facility.icon || ""}
                      </div>
                      <p>{facility.name}</p>
                    </div>
                  ))
              ) : (
                <p>No amenities available</p>
              )}
            </div>
          </div>
          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>
                  Rs{listing.price} x {dayCount} nights
                </h2>
              ) : (
                <h2>
                  Rs{listing.price} x {dayCount} nights
                </h2>
              )}
              <h2>Total price: Rs{listing.price * dayCount}</h2>
              <p>Start date: {dateRange[0].startDate.toDateString()}</p>
              <p>End date: {dateRange[0].endDate.toDateString()}</p>

              <button className="button" type="submit" onClick={handleSubmit}>
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};



export default ListingDetails;
