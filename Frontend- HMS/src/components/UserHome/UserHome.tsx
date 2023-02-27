
import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

function UserHome() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="s002">
        <form>
          <div className="inner-form">
            <div className="input-field first-wrap">
              <div className="icon-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                </svg>
              </div>
              <input id="search" type="text" placeholder="Location" />
            </div>
            <div className="input-field first-wrap">
              <div className="icon-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 0C497.7 0 512 14.33 512 32C512 49.67 497.7 64 480 64V448C497.7 448 512 462.3 512 480C512 497.7 497.7 512 480 512H304V448H208V512H32C14.33 512 0 497.7 0 480C0 462.3 14.33 448 32 448V64C14.33 64 0 49.67 0 32C0 14.33 14.33 0 32 0H480zM112 96C103.2 96 96 103.2 96 112V144C96 152.8 103.2 160 112 160H144C152.8 160 160 152.8 160 144V112C160 103.2 152.8 96 144 96H112zM224 144C224 152.8 231.2 160 240 160H272C280.8 160 288 152.8 288 144V112C288 103.2 280.8 96 272 96H240C231.2 96 224 103.2 224 112V144zM368 96C359.2 96 352 103.2 352 112V144C352 152.8 359.2 160 368 160H400C408.8 160 416 152.8 416 144V112C416 103.2 408.8 96 400 96H368zM96 240C96 248.8 103.2 256 112 256H144C152.8 256 160 248.8 160 240V208C160 199.2 152.8 192 144 192H112C103.2 192 96 199.2 96 208V240zM240 192C231.2 192 224 199.2 224 208V240C224 248.8 231.2 256 240 256H272C280.8 256 288 248.8 288 240V208C288 199.2 280.8 192 272 192H240zM352 240C352 248.8 359.2 256 368 256H400C408.8 256 416 248.8 416 240V208C416 199.2 408.8 192 400 192H368C359.2 192 352 199.2 352 208V240zM256 288C211.2 288 173.5 318.7 162.1 360.2C159.7 373.1 170.7 384 184 384H328C341.3 384 352.3 373.1 349 360.2C338.5 318.7 300.8 288 256 288z" /></svg>
              </div>
              <input id="search" type="text" placeholder="Hotel Name" />
            </div>
            <div className="input-field fifth-wrap">
              <button className="btn-search" type="button">SEARCH</button>
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
          <div className="row">
            <div className="col-xl-4 col-md-4">
              <div className="single_offers">
                <div className="about_thumb">
                  <img src="img/offers/1.png" alt="" />
                </div>
                <h3>Up to 35% savings on Club <br />
                  rooms and Suites</h3>
                <ul>
                  <li>Luxaries condition</li>
                  <li>3 Adults & 2 Children size</li>
                  <li>Sea view side</li>
                </ul>
                <a href="#" className="book_now">book now</a>
              </div>
            </div>
            <div className="col-xl-4 col-md-4">
              <div className="single_offers">
                <div className="about_thumb">
                  <img src="img/offers/2.png" alt="" />
                </div>
                <h3>Up to 35% savings on Club <br />
                  rooms and Suites</h3>
                <ul>
                  <li>Luxaries condition</li>
                  <li>3 Adults & 2 Children size</li>
                  <li>Sea view side</li>
                </ul>
                <a href="#" className="book_now">book now</a>
              </div>
            </div>
            <div className="col-xl-4 col-md-4">
              <div className="single_offers">
                <div className="about_thumb">
                  <img src="img/offers/3.png" alt="" />
                </div>
                <h3>Up to 35% savings on Club <br />
                  rooms and Suites</h3>
                <ul>
                  <li>Luxaries condition</li>
                  <li>3 Adults & 2 Children size</li>
                  <li>Sea view side</li>
                </ul>
                <a href="#" className="book_now">book now</a>
              </div>
            </div>
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

      {/* <!-- features_room_startt --> */}
      <div className="features_room">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section_title text-center mb-100">
                <span>Featured Rooms</span>
                <h3>Choose a Better Room</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="rooms_here">
          <div className="single_rooms">
            <div className="room_thumb">
              <img src="img/rooms/1.png" alt="" />
              <div className="room_heading d-flex justify-content-between align-items-center">
                <div className="room_heading_inner">
                  <span>From $250/night</span>
                  <h3>Superior Room</h3>
                </div>
                <a href="#" className="line-button">book now</a>
              </div>
            </div>
          </div>
          <div className="single_rooms">
            <div className="room_thumb">
              <img src="img/rooms/2.png" alt="" />
              <div className="room_heading d-flex justify-content-between align-items-center">
                <div className="room_heading_inner">
                  <span>From $250/night</span>
                  <h3>Deluxe Room</h3>
                </div>
                <a href="#" className="line-button">book now</a>
              </div>
            </div>
          </div>
          <div className="single_rooms">
            <div className="room_thumb">
              <img src="img/rooms/3.png" alt="" />
              <div className="room_heading d-flex justify-content-between align-items-center">
                <div className="room_heading_inner">
                  <span>From $250/night</span>
                  <h3>Signature Room</h3>
                </div>
                <a href="#" className="line-button">book now</a>
              </div>
            </div>
          </div>
          <div className="single_rooms">
            <div className="room_thumb">
              <img src="img/rooms/4.png" alt="" />
              <div className="room_heading d-flex justify-content-between align-items-center">
                <div className="room_heading_inner">
                  <span>From $250/night</span>
                  <h3>Couple Room</h3>
                </div>
                <a href="#" className="line-button">book now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- features_room_end --> */}

      {/* <!-- forQuery_start --> */}
      <div className="forQuery">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1 col-md-12">
              <div className="Query_border">
                <div className="row align-items-center justify-content-center">
                  <div className="col-xl-6 col-md-6">
                    <div className="Query_text">
                      <p>For Reservation 0r Query?</p>
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
