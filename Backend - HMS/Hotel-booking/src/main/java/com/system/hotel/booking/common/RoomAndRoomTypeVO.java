package com.system.hotel.booking.common;

public class RoomAndRoomTypeVO {

    private Long id;

    private String name;
    
    private String location;

    private String description;

    private Boolean availability;

    private String hotelRoomType;

	public RoomAndRoomTypeVO() {
		super();
	}

	public RoomAndRoomTypeVO(Long id, String name, String location, String description, Boolean availability,
			String hotelRoomType) {
		super();
		this.id = id;
		this.name = name;
		this.location = location;
		this.description = description;
		this.availability = availability;
		this.hotelRoomType = hotelRoomType;
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

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getAvailability() {
		return availability;
	}

	public void setAvailability(Boolean availability) {
		this.availability = availability;
	}

	public String getHotelRoomType() {
		return hotelRoomType;
	}

	public void setHotelRoomType(String hotelRoomType) {
		this.hotelRoomType = hotelRoomType;
	}
    
}
