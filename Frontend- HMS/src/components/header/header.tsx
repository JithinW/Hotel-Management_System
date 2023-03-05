import * as React from "react";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { userIsGuest, userIsHotelAdmin } from "../../utils/utils";

function Header() {
  const { user, setUser } = useContext(UserContext)
  console.log("user", user)
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
                        {user ?
                          <li>
                            <NavLink activeClassName="active" to="/home">
                              Home
                            </NavLink>
                          </li> : ''
                        }
                        {user ? '' :
                          <li>
                            <NavLink activeClassName="active" to="/login">
                              Login
                            </NavLink>
                          </li>}
                        {user ? '' :
                          <li>
                            <NavLink activeClassName="active" to="/signup">
                              Sign up
                            </NavLink>
                          </li>
                        }
                        {userIsGuest(user) ?
                          <li><NavLink activeClassName="active" to="Gallery.html">
                            My Bookings
                          </NavLink>
                          </li> : ''
                        }
                        {/* <li><NavLink activeClassName="active" to="Contact.html">
                          Contact us
                        </NavLink>
                        </li> */}
                        {userIsHotelAdmin(user) ?
                          <li><NavLink activeClassName="active" to="/addRoomType">
                            Add Room Type
                          </NavLink>
                          </li> : ''
                        }
                        {userIsHotelAdmin(user) ?
                          <li>
                            <NavLink activeClassName="active" to="/addRooms">
                              Add Room
                            </NavLink>
                          </li> : ''
                        }
                        {user ?
                          <li><NavLink activeClassName="active" onClick={() => setUser('')} to="/login">
                            Log out
                          </NavLink>
                          </li> : ''
                        }
                        <li></li><li></li><li></li> <li></li>
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
                      <div className="user-name" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {user?.name}
                        <svg className="icon" style={{ height: '20px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 24 24">
                            <path d="M12,12c2.76,0,5-2.24,5-5s-2.24-5-5-5s-5,2.24-5,5S9.24,12,12,12z M12,13.5c-2.33,0-7,1.17-7,3.5v1.5h14v-1.5 C19,14.67,14.33,13.5,12,13.5z" style={{ fill: '#fff' }} />
                          </svg>
                        </svg>
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