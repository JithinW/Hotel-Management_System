import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import LoadingIndicator from "../LoadingIndicator/LoadIndicator";

const AddRoomType = () => {
    const { user } = useContext(UserContext);
    const [roomType, setRoomType] = useState({
        name: "",
        description: "",
        cost: "",
        numOfGuest: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setRoomType({ ...roomType, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', roomType.name);
        formData.append('description', roomType.description);
        formData.append('cost', roomType.cost);
        formData.append('numOfGuest', roomType.numOfGuest);
        if (imageFile) {
            formData.append("img", imageFile);
        }

        setIsLoading(true)
        axios
            .post(`http://localhost:8090/roomtypes/hotel/${user.id}/create`, formData)
            .then((response) => {
                setIsLoading(false)
                alert('Room type added successfully!');
            })
            .catch((error) => {
                setIsLoading(false)
                alert('Failed to add room type. Please try again.');
            });
    };

    return (
        <>
        {isLoading && <LoadingIndicator />}
        <div className="reservation-form background-image">
            <div className="container">
                <div className="row align-it-center align-form">
                    <div className="col-lg-12 form-width">
                        <form id="reservation-form" style={{backgroundColor: '#f9f9ff'}} name="gs" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <h4>  <em>ADD ROOM TYPE</em> </h4>
                                </div>
                                <div className="col-lg-6">
                                    <fieldset>
                                        <label htmlFor="name" className="form-label">ROOM TYPE</label>
                                        <input type="text" name="name" className="Name" placeholder="Ex. Sheraton" autoComplete="on" value={roomType.name} onChange={handleChange} required />
                                    </fieldset>
                                </div>
                                <div className="col-lg-6">
                                    <fieldset>
                                        <label htmlFor="description" className="form-label">DESCRIPTION</label>
                                        <input type="text" name="description" className="Name" placeholder="Ex. Spacious room with a king-size bed" autoComplete="on" value={roomType.description} onChange={handleChange} required />
                                    </fieldset>
                                </div>
                                <div className="col-lg-6">
                                    <fieldset>
                                        <label htmlFor="cost" className="form-label">PRICE</label>
                                        <input type="number" name="cost" className="Number" placeholder="Ex. 150" autoComplete="on" value={roomType.cost} onChange={handleChange} required />
                                    </fieldset>
                                </div>
                                <div className="col-lg-6">
                                    <fieldset>
                                        <label htmlFor="numOfGuest" className="form-label">MAXIMUM GUESTS</label>
                                        <input type="number" name="numOfGuest" className="Number" placeholder="Ex. 2" autoComplete="on" value={roomType.numOfGuest} onChange={handleChange} required />
                                    </fieldset>
                                </div>
                                <div className="col-lg-12">
                                    <fieldset>
                                        <label htmlFor="image" className="form-label">CHOOSE ROOM IMAGE</label>
                                        <input type="file" id="file" name="img" className="Name" placeholder="Select Image" onChange={handleImageChange} required />
                                    </fieldset>
                                </div>
                                <div className="col-lg-12" style={{ paddingTop: '2rem' }}>
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
        </>
    );
};

export default AddRoomType;
