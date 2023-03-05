import React, { useState } from 'react';
import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';
import UserContext from './context/UserContext';
import UserHome from './components/UserHome/UserHome';
import AddHotel from './components/AddHotel/AddHotel';
import { ScrollToTop } from './components/Scroll/ScrollToTop';
import AddRoomType from './components/AddRoomType/AddRoomType';
import { userIsHotelAdmin } from './utils/utils';
import RoomTypes from './components/RoomTypes/RoomTypes';
import AddRooms from './components/AddRooms/AddRooms';

function App() {
  const [user, setUser] = useState<any>(null);
  console.log(userIsHotelAdmin(user), "check")
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <UserContext.Provider value={{ user, setUser }}>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Login />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={UserHome} />
            <Route path="/addhotel">
              {/* {userIsHotelAdmin(user) ? <AddHotel /> : <Redirect to="/login" />} */}
              <AddHotel />
            </Route>
            <Route path="/addRoomType">
              {userIsHotelAdmin(user) ? <AddRoomType /> : <Redirect to="/login" />}
            </Route>
            <Route path="/addRooms">
              {userIsHotelAdmin(user) ? <AddRooms/> : <Redirect to="/login" />}
              {/* <AddRooms/> */}
            </Route>
            <Route path="/roomTypes" component={RoomTypes} />
          </Switch>
          <Footer />
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
