import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setTripList } from '../redux/state';
import '../styles/List.scss';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector(state => state.user?._id); // ✅ Prevent undefined user
  const tripList = useSelector(state => state.user?.tripList || []); // ✅ Ensure tripList is always an array

  const dispatch = useDispatch();

  const getTripList = async () => {
    if (!userId) {
      console.warn("No user ID found. Skipping API call.");
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching trips for user:", userId);
      const response = await fetch(`https://homyrentalserver2.onrender.com/users/${userId}/trips`, {
        method: 'GET',
      });

      if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

      const data = await response.json();
      console.log("Trip List Data:", data);

      dispatch(setTripList(data || [])); // ✅ Always dispatch an array
    } catch (err) {
      console.error('Error fetching trip list:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) getTripList();
  }, [userId]); // ✅ Depend on userId to prevent redundant API calls

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>

      {loading ? (
        <Loader />
      ) : tripList.length === 0 ? (
        <p className="empty-message">No trips found. Start planning your next adventure!</p>
      ) : (
        <div className="list">
          {tripList
            .filter(({ listingId }) => listingId !== null) // ✅ Filter out null values
            .map(({ listingId, hostId, startDate, endDate, totalPrice }) => (
              <ListingCard
                key={listingId._id} // ✅ Ensure unique key
                listingId={listingId._id}
                creator={hostId?._id || "Unknown"}
                listingPhotoPaths={listingId.listingPhotoPaths || []}
                city={listingId.city || "Unknown"}
                province={listingId.province || "Unknown"}
                country={listingId.country || "Unknown"}
                category={listingId.category || "Misc"}
                startDate={startDate || "N/A"}
                endDate={endDate || "N/A"}
                totalPrice={totalPrice || 0}
                booking={true}
              />
            ))}
        </div>
      )}

      <Footer />
    </>
  );
};

export default TripList;
