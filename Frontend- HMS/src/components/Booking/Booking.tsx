import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { isValid } from 'date-fns'
import { useLocation } from 'react-router-dom';
import './Booking.css'
import UserContext from '../../context/UserContext';
import Payment from '../Payment/Payment';
import LoadingIndicator from "../LoadingIndicator/LoadIndicator";
import { getHotelId } from '../../utils/utils';

interface hotelRoom {
    roomTypeId?: number;
    roomType?: string;
    image?: string;
    availableRooms?: string;
    costPerDay?: any
}

function Booking() {
    const location = useLocation<hotelRoom>();
    const hotelId = getHotelId();
    const { roomTypeId, roomType, image, availableRooms, costPerDay } = location.state || {};
    const { user } = useContext(UserContext);
    const [room, setRoom] = useState<any>({
        name: "",
        description: "",
        location: "",
        availability: true,
        hotelRoomTypeId: 0
    });
    const [checkInDate, setCheckInDate] = useState<any>();
    const [checkOutDate, setCheckOutDate] = useState<any>();
    const [numOfRooms, setNumOfRooms] = useState<any>();
    const [comments, setComments] = useState<any>();
    const [availableCountFromResponse, setAvailableCountFromResponse] = useState();
    const [showPayment, setShowPayment] = useState(false);
    const [bookedRoomIds, setBookedRoomIds] = useState<any>();
    const [bookingId, setBookingId] = useState<any>()
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        
        async function fetchData() {
            const checkIn = checkInDate?.toISOString() ?? '';
            const checkOut = checkOutDate?.toISOString() ?? '';
            setIsLoading(true)
            try {
                const response = await axios.get(`http://localhost:8090/booking/getRoomCount?checkInDate=${checkIn}&checkOutDate=${checkOut}&roomTypeId=${roomTypeId}`);
                setAvailableCountFromResponse(response.data);
                setIsLoading(false)
            } catch (error) {
                alert("Error getting available rooms")
                setIsLoading(false)
            }
        }
        if (isValid(checkInDate) && isValid(checkOutDate)) {
            if (checkInDate?.toISOString() <= checkOutDate?.toISOString()) {
                fetchData();
            } else {
                alert("please select valid check in and check out")
            }
        }
    }, [checkInDate, checkOutDate])

    const getAvailableRoomCount = () => {
        if (checkInDate == undefined || checkOutDate == undefined) {
            return (availableRooms != undefined ? availableRooms : 0);
        } else {
            return availableCountFromResponse
        }
    }

    const bookRoom = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const request = {
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            numOfRooms: Number(numOfRooms),
            comments: comments,
            cost: Number(numOfRooms) * costPerDay,
            hotelId : hotelId
        };
        setIsLoading(true)
        try {
            const response = await axios.post(
                `http://localhost:8090/booking/create?hotelRoomTypeId=${roomTypeId}&userId=${user.id}`, request);
            setIsLoading(false)
            setBookedRoomIds(response.data.roomIds);
            setBookingId(response.data.bookingId);
            handleReservationClick();
        } catch (error: any) {
            if (error.response) {
                setIsLoading(false)
                alert("Booking cannot be done due to some internal error, please try again!")
            } else if (error.request) {
                setIsLoading(false)
                alert("No response received from server")
            } else {
                setIsLoading(false)
                alert("Internal error occures, please try again!")
            }
        }
    }

    useEffect(() => {
      return () => {
        document.body.classList.remove("modal-open");
      }
    }, [])
    

    const handleReservationClick = () => {
        setShowPayment(true);
        document.body.classList.add("modal-open");
    };

    const handleClosePayment = () => {
        setShowPayment(false);
        document.body.classList.remove("modal-open");
    };

    return (
        <>
        {isLoading && <LoadingIndicator />}
            <div className="reservation-form booking-container" style={{ paddingTop: '0' }}>
                <div style={{ position: 'relative' }}>
                    <img src={`http://localhost:8090/roomtypes/getImage/${image}`} width="100%" height="450" alt="" />
                    <div className='img-text-section'>
                        <h2 className='room-name-image'>{roomType} ROOM</h2>
                    </div>
                </div>
                <div className="container booking-section">
                    <div className="row align-it-center align-form">
                        <div className="col-lg-12 form-width">
                            <form id="reservation-form" style={{ backgroundColor: '#f8f9fa' }} name="gs" onSubmit={bookRoom}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h4><em>RESERVE YOUR ROOM</em> </h4>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="date1" className="form-label">Check In Date</label>
                                            <input type="date" name="date1" className="date" value={checkInDate ? checkInDate.toISOString().substr(0, 10) : ''} onChange={(e) => setCheckInDate(e.target.value ? new Date(e.target.value) : undefined)} required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="date2" className="form-label">Check Out Date</label>
                                            <input type="date" name="date2" className="date" value={checkOutDate ? checkOutDate.toISOString().substr(0, 10) : ''} onChange={(e) => setCheckOutDate(e.target.value ? new Date(e.target.value) : undefined)} required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="hotelRoomTypeId" className="form-label">SELECTED ROOM TYPE</label>
                                            <select name="hotelRoomTypeId" className="form-select roomType" aria-label="Default select example" id="chooseGuests" required>
                                                <option value={roomTypeId} disabled selected hidden>{roomType}</option>
                                            </select>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-6">
                                        <fieldset>
                                            <label htmlFor="numOfGuest" className="form-label">NUMBER OF ROOMS (Available : {getAvailableRoomCount()})</label>
                                            <input type="number" name="numOfGuest" className="Number" placeholder="Ex. 2" autoComplete="on" value={numOfRooms} onChange={(e) => setNumOfRooms(e.target.value)} required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <label htmlFor="description" className="form-label"> ANY COMMENTS ?</label>
                                            <input type="text" name="description" className="Name" placeholder="Ex. Relax in comfort with two luxurious king size beds" autoComplete="on" value={comments} onChange={(e) => setComments(e.target.value)} required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12" style={{ paddingTop: '1.5rem' }}>
                                        <fieldset>
                                            <button className="main-button">
                                                Make Your Reservation
                                                {Number(numOfRooms) * costPerDay > 0 ? ` (₹${Number(numOfRooms) * costPerDay})` : ''}
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {showPayment && (
                <>
                    <div className='payment-box'>
                        <div className="modal">
                            <div className="modal-content">
                                <div className="close-icon">
                                    <svg onClick={handleClosePayment}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        viewBox="0 0 24 24">
                                        <path d="M16.95 15.95l-1.414 1.414L12 13.414l-3.536 3.536-1.414-1.414L10.586 12 7.05 8.464l1.414-1.414L12 10.586l3.536-3.536 1.414 1.414L13.414 12l3.536 3.536z" />
                                    </svg>
                                </div>
                                <Payment amount={Number(numOfRooms) * costPerDay} bookingId = {bookingId} roomIds={bookedRoomIds} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Booking