package com.system.hotel.booking.common;

public class RoomAndBookingCountsVO {
	
	private int TotalRooms;
	
	private int AvailableRooms;
	
	private int BookingCounts;

	public RoomAndBookingCountsVO() {
	}

	public RoomAndBookingCountsVO(int totalRooms, int availableRooms, int bookingCounts) {
		super();
		TotalRooms = totalRooms;
		AvailableRooms = availableRooms;
		BookingCounts = bookingCounts;
	}

	public int getTotalRooms() {
		return TotalRooms;
	}

	public void setTotalRooms(int totalRooms) {
		TotalRooms = totalRooms;
	}

	public int getAvailableRooms() {
		return AvailableRooms;
	}

	public void setAvailableRooms(int availableRooms) {
		AvailableRooms = availableRooms;
	}

	public int getBookingCounts() {
		return BookingCounts;
	}

	public void setBookingCounts(int bookingCounts) {
		BookingCounts = bookingCounts;
	}
	
	

}
