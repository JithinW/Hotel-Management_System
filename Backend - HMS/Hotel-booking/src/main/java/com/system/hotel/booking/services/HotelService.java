package com.system.hotel.booking.services;

import java.util.List;

import com.system.hotel.booking.entity.Hotel;

public interface HotelService {

	Hotel createHotel(Hotel hotel);
	
	List<Hotel> getAllHotels();

	List<Hotel> getHotelsByLocationAndName(String location, String name);

	List<Hotel> getHotelsByName(String name);

	List<Hotel> getHotelsByLocation(String location);
}
