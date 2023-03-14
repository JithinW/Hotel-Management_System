package com.system.hotel.booking.entity;	

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@Table(name = "booking")
public class Booking {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @Column(name = "check_in_date")
    private Date checkInDate;
 
    @Column(name = "check_out_date")
    private Date checkOutDate;
 
    @Column(name = "payment_status")
    private boolean paymentStatus;
 
    @Column(name = "cost")
    private double cost;
    
    private String comments;
    
    private Long numOfRooms;
    
    private Long hotelId;
 
    @JsonIgnore
    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    private Payment payment;
    
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "booking_room",
        joinColumns = @JoinColumn(name = "booking_id"),
        inverseJoinColumns = @JoinColumn(name = "room_id"))
    private List<Room> rooms;
    
	public Booking() {
		super();
	}

	
	public Booking(Long id, Date checkInDate, Date checkOutDate, boolean paymentStatus, double cost, String comments,
			Long numOfRooms, Long hotelId, Payment payment, User user, List<Room> rooms) {
		super();
		this.id = id;
		this.checkInDate = checkInDate;
		this.checkOutDate = checkOutDate;
		this.paymentStatus = paymentStatus;
		this.cost = cost;
		this.comments = comments;
		this.numOfRooms = numOfRooms;
		this.hotelId = hotelId;
		this.payment = payment;
		this.user = user;
		this.rooms = rooms;
	}

	public Long getHotelId() {
		return hotelId;
	}

	public void setHotelId(Long hotelId) {
		this.hotelId = hotelId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@JsonInclude
	public List<Room> getRooms() {
		return rooms;
	}

	public void setRooms(List<Room> rooms) {
		this.rooms = rooms;
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

	public boolean isPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(boolean paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public double getCost() {
		return cost;
	}

	public void setCost(double cost) {
		this.cost = cost;
	}

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Long getNumOfRooms() {
		return numOfRooms;
	}

	public void setNumOfRooms(Long numOfRooms) {
		this.numOfRooms = numOfRooms;
	}

	@Override
	public String toString() {
		return "Booking [id=" + id + ", rooms=" + rooms + ", user=" + user + ", checkInDate=" + checkInDate
				+ ", checkOutDate=" + checkOutDate + ", paymentStatus=" + paymentStatus + ", cost=" + cost
				+ ", payment=" + payment + ", comments=" + comments + ", numOfRooms=" + numOfRooms + "]";
	}

}
