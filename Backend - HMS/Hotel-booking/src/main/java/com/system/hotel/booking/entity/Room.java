package com.system.hotel.booking.entity;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String name;
    
    @Size(max = 100)
    private String location;

    @Size(max = 250)
    private String description;

    private Boolean availability;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_room_type_id", nullable = true)
    private HotelRoomType hotelRoomType;

    @JsonIgnore
    @ManyToMany(mappedBy = "rooms",cascade = CascadeType.ALL)
    private List<Booking> bookings;
    
	public Room() {
		super();
	}

	public Room(Long id, @NotBlank @Size(max = 100) String name, @Size(max = 100) String location,
			@Size(max = 250) String description, Boolean availability, HotelRoomType hotelRoomType,
			List<Booking> bookings) {
		super();
		this.id = id;
		this.name = name;
		this.location = location;
		this.description = description;
		this.availability = availability;
		this.hotelRoomType = hotelRoomType;
		this.bookings = bookings;
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

	public HotelRoomType getHotelRoomType() {
		return hotelRoomType;
	}

	public void setHotelRoomType(HotelRoomType hotelRoomType) {
		this.hotelRoomType = hotelRoomType;
	}

	public List<Booking> getBookings() {
		return bookings;
	}

	public void setBookings(List<Booking> bookings) {
		this.bookings = bookings;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	@Override
	public String toString() {
		return "Room [id=" + id + ", name=" + name + ", location=" + location + ", description=" + description
				+ ", availability=" + availability + ", hotelRoomType=" + hotelRoomType + ", bookings=" + bookings
				+ "]";
	}

}
