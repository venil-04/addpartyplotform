// AddPartyPlotForm.js

import React, { useState } from "react";
import "./AddPartyPlotForm.css";
import axios from 'axios';

const AddPartyPlotForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pincode: "",
    area: "",
    size: "",
    capacity: "",
    amenities:"",
    price: "",
    description: "",
    contact: "",
    photos: [], // Array to store base64 URLs of uploaded images
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener("load", (event) => {
            resolve(event.target.result);
          });
          reader.readAsDataURL(file);
        });
      })
    ).then((photos) => {
      setFormData({ ...formData, photos });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    console.log(formData);
    try {
        const response = await axios.post('http://localhost:5000/api/v1/pp/create', formData);
        console.log('Response:', response.data);
        // Clear form data after successful submission
        setFormData({
          name: '',
          address: '',
          pincode: '',
          area: '',
          size: '',
          capacity: '',
          amenities: '',
          price: '',
          description: '',
          contact: '',
          images: [],
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
  };

  return (
    <div className="add-party-plot-form-container">
      <h2>Add Party Plot</h2>
      <form onSubmit={handleSubmit} className="add-party-plot-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Area:</label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Size:</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Capacity:</label>
          <input
            type="text"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Amenities:</label>
          <input
          type="text"
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
          placeholder="Enter values separated by comma"
        />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Images:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPartyPlotForm;
