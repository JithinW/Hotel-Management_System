import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const userFromStorage = () => {
  const user = localStorage.getItem('user');
  if (user) {
    if(JSON.parse(user).user){
      return JSON.parse(user).user
    }
    return JSON.parse(user);
  }
}

export const userIsHotelAdmin = () => userFromStorage()?.role === "HOTEL_ADMIN";
export const userIsGuest = () => userFromStorage()?.role === "USER";
export const userIsAdmin = () => userFromStorage()?.role === "ADMIN";

export function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

export const getHotelId = () => {
  const id = localStorage.getItem('hotelId');
  if (id) {
    return JSON.parse(id);
  }
}