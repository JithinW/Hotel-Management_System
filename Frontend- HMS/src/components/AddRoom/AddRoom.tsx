import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getHotelId } from '../../utils/utils';
import LoadingIndicator from "../LoadingIndicator/LoadIndicator";

function AddRoom() {
    const [room, setRoom] = useState<any>({
        name: "",
        description: "",
        location: "",
        availability: true,
        hotelRoomTypeId: 0
    });
    const [roomTypes, setRoomTypes] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "availability") {
            setRoom({ ...room, [name]: value === "Yes" });
        } else {
            setRoom({ ...room, [name]: value });
        }
    };

    useEffect(() => {
        setIsLoading(true)
        const fetchRoomTypes = async () => {
            try {
                const response = await axios.get(`http://localhost:8090/roomtypes/getRoomTypes/${getHotelId()}`);
                setRoomTypes(response.data)
                setIsLoading(false)
            } catch (err) {
                setIsLoading(false)
                alert("Error while fetching room types");
            }
        }
        fetchRoomTypes()
    }, [])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const roomDetails = {
            name: room.name,
            location: room.location,
            description: room.description,
            availability: room.availability,
        };
        setIsLoading(true)
        try {
            await axios.post(`http://localhost:8090/room/create?hotelRoomTypeId=${room.hotelRoomTypeId}`, roomDetails);
            setIsLoading(false)
            alert("Room created successfully.");
        } catch (err) {
            setIsLoading(false)
            alert("Error creating room.");
        }
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
                                    <h4>  <em>ADD NEW ROOM</em> </h4>
                                </div>
                                <div className="col-lg-6">
                                    <fieldset>
                                        <label htmlFor="hotelRoomTypeId" className="form-label">ROOM TYPE</label>
                                        <select name="hotelRoomTypeId" className="form-select" aria-label="Default select example" id="chooseGuests" onChange={handleChange} required>
                                            <option value="" disabled selected hidden>Please select room type</option>
                                            {roomTypes ? Object.keys(roomTypes).map((id) => (
                                                <option key={id} value={id}>{roomTypes[id]}</option>
                                            )) : ''}
                                        </select>
                                    </fieldset>
                                </div>

                                <div className="col-lg-6">
                                    <fieldset>
                                        <label htmlFor="name" className="form-label">ROOM NUMBER</label>
                                        <input type="text" name="name" className="Name" placeholder="Ex. 24-D" autoComplete="on" value={room.name} onChange={handleChange} required />
                                    </fieldset>
                                </div>
                                <div className="col-lg-6">
                                    <fieldset>
                                        <label htmlFor="location" className="form-label">LOCATION</label>
                                        <input type="text" name="location" className="Name" placeholder="Ex. 5th Floor" autoComplete="on" value={room.location} onChange={handleChange} required />
                                    </fieldset>
                                </div>
                                <div className="col-lg-6">
                                    <fieldset>
                                        <label htmlFor="availability" className="form-label">AVAILABILITY</label>
                                        <select name="availability" className="form-select" aria-label="Default select example" id="chooseGuests" onChange={handleChange} defaultValue="Yes" required>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </fieldset>
                                </div>
                                <div className="col-lg-12">
                                    <fieldset>
                                        <label htmlFor="description" className="form-label">DESCRIPTION</label>
                                        <input type="text" name="description" className="Name" placeholder="Ex. Relax in comfort with two luxurious king size beds" autoComplete="on" value={room.address} onChange={handleChange} required />
                                    </fieldset>
                                </div>
                                <div className="col-lg-12" style={{ paddingTop: '1.5rem' }}>
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
    )
}

export default AddRoom