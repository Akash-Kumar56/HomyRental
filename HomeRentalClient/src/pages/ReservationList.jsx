import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setReservationList } from '../redux/state';
import '../styles/List.scss';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector(state => state.user?._id); // Safeguard against undefined user
  const reservationList = useSelector(state => state.user?.reservationList || []); // Ensure it's always an array

  const dispatch = useDispatch();

  const getReservationList = async () => {
    if (!userId) {
      console.warn("No user ID found. Skipping API call.");
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching reservations for user:", userId);
      const response = await fetch(`https://homyrentalserver2.onrender.com/users/${userId}/reservations`, {
        method: 'GET',
      });

      if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

      const data = await response.json();
      console.log("Reservation List Data:", data);

      dispatch(setReservationList(data || [])); // Always dispatch an array
    } catch (err) {
      console.error('Error fetching reservation list:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Reservation List</h1>

      {loading ? (
        <Loader />
      ) : reservationList.length === 0 ? (
        <p className="empty-message">No reservations found.</p>
      ) : (
        <div className="list">
          {reservationList
            .filter(({ listingId }) => listingId !== null) // ✅ Skip null listingId
            .map(({ listingId, hostId, startDate, endDate, totalPrice }) => (
              <ListingCard
                key={listingId._id} // Ensure key is unique
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

export default ReservationList;
