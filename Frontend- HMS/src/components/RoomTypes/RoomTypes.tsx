import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface Hotel {
    hotelId?: number;
    hotelName?: string;
}

function RoomTypes() {
    const location = useLocation<Hotel>();
    const { hotelId, hotelName } = location.state;
    const [roomTypes, setRoomType] = useState<any>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8090/roomtypes/hotel/${hotelId}`);
                setRoomType(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    console.log("type",roomTypes)

    return (
        <div className="amazing-deals">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <div className="section-heading text-center" style={{ paddingTop: '2rem'}}>
                            <h2 style={{ textTransform: 'uppercase' }}>HOTEL {hotelName}</h2>
                            <p style={{ letterSpacing: '1px' }}>Choose the Best Rooms at Best Offers</p>
                        </div>
                    </div>

                    {
                        roomTypes.length > 0 ?
                            roomTypes.map((type: any) =>
                                <div className='card-container' key={type.id}>
                                    <div className="col-lg-6 col-sm-6 card-align">
                                        <div className="item">
                                            <div className="row">   
                                                <div className="col-lg-6 image-container">
                                                    <div className="image" >
                                                        <img src={`http://localhost:8090/roomtypes/getImage/${type.image}`} width="465" height="310" alt="" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 align-self-center box-2">
                                                    <div className="content">
                                                        <h4>{type.name}</h4>
                                                        <span className="info">{type.availableRooms === 0 ? "SORRY NO ROOMS AVAILABLE" : `${type.availableRooms} ROOMS AVAILABLE`}</span>
                                                        <div className="row" style={{ marginBottom: '-0.5rem' }}>
                                                            <div className="col-6">
                                                                <i className="fa fa-clock"></i>
                                                                <span className="list">MAXIMUM GUESTS : {type.numOfGuest}</span>
                                                            </div>
                                                            <div className="col-6">
                                                                <i className="fa fa-map"></i>
                                                                <span className="list">PRICE PER DAY : {type.cost}</span>
                                                            </div>
                                                        </div>
                                                        <p>{type.description}</p>
                                                        <div className="main-button">
                                                            <a href="reservation.html">BOOK NOW</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) :
                            <div className='no-room-container'>
                                <div className='no-room-text'>SORRY NO ROOMS TO SHOW</div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default RoomTypes