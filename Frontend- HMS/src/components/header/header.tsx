import * as React from "react";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { userIsAdmin, userIsGuest, userIsHotelAdmin } from "../../utils/utils";

function Header() {
  const { user, setUser } = useContext(UserContext)
  const clearUserSession = () => {
    localStorage.clear();
    setUser('');
  }
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <header>
        <div className="header-area-main ">
          <div className="main-header-area-main sticky-show">
            <div className="container-fluid p-0">
              <div className="row align-items-center no-gutters">
                <div className="col-xl-5 col-lg-6">
                  <div className="main-menu  d-none d-lg-block">
                    <nav>
                      <ul id="navigation">
                        {!userIsHotelAdmin() ?
                          (<li>
                            <NavLink activeClassName="active" to="/home">
                              Home
                            </NavLink>
                          </li>) :
                          (userIsHotelAdmin() &&
                            <li>
                              <NavLink activeClassName="active" to="/dashboard">
                                Dashboard
                              </NavLink>
                            </li>)
                        }
                        {user ? '' :
                          <>
                            <li>
                              <NavLink activeClassName="active" to="/login">
                                Log in
                              </NavLink>
                            </li>
                            <li>
                              <NavLink activeClassName="active" to="/signup">
                                Sign up
                              </NavLink>
                            </li>
                          </>
                        }
                        {userIsGuest() ?
                          <li><NavLink activeClassName="active" to="/myBookings">
                            My Bookings
                          </NavLink>
                          </li> : ''
                        }
                        {userIsHotelAdmin() ?
                          <>
                            <li>
                              <a href="#">Room Types <i className="ti-angle-down"></i></a>
                              <ul className="submenu">
                                <li><NavLink activeClassName="active" to="/addRoomType">Add Room Types</NavLink></li>
                                <li><NavLink activeClassName="active" to="/viewRoomTypes">View Room Types</NavLink></li>
                              </ul>
                            </li>
                            <li>
                              <a href="#">Rooms <i className="ti-angle-down"></i></a>
                              <ul className="submenu">
                                <li><NavLink activeClassName="active" to="/addRoom">Add Room</NavLink></li>
                                <li><NavLink activeClassName="active" to="/viewRooms">View Room</NavLink></li>
                              </ul>
                            </li>
                            <li>
                              <NavLink activeClassName="active" to="/viewBookings">
                                Bookings
                              </NavLink>
                            </li>
                          </> : ''
                        }
                        {
                          userIsAdmin() &&
                          <>
                          <li>
                              <a href="#">Hotels <i className="ti-angle-down"></i></a>
                              <ul className="submenu">
                                <li><NavLink activeClassName="active" to="/addHotel">Add Hotel</NavLink></li>
                                <li><NavLink activeClassName="active" to="/viewHotels">View Hotel</NavLink></li>
                              </ul>
                            </li>
                            <li>
                              <NavLink activeClassName="active" to="/users">
                                Users
                              </NavLink>
                            </li>
                            <li>
                              <NavLink activeClassName="active" to="/allBookings">
                                BOOKINGS
                              </NavLink>
                            </li>
                          </>
                        }
                        <li></li><li></li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2">
                  <div className="logo-img">
                    <Link to="index.html">
                      <img src="img/logo.png" alt="" />
                    </Link>
                  </div>
                </div>
                {!user ? <div className="col-xl-5 col-lg-4 d-none d-lg-block">
                  <div className="book_room">
                    <div className="socail_links">
                      <ul>
                        <li>
                          <Link to="#">
                            <i className="fa fa-facebook-square"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fa fa-twitter"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fa fa-instagram"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="book_btn d-none d-lg-block">
                      <Link className="popup-with-form" to="#test-form">Book A Room</Link>
                    </div>
                  </div>
                </div> :
                  <div className="col-xl-5 col-lg-4 d-none d-lg-block user-name-right">
                    <div className="book_room">
                      <div className="user-name dropdown" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {user?.name}
                        <svg className="icon" style={{ height: '20px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 24 24">
                            <path d="M12,12c2.76,0,5-2.24,5-5s-2.24-5-5-5s-5,2.24-5,5S9.24,12,12,12z M12,13.5c-2.33,0-7,1.17-7,3.5v1.5h14v-1.5 C19,14.67,14.33,13.5,12,13.5z" style={{ fill: '#fff' }} />
                          </svg>
                        </svg>
                        <i className="ti-angle-down" style={{ paddingLeft: '3px' }} onClick={() => setIsOpen(!isOpen)}>
                          {user ?
                            isOpen ?
                              (<div className="dropdown-menu" style={{ minWidth: '2rem', paddingLeft: '1.5rem', whiteSpace: 'nowrap', transition: 'opacity 1s ease-in-out', opacity: '1' }}>

                                <li><NavLink className="menu-navlink" onClick={() => clearUserSession()} to="/login">
                                  Log out
                                </NavLink>
                                </li>
                              </div>) : '' : ''}
                        </i>
                      </div>
                    </div>

                  </div>}
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;