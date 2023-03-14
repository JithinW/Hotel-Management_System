package com.system.hotel.booking.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.system.hotel.booking.common.RoomAndRoomTypeVO;
import com.system.hotel.booking.entity.Room;
import com.system.hotel.booking.services.RoomService;

@RestController
@CrossOrigin
@RequestMapping("/room")
public class RoomController {

	@Autowired
	private final RoomService roomService;

	public RoomController(RoomService roomService) {
		this.roomService = roomService;
	}

	@PostMapping("/create")
	public ResponseEntity<Room> createRoom(@RequestBody Room room, @RequestParam Long hotelRoomTypeId) {
		Room savedRoom = roomService.saveRoom(room, hotelRoomTypeId);
		return new ResponseEntity<>(savedRoom, HttpStatus.CREATED);
	}

	@GetMapping("/getRooms/{hotelRoomTypeId}")
	public ResponseEntity<Map<Long, String>> getRoomsByRoomType(@PathVariable Long hotelRoomTypeId) {
		try {
			Map<Long, String> roomsWithId = roomService.getRoomsByHotelRoomTypeId(hotelRoomTypeId);
			return ResponseEntity.ok(roomsWithId);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@GetMapping("page/{pageNumber}")
	public ResponseEntity<List<RoomAndRoomTypeVO>> getBookingsByPage(@PathVariable("pageNumber") int pageNumber,
			@RequestParam("hotelId") Long  hotelId) {
		try {
			List<RoomAndRoomTypeVO> rooms = roomService.getRoomsByPage(pageNumber, hotelId);
			return ResponseEntity.ok(rooms);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@DeleteMapping("/{roomId}")
	public ResponseEntity<?> deleteBooking(@PathVariable("roomId") Long roomId) {
		try {
			roomService.deleteRoomById(roomId);
			return ResponseEntity.ok("Deleted successfuly");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
}
