import { useState } from "react";
import axios from "axios";
import './AddHotel.css'

const AddHotel: React.FC = () => {
  const [hotel, setHotel] = useState<any>({
    name: "",
    email: "",
    phone: "",
    country: "",
    location: "",
    address: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", hotel.name);
    formData.append("email", hotel.email);
    formData.append("phone", hotel.phone);
    formData.append("country", hotel.country);
    formData.append("location", hotel.location);
    formData.append("address", hotel.address);
    if (imageFile) {
      formData.append("img", imageFile);
    }
    try {
      await axios.post("http://localhost:8090/hotels/createHotel", formData);
      alert("Hotel created successfully.");
    } catch (err) {
      console.error(err);
      alert("Error creating hotel.");
    }
  };

  return (
    <div className="reservation-form background-image">
      <div className="container">
        <div className="row align-it-center align-form">
          <div className="col-lg-12 form-width">
            <form id="reservation-form" name="gs" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-12">
                  <h4>  <em>ADD NEW HOTEL</em> </h4>
                </div>
                <div className="col-lg-6">
                  <fieldset>
                    <label htmlFor="name" className="form-label">HOTEL NAME</label>
                    <input type="text" name="name" className="Name" placeholder="Ex. Sheraton" autoComplete="on" value={hotel.name} onChange={handleChange} required />
                  </fieldset>
                </div>
                <div className="col-lg-6">
                  <fieldset>
                    <label htmlFor="email" className="form-label">EMAIL</label>
                    <input type="email" name="email" className="Name" placeholder="Ex. Sheraton@gmail.com" autoComplete="on" value={hotel.email} onChange={handleChange} required />
                  </fieldset>
                </div>
                <div className="col-lg-6">
                  <fieldset>
                    <label htmlFor="phone" className="form-label">PHONE NUMBER</label>
                    <input type="text" name="phone" className="Number" placeholder="Ex. +xxx xxx xxx" autoComplete="on" value={hotel.phone} onChange={handleChange} required />
                  </fieldset>
                </div>
                <div className="col-lg-6">
                  <fieldset>
                    <label htmlFor="country" className="form-label">COUNTRY</label>
                    <input type="text" name="country" className="Name" placeholder="Ex. Bangkok" autoComplete="on" value={hotel.country} onChange={handleChange} required />
                  </fieldset>
                </div>
                <div className="col-lg-6">
                  <fieldset>
                    <label htmlFor="location" className="form-label">LOCATION</label>
                    <input type="text" name="location" className="Name" placeholder="Ex. Bangkok" autoComplete="on" value={hotel.location} onChange={handleChange} required />
                  </fieldset>
                </div>
                <div className="col-lg-6">
                  <fieldset>
                    <label htmlFor="address" className="form-label">ADDRESS</label>
                    <input type="text" name="address" className="Name" placeholder="Ex. Bangkok" autoComplete="on" value={hotel.address} onChange={handleChange} required />
                  </fieldset>
                </div>
                <div className="col-lg-12">
                  <fieldset>
                    <label htmlFor="image" className="form-label">CHOOSE HOTEL IMAGE</label>
                    <input type="file" id="file" name="img" className="Name" placeholder="Select Image" onChange={handleImageChange} required />
                  </fieldset>
                </div>
                <div className="col-lg-12">
                  <fieldset>
                    <button className="main-button">SUBMIT</button>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHotel;
