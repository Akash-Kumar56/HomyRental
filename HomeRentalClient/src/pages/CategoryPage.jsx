import React, { useState } from 'react'
import "../styles/List.scss"
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setListings } from '../redux/state';
import ListingCard from '../components/ListingCard';
import { useEffect } from 'react';
import Footer from "../components/Footer"

const CategoryPage = () => {
  const [loading, setLoading] = useState(true)
  const { category } = useParams()
  const dispatch = useDispatch()

  const listings = useSelector((state) => state.listings.listings || []);
  const getFeedListings = async () => {
    try {
      const response = await fetch(
        `https://homyrentalserver2.onrender.com/properties?category=${category}`,  
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("fetch listings faild", err.message);
    }
  };
  useEffect(() => {
      getFeedListings();
    }, [category]);

  return loading ? <Loader /> : (
    <>
    <Navbar />
    <h1 className="title-list">{category}</h1>
      <div className='list'>
        {listings.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>
      <Footer />
    </>
  )
}

export default CategoryPage;
