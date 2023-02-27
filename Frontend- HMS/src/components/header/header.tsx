import * as React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (  
    <>
      <header>
        <div className="header-area ">
          <div className="main-header-area sticky-show">
            <div className="container-fluid p-0">
              <div className="row align-items-center no-gutters">
                <div className="col-xl-5 col-lg-6">
                  <div className="main-menu  d-none d-lg-block">
                    <nav>
                      <ul id="navigation">
                        <li>
                          {/* <NavLink activeClassName="active" to="/home">
                          Home
                        </NavLink> */}
                        </li>
                        <li>
                          <NavLink activeClassName="active" to="/login">
                          Login
                        </NavLink>
                        </li>
                        <li>
                        <NavLink activeClassName="active" to="/signup">
                          Sign up
                        </NavLink>
                        </li>
                        <li><NavLink activeClassName="active" to="contact.html">
                          Contact US
                        </NavLink>
                        </li>
                        <li></li><li></li><li></li> <li></li>
                        <li></li>
                        <li></li>
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
                <div className="col-xl-5 col-lg-4 d-none d-lg-block">
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
                </div>
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