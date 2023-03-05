package com.system.hotel.booking.services;

import java.util.List;
import java.util.Optional;

import com.system.hotel.booking.entity.Hotel;
import com.system.hotel.booking.entity.User;

public interface HotelService {

	Hotel createHotel(Hotel hotel);
	
	User createHotelUser(Hotel hotel);
	
	List<Hotel> getAllHotels();
	
	Hotel getHotelByUserId(Long userId);
	
	Hotel getHotelById(Long hotelId);

	List<Hotel> getHotelsByLocationAndName(String location, String name);

	List<Hotel> getHotelsByName(String name);

	List<Hotel> getHotelsByLocation(String location);
}
