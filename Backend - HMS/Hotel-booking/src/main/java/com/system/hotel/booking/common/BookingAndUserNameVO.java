package com.system.hotel.booking.common;

import java.util.Date;

public class BookingAndUserNameVO {
	
	private Long id;
	
	private String name;
	
    private Date checkInDate;
 
    private Date checkOutDate;
    
    private Long numOfRooms;
 
    private double cost;

	public BookingAndUserNameVO() {
		super();
	}

	public BookingAndUserNameVO(Long id, String name, Date checkInDate, Date checkOutDate, Long numOfRooms,
			double cost) {
		super();
		this.id = id;
		this.name = name;
		this.checkInDate = checkInDate;
		this.checkOutDate = checkOutDate;
		this.numOfRooms = numOfRooms;
		this.cost = cost;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCheckInDate() {
		return checkInDate;
	}

	public void setCheckInDate(Date checkInDate) {
		this.checkInDate = checkInDate;
	}

	public Date getCheckOutDate() {
		return checkOutDate;
	}

	public void setCheckOutDate(Date checkOutDate) {
		this.checkOutDate = checkOutDate;
	}

	public Long getNumOfRooms() {
		return numOfRooms;
	}

	public void setNumOfRooms(Long numOfRooms) {
		this.numOfRooms = numOfRooms;
	}

	public double getCost() {
		return cost;
	}

	public void setCost(double cost) {
		this.cost = cost;
	}
    
}
