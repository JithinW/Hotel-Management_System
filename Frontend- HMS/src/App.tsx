import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import { BrowserRouter as Router, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';
import UserContext from './context/UserContext';
import UserHome from './components/UserHome/UserHome';
import AddHotel from './components/AddHotel/AddHotel';
import AddRoomType from './components/AddRoomType/AddroomType';
import RoomTypes from './components/RoomTypes/RoomTypes';
import { ScrollToTop, userIsAdmin, userIsGuest, userIsHotelAdmin } from './utils/utils';
import AddRoom from './components/AddRoom/AddRoom';
import HotelDashboard from './components/HotelDashboard/HotelDashboard';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Booking from './components/Booking/Booking';
import ViewBookings from './components/ViewBookings/ViewBookings';
import ViewRooms from './components/ViewRooms/ViewRooms';
import MyBookings from './components/Mybookings/MyBookings';
import ViewRoomTypes from './components/ViewRoomTypes/ViewRoomTypes';
import ViewHotels from './components/ViewHotels/ViewHotels';
import ViewAllBookings from './components/ViewAllBookings/ViewAllbookings';
import Success from './components/Alerts/Success';
import ViewUsers from './components/ViewUsers/ViewUsers';

function App() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      if (JSON.parse(userFromStorage).user) {
        setUser(JSON.parse(userFromStorage).user);
      } else {
        setUser(JSON.parse(userFromStorage));
      }
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Header />
          <ScrollToTop />
          <Switch>
            <Route exact path="/" render={() => <Login />} >
            </Route>
            <Route path="/login" render={() => <Login />} >
            </Route>
            <Route path="/signup" component={Signup} >
            </Route>
            <Route path="/home" component={UserHome} >
            </Route>
            <Route path="/roomTypes" component={RoomTypes} >
            </Route>
            <Route path="/dashboard" component={HotelDashboard} >
            {userIsHotelAdmin() ? <HotelDashboard /> : <Redirect to="/pageNotFound" />}
            </Route>
            <Route path="/addhotel">
              {userIsAdmin() ? <AddHotel /> : <Redirect to="/pageNotFound" />}
            </Route>
            <Route path="/addRoomType">
              {userIsHotelAdmin() ? <AddRoomType /> : <Redirect to="/pageNotFound" />}
            </Route>
            <Route path="/addRoom">
              {userIsHotelAdmin() ? <AddRoom /> : <Redirect to="/pageNotFound" />}
            </Route>
            <Route path="/BookRoom">
              {userIsGuest() ? <Booking /> : <Redirect to="/login" />}
            </Route>
            <Route path="/viewBookings" >
            {userIsHotelAdmin() ? <ViewBookings /> : <Redirect to="/pageNotFound" />}
            </Route>
            <Route path="/viewRooms" >
            {userIsHotelAdmin() ? <ViewRooms /> : <Redirect to="/pageNotFound" />}
            </Route>
            <Route path="/myBookings" >
            {userIsGuest() ? <MyBookings /> : <Redirect to="/pageNotFound" />}
            </Route>
            <Route path="/viewRoomTypes" >
            {userIsHotelAdmin() ? <ViewRoomTypes /> : <Redirect to="/pageNotFound" />}
            </Route>
            <Route path="/viewHotels" >
            {userIsHotelAdmin() ? <ViewHotels /> : <Redirect to="/pageNotFound" />}
            </Route>
            <Route path="/allbookings" >
            {userIsAdmin() ? <ViewAllBookings /> : <Redirect to="pageNotFound" />}
            </Route>
            <Route path="/users" >
            {userIsAdmin() ? <ViewUsers /> : <Redirect to="/pageNotFound" />}
            </Route>
            <Route path="/pageNotFound" component={PageNotFound} />
            <Route path="*" component={PageNotFound} />
          </Switch>
          <Footer />
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
