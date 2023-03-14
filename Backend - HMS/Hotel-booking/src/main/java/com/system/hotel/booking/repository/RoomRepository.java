package com.system.hotel.booking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.system.hotel.booking.entity.Booking;
import com.system.hotel.booking.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
	
	Optional<Room> findByName(String name);
	
	List<Room> findByHotelRoomTypeId(Long roomId);
	
	List<Room> findByHotelRoomTypeIdAndAvailabilityTrue(Long roomTypeId);
	
	@Query("SELECT r FROM Room r WHERE r.hotelRoomType.id IN :roomTypeIds ORDER BY r.id DESC")
	List<Room> findRoomsByRoomTypeId(Pageable pageable, List<Long> roomTypeIds);

}
