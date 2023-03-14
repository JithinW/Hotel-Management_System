import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import LoadingIndicator from "../LoadingIndicator/LoadIndicator";

function UserHome() {
  const { user,setUser } = useContext(UserContext);
  const [hotels, setHotels] = useState<any>([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<any>();
  const [name, setName] = useState<any>();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setIsLoading(true);
      let url = "http://localhost:8090/hotels/getHotels";
      if (location) {
        url += `?location=${location}`;
        if (name) {
          url += `&name=${name}`;
        }
      } else if (name) {
        url += `?name=${name}`;
      }
      const response = await axios.get(url);
      setHotels(response.data);
      setIsLoading(false);
    } catch (error) {
      alert("Error occured while fetching hotels")
    }
  }

  const handleHotelClick = () => {
    if (!user) {
      history.push("/login");
    } else {
    }
  };

  const handleViewRooms = (id: number, name: string): any => {
    if (!user) {
      history.push("/login");
    } else {
      history.push({
        pathname: "/roomTypes",
        state: { hotelId: id, hotelName: name }
      });
    }
  };

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <div className="s002">
        <form>
          <div className="inner-form">
            <div className="input-field first-wrap">
              <div className="icon-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                </svg>
              </div>
              <input id="search" type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="input-field first-wrap">
              <div className="icon-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 0C497.7 0 512 14.33 512 32C512 49.67 497.7 64 480 64V448C497.7 448 512 462.3 512 480C512 497.7 497.7 512 480 512H304V448H208V512H32C14.33 512 0 497.7 0 480C0 462.3 14.33 448 32 448V64C14.33 64 0 49.67 0 32C0 14.33 14.33 0 32 0H480zM112 96C103.2 96 96 103.2 96 112V144C96 152.8 103.2 160 112 160H144C152.8 160 160 152.8 160 144V112C160 103.2 152.8 96 144 96H112zM224 144C224 152.8 231.2 160 240 160H272C280.8 160 288 152.8 288 144V112C288 103.2 280.8 96 272 96H240C231.2 96 224 103.2 224 112V144zM368 96C359.2 96 352 103.2 352 112V144C352 152.8 359.2 160 368 160H400C408.8 160 416 152.8 416 144V112C416 103.2 408.8 96 400 96H368zM96 240C96 248.8 103.2 256 112 256H144C152.8 256 160 248.8 160 240V208C160 199.2 152.8 192 144 192H112C103.2 192 96 199.2 96 208V240zM240 192C231.2 192 224 199.2 224 208V240C224 248.8 231.2 256 240 256H272C280.8 256 288 248.8 288 240V208C288 199.2 280.8 192 272 192H240zM352 240C352 248.8 359.2 256 368 256H400C408.8 256 416 248.8 416 240V208C416 199.2 408.8 192 400 192H368C359.2 192 352 199.2 352 208V240zM256 288C211.2 288 173.5 318.7 162.1 360.2C159.7 373.1 170.7 384 184 384H328C341.3 384 352.3 373.1 349 360.2C338.5 318.7 300.8 288 256 288z" /></svg>
              </div>
              <input id="search" type="text" placeholder="Hotel Name" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input-field fifth-wrap">
              <button className="btn-search" type="button" onClick={fetchData}>SEARCH</button>
            </div>
          </div>
        </form>
      </div>

      {/* <!-- offers_area_start --> */}
      <div className="offers_area">
        <div className="container">
          <div className="row hotel-list-heading">
            <div className="col-xl-12">
              <div className="section_title text-center mb-100">
                <span>MONTANA SURFS</span>
                <h3>Our Best Hotels</h3>
              </div>
            </div>
          </div>
          <div className="row hotel-row">
            {
              hotels.length > 0 ?
                (hotels?.map((hotel: any) => (
                  <div className="col-xl-4 col-md-4 hotel-card-view" key={hotel.id} onClick={handleHotelClick}>
                    <div className="single_offers">
                      <div className="about_thumb">
                        <img src={`http://localhost:8090/hotels/getImage/${hotel.image}`} width="100" height="360" alt="" />
                      </div>
                      <div className="description-section">
                        <h3 style={{ marginBottom: '1rem', marginTop: '-0.2rem' }}>Hotel {hotel.name}</h3>
                        <div className="hotel-details">
                          <ul>
                            <li><i>Country : {hotel.country}</i></li>
                            <li><i>Location : {hotel.location}</i></li>
                            <li><i>In {hotel.address}</i></li>
                            <li><i>Rating : ★★★★☆</i></li>
                          </ul>
                        </div>
                        <div className="bookNow-section">
                          <a className="book_now" onClick={() => handleViewRooms(hotel.id, hotel.name)}>View Rooms</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                ) :
                <i className="no-hotel-text">
                  "Sorry, no hotels found for this name or location"
                </i>
            }
          </div>
        </div>
      </div>
      {/* <!-- offers_area_end --> */}

      {/* <!-- video_area_start --> */}
      <div className="video_area video_bg overlay">
        <div className="video_area_inner text-center">
          <span>Montana Sea View</span>
          <h3>Relax and Enjoy your <br />
            Vacation </h3>
          <a href="https://www.youtube.com/watch?v=vLnPwxZdW4Y" className="video_btn popup-video">
            <i className="fa fa-play"></i>
          </a>
        </div>
      </div>
      {/* <!-- video_area_end --> */}

      {/* <!-- forQuery_start --> */}
      <div className="forQuery">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1 col-md-12">
              <div className="Query_border">
                <div className="row align-items-center justify-content-center">
                  <div className="col-xl-6 col-md-6">
                    <div className="Query_text">
                      <p>For Any Support 0r Query?</p>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-6">
                    <div className="phone_num">
                      <a href="#" className="mobile_no">+10 576 377 4789</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default UserHome;
