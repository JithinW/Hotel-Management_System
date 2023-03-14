package com.system.hotel.booking.services;

import java.util.Date;
import java.util.List;

import com.system.hotel.booking.common.BookingAndUserNameVO;
import com.system.hotel.booking.common.BookingIdAndRoomIds;
import com.system.hotel.booking.entity.Booking;

public interface BookingService {
	
	Long getAvailableRoomsByRoomTypeIdAndCheckInAndCheckOutDates(Long roomTypeId, Date checkInDate,
			Date checkOutDate);
	
	BookingIdAndRoomIds createBooking(Booking booking, Long hotelRoomTypeId, Long userId);
	
	List<BookingAndUserNameVO> getBookingsByPage(int pageNumber, Long hotelId);
	
	void deleteBookingById(Long bookingId);
	
	List<BookingAndUserNameVO> getMyBookingsByPage(int pageNumber, Long userId);
	
	List<BookingAndUserNameVO> getAllBookingsByPage(int pageNumber);

}
