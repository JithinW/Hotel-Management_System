import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext';
import { getHotelId } from '../../utils/utils';
import LoadingIndicator from "../LoadingIndicator/LoadIndicator";

function HotelDashboard() {
    const { user } = useContext(UserContext);
    const hotelId = getHotelId();
    const [isLoading, setIsLoading] = useState(false);
    const [bookings, setBookings] = useState<any>()
    const [dashboard,setDashboard] = useState<any>();

    useEffect(() => {
        fetchDashBoardData();
        fetchData();
    }, [])

    async function fetchData() {
        setIsLoading(true)
        try {
            const page = 1
            const response = await axios.get(`http://localhost:8090/booking/getBookings/${page}?hotelId=${hotelId}`);
            setBookings(response.data);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            alert("Some error occured while fetch bookings")
        }
    }

    async function fetchDashBoardData() {
        setIsLoading(true)
        try {
            const page = 1
            const response = await axios.get(`http://localhost:8090/hotels/getRoomCounts/${hotelId}`);
            setDashboard(response.data);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            alert("Some internal error occured")
        }
    }

    return (
        <div    >
            {isLoading && <LoadingIndicator />}
            <div >
                <div style={{ paddingTop: '5rem' }}>
                    <div className="sales-report-area mt-5 mb-5">
                        <div className="row" style={{ padding: '1rem' }}>
                            <div className="col-md-4">
                                <div className="single-report mb-xs-30">
                                    <div className="s-report-inner pr--20 pt--30 mb-3">
                                        <div className="icon">1</div>
                                        <div className="s-report-title d-flex justify-content-between">
                                            <h4 className="header-title mb-0">Total Rooms</h4>
                                            <p className='card-item-in'></p>
                                        </div>
                                        <div className="d-flex justify-content-between pb-2">
                                            <h1>{dashboard?.totalRooms}</h1>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="single-report mb-xs-30">
                                    <div className="s-report-inner pr--20 pt--30 mb-3">
                                        <div className="icon">2</div>
                                        <div className="s-report-title d-flex justify-content-between">
                                            <h4 className="header-title mb-0">Available Rooms</h4>
                                            <p className='card-item-in'></p>
                                        </div>
                                        <div className="d-flex justify-content-between pb-2">
                                            <h1>{dashboard?.availableRooms}</h1>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="single-report">
                                    <div className="s-report-inner pr--20 pt--30 mb-3">
                                        <div className="icon">3</div>
                                        <div className="s-report-title d-flex justify-content-between">
                                            <h4 className="header-title mb-0">Bookings</h4>
                                            <p className='card-item-in'></p>
                                        </div>
                                        <div className="d-flex justify-content-between pb-2">
                                            <h1>{dashboard?.bookingCounts}</h1>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-12 mt-5">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="header-title">RECENT BOOKINGS</h4>
                            {
                                bookings?.length > 0 ?
                                    <div className="data-tables datatable-dark">


                                        <table id="dataTable3" className="text-center">
                                            <thead className="text-capitalize">
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Check In Date</th>
                                                    <th>Check Out Date</th>
                                                    <th>No. of Rooms</th>
                                                    <th>Amount Paid</th>
                                                    {/* <th>salary</th> */}
                                                </tr>
                                            </thead>
                                            {
                                                bookings.map((booking: any) =>
                                                    <tbody>
                                                        <tr>
                                                            <td>{booking.name}</td>
                                                            <td>{moment(booking.checkInDate).format("D MMMM YYYY")}</td>
                                                            <td>{moment(booking.checkOutDate).format("D MMMM YYYY")}</td>
                                                            <td>{booking.numOfRooms}</td>
                                                            <td>{booking.cost}</td>
                                                        </tr>
                                                    </tbody>)

                                            }
                                        </table>
                                    </div>
                                    :
                                    <div className='no-data-text-view'>
                                        <i className='no-bookings-text'>
                                            "Sorry no bookings are available"
                                        </i>
                                    </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelDashboard