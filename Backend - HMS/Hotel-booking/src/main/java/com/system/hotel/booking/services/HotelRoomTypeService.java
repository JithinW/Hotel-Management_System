package com.system.hotel.booking.services;

import java.util.List;

import com.system.hotel.booking.entity.HotelRoomType;

public interface HotelRoomTypeService {
	
	HotelRoomType createHotelRoomType(HotelRoomType hotel);
	
    List<HotelRoomType> getHotelRoomTypesByHotelId(Long hotelId);

}
