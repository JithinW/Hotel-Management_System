
export const userIsHotelAdmin = (user) => user && user.role === "HOTEL_ADMIN";
export const userIsGuest = (user) => user && user.role === "USER";
