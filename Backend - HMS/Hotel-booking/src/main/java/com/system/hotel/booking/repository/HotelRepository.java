package com.system.hotel.booking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.system.hotel.booking.entity.Hotel;
import com.system.hotel.booking.entity.User;


@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long>{
	
	List<Hotel> findByLocation(String location);
	
	List<Hotel> findByName(String name);
	
	List<Hotel> findByLocationAndName(String location, String name);
	
	Hotel findByUser(User user);
	
	Optional<Hotel> findById(Long hotelId);
}
