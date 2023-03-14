package com.system.hotel.booking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.system.hotel.booking.entity.Booking;
import com.system.hotel.booking.entity.HotelRoomType;

@Repository
public interface HotelRoomTypeRepository extends JpaRepository<HotelRoomType, Long> {
	
	List<HotelRoomType> findByHotelId(Long hotelId);
	
	Optional<HotelRoomType> findById(Long hotelRoomTypeId);
	
	@Query("SELECT r FROM HotelRoomType r WHERE r.hotel.id = :hotelId ORDER BY r.id DESC")
	List<HotelRoomType> findHotelRoomTypesByHotelId(Pageable pageable, Long hotelId);
}
