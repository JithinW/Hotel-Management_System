package com.system.hotel.booking.controller;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.system.hotel.booking.common.BookingAndUserNameVO;
import com.system.hotel.booking.common.BookingIdAndRoomIds;
import com.system.hotel.booking.entity.Booking;
import com.system.hotel.booking.services.BookingService;

@RestController
@CrossOrigin
@RequestMapping("/booking")
public class BookingController {

	@Autowired
	private BookingService bookingService;

	@GetMapping("/getRoomCount")
	public ResponseEntity<Long> getAvailableRooms(
			@RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date checkInDate,
			@RequestParam("checkOutDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date checkOutDate,
			@RequestParam("roomTypeId") Long roomTypeId) {
		try {
			Long availableRooms = bookingService.getAvailableRoomsByRoomTypeIdAndCheckInAndCheckOutDates(roomTypeId,
					checkInDate, checkOutDate);

			return ResponseEntity.ok(availableRooms);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping("/create")
	public ResponseEntity<?> createBooking(@RequestBody Booking booking,
			@RequestParam("hotelRoomTypeId") Long hotelRoomTypeId, @RequestParam("userId") Long userId) {
		try {
			BookingIdAndRoomIds bookingIdAndRoomIds = bookingService.createBooking(booking, hotelRoomTypeId, userId);
			if (!bookingIdAndRoomIds.getRoomIds().isEmpty()) {
				return ResponseEntity.ok(bookingIdAndRoomIds);
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body(booking.getNumOfRooms() + " rooms not available for these dates");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("getBookings/{page}")
	public ResponseEntity<List<BookingAndUserNameVO>> getBookingsByPage(@PathVariable("page") int page, @RequestParam("hotelId") Long hotelId) {
		try {
			List<BookingAndUserNameVO> bookings = bookingService.getBookingsByPage(page, hotelId);
			return ResponseEntity.ok(bookings);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}

	@DeleteMapping("/{bookingId}")
	public ResponseEntity<?> deleteBooking(@PathVariable("bookingId") Long bookingId) {
		try {
			bookingService.deleteBookingById(bookingId);
			return ResponseEntity.ok("Deleted successfuly");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@GetMapping("mybookings/{page}")
	public ResponseEntity<List<BookingAndUserNameVO>> getMyBookingsByPage(@PathVariable("page") int page, @RequestParam("userId") Long userId ) {
		try {
			List<BookingAndUserNameVO> bookings = bookingService.getMyBookingsByPage(page,userId);
			return ResponseEntity.ok(bookings);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}

	@GetMapping("getAllBookings/{page}")
	public ResponseEntity<List<BookingAndUserNameVO>> getAllBookingsByPage(@PathVariable("page") int page) {
		try {
			List<BookingAndUserNameVO> bookings = bookingService.getAllBookingsByPage(page);
			return ResponseEntity.ok(bookings);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}
}
