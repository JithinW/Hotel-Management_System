package com.system.hotel.booking.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.system.hotel.booking.entity.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>{
	
	List<Booking> findByCheckInDateLessThanEqualAndCheckOutDateGreaterThanEqual( Date checkInDate, Date checkOutDate);
	
	@Query("SELECT b FROM Booking b WHERE "
	        + "((b.checkInDate BETWEEN :checkInDate AND :checkOutDate) OR (b.checkOutDate BETWEEN :checkInDate AND :checkOutDate) OR "
	        + "(:checkInDate BETWEEN b.checkInDate AND b.checkOutDate) OR (:checkOutDate BETWEEN b.checkInDate AND b.checkOutDate)) "
	        + "AND b.paymentStatus = true")
    List<Booking> findBookingsByCheckInAndCheckOutDates(
            @Param("checkInDate") Date checkInDate,
            @Param("checkOutDate") Date checkOutDate);
	
	@Query("SELECT b FROM Booking b WHERE b.hotelId = :hotelId AND b.paymentStatus = true ORDER BY b.id DESC")
	List<Booking> findBookingsByPage(Pageable pageable, Long hotelId);
	
	@Query("SELECT b FROM Booking b WHERE b.user.id = :userId AND b.paymentStatus = true ORDER BY b.id DESC\r\n"
			+ "")
	List<Booking> findMyBookingsByPage(Pageable pageable,@Param("userId") Long userId);
	
	@Query("SELECT b FROM Booking b ORDER BY b.id DESC")
	List<Booking> findAllBookingsByPage(Pageable pageable);
}

