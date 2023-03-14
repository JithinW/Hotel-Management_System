package com.system.hotel.booking.common;

import java.util.List;

public class BookingIdAndRoomIds {
	
	private Long bookingId;
	
	private List<Long> roomIds;
	
	public BookingIdAndRoomIds() {
	}

	public BookingIdAndRoomIds(Long bookingId, List<Long> roomIds) {
		super();
		this.bookingId = bookingId;
		this.roomIds = roomIds;
	}

	public Long getBookingId() {
		return bookingId;
	}

	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}

	public List<Long> getRoomIds() {
		return roomIds;
	}

	public void setRoomIds(List<Long> roomIds) {
		this.roomIds = roomIds;
	}
	
	

}
