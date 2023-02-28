import React, { useState } from 'react';
import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';
import UserContext from './context/UserContext';
import UserHome from './components/UserHome/UserHome';
import AddHotel from './components/AddHotel/AddHotel';

function App() {
  const [user, setUser] = useState<any>(null);
  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Header/>
          <Switch>
            <Route exact path="/" render={() => <Login />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={UserHome} />
            <Route path="/addhotel" component={AddHotel} />
          </Switch>
          <Footer/>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
