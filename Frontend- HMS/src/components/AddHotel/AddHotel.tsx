import { useState } from "react";
import axios from "axios";
import './AddHotel.scss'

const AddHotel: React.FC = () => {
  const [hotel, setHotel] = useState<any>({
    name: "",
    email: "",
    phone: "",
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
    <div className="add-hotel">
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        value={hotel.name}
        onChange={handleChange}
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        value={hotel.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        name="phone"
        value={hotel.phone}
        onChange={handleChange}
        required
      />
      <label htmlFor="location">Location:</label>
      <input
        type="text"
        name="location"
        value={hotel.location}
        onChange={handleChange}
        required
      />
      <label htmlFor="address">Address:</label>
      <textarea
        name="address"
        value={hotel.address}
        onChange={handleChange}
        required
      ></textarea>
      <label htmlFor="image">Image:</label>
      <input type="file" name="image" onChange={handleImageChange} />
      <button className="submit-btn" type="submit">Create Hotel</button>
    </form>
    </div>
  );
};

export default AddHotel;
