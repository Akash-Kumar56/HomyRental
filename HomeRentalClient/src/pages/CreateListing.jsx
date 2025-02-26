import React, { useState } from "react";
import "../styles/CreateListing.scss";
import Navbar from "../components/Navbar";
import { categories, facilities, types } from "../data";

import { RemoveCircleOutline, AddCircleOutline, Photo } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { IoIosImages } from "react-icons/io"
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"

const CreateListing = () => {
  const [category, setCategory] = useState("")
  const [type, setType] = useState("")
  

  //Location
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province:"",
    country: ""
  })

  const handleChangeLocation = (e) => {
    const { name, value } = e.target
    setFormLocation ({
      ...formLocation,
      [name]: value
    })
  }

  //Basics

  const [guestCount, setGuestCount] = useState(1)
  const [bedroomCount, setBedroomCount] = useState(1)
  const [bedCount, setBedCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)

  //description

  const [description, setDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDetails: "",
    price: ""
  })

  const handleChangeDescription = (e) => {
    const { name, value} = e.target
    setDescription({
      ...description,
      [name]: value
    })
  }
  console.log(description)



  //amenities

  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) => prevAmenities.filter((option) => option !== facility))
    } else {
      setAmenities((prev) => [...prev, facility])
    }
  }




  //UPLOAD, DRAG & DROP, REMOVE PHOTOS
  const [photos, setPhotos] = useState([])
  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
  }

  const handleDragPhoto = (result) => {
    if(!result.destination) return

    const items = Array.from(photos)
    const [recordedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, recordedItem)

    setPhotos(items)
  }

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, index) => index !==indexToRemove))
  }

  //Submit

  const creatorId = useSelector ((state) => state.user._id)
  const navigate = useNavigate()

  const handlePost = async (e) => {
    e.preventDefault()
    try {
      //create a new formdata object to handle file uploads
      const listingForm = new FormData()
      listingForm.append("creator", creatorId)
      listingForm.append("category", category)
      listingForm.append("type", type)
      listingForm.append("streetAddress", formLocation.streetAddress)
      listingForm.append("aptSuite", formLocation.aptSuite)
      listingForm.append("city", formLocation.city)
      listingForm.append("province", formLocation.province)
      listingForm.append("country", formLocation.country)
      listingForm.append("guestCount", guestCount)
      listingForm.append("bedroomCount", bedroomCount)
      listingForm.append("bedCount", bedCount)
      listingForm.append("bathroomCount", bathroomCount)
      listingForm.append("amenities", amenities)
      listingForm.append("title", description.title)
      listingForm.append("description", description.description)
      listingForm.append("highlight", description.highlight)
      listingForm.append("highlightDetails", description.highlightDetails)
      listingForm.append("price", description.price)

      // apend each selected photo to the formdata object
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo)
      })

      // send a post request to the server

      const response = await fetch("https://homyrentalserver2.onrender.com/properties/create", {
        method: "POST",
        body: listingForm
      })

      if (response.ok) {
        navigate("/")
      }

    } catch (err) {
      console.log("Publish Listing failed", err.message)  
    }
  }


  return (
    <>
      <Navbar />
      <div className="create-listing">
        <h1 className="">Publish Your Place</h1>
        <form action="" className="" onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${
                    category === item.label ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
            <h3>What type of place will guest have ?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>
            <h3>Where is your place located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Flat, house, etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Flat, house, etc. (if applicable)"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>District</p>
                <input
                  type="text"
                  placeholder="district"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>State</p>
                <input
                  type="text"
                  placeholder="state"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <h3>Share some basic about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      guestCount > 1 && setGuestCount(guestCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setGuestCount(guestCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedroomCount(bedroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedCount > 1 && setBedCount(bedCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedCount(bedCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBathroomCount(bathroomCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />
            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${
                    amenities.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
            <h2>Add some photo of your place</h2>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 ? (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    ) : (
                      <>
                        {photos.map((photo, index) => (
                          <Draggable
                            key={index.toString()}
                            draggableId={index.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="photo"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt="place"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemovePhoto(index)}
                                >
                                  <BiTrash />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}{" "}
                        {/* ✅ Ensure placeholder is included */}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="togather">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3>What makes your pace attractive and exciting</h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={description.title}
                onChange={handleChangeDescription}
                required
              />
              <p>Description</p>
              <input
                type="text"
                placeholder="Description"
                name="description"
                value={description.description}
                onChange={handleChangeDescription}
                required
              />
              <p>Highlight</p>
              <input
                type="text"
                placeholder="Highlight"
                name="highlight"
                value={description.highlight}
                onChange={handleChangeDescription}
                required
              />
              <p>Highlight details</p>
              <textarea
                type="text"
                placeholder="Highlight details"
                name="highlightDetails"
                value={description.highlightDetails}
                onChange={handleChangeDescription}
                required
              />
              <p>Now set your price</p>
              <span>Rs</span>
              <input
                type="number"
                placeholder="500"
                name="price"
                className="price"
                value={description.price}
                onChange={handleChangeDescription}
                required
              />
            </div>
          </div>
          <button className="submit_btn" type="submit">
            Create Your Listing
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateListing;
