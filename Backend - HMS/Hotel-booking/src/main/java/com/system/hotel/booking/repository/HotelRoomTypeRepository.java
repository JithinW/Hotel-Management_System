package com.system.hotel.booking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.system.hotel.booking.entity.HotelRoomType;

@Repository
public interface HotelRoomTypeRepository extends JpaRepository<HotelRoomType, Long> {
	List<HotelRoomType> findByHotelId(Long hotelId);
}
