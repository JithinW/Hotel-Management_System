package com.system.hotel.booking.serviceImplementation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.system.hotel.booking.common.BookingAndUserNameVO;
import com.system.hotel.booking.common.RoomAndRoomTypeVO;
import com.system.hotel.booking.entity.Booking;
import com.system.hotel.booking.entity.HotelRoomType;
import com.system.hotel.booking.entity.Room;
import com.system.hotel.booking.repository.HotelRoomTypeRepository;
import com.system.hotel.booking.repository.RoomRepository;
import com.system.hotel.booking.services.RoomService;

@Service
public class RoomServiceImplementation implements RoomService {

	@Autowired
	private RoomRepository roomRepository;

	@Autowired
	private HotelRoomTypeRepository hotelRoomTypeRepository;

	@Transactional
	public Room saveRoom(Room room, Long hotelRoomTypeId) {
		HotelRoomType hotelRoomType = hotelRoomTypeRepository.findById(hotelRoomTypeId)
				.orElseThrow(() -> new EntityNotFoundException("Room Type not found"));
		String name = room.getName();
		Optional<Room> existingRoom = roomRepository.findByName(name);
		if (existingRoom.isPresent()) {
			throw new IllegalArgumentException("Room with name '" + name + "' already exists");
		}
		hotelRoomType.setTotalRooms(hotelRoomType.getTotalRooms() + 1);
		if (Boolean.TRUE.equals(room.getAvailability())) {
			hotelRoomType.setAvailableRooms(hotelRoomType.getAvailableRooms() + 1);
		}
		room.setHotelRoomType(hotelRoomType);
		return roomRepository.save(room);
	}

	@Override
	public Map<Long, String> getRoomsByHotelRoomTypeId(Long hotelRoomTypeId) {
		List<Room> rooms = roomRepository.findByHotelRoomTypeId(hotelRoomTypeId);
		Map<Long, String> roomWithIds = new HashMap<>();
		rooms.stream().forEach((room) -> roomWithIds.put(room.getId(), room.getName()));
		return roomWithIds;
	}

	@Override
	public List<RoomAndRoomTypeVO> getRoomsByPage(int pageNumber, Long hotelId) {
		List<HotelRoomType> roomTypes = hotelRoomTypeRepository.findByHotelId(hotelId);
		List<Long> roomTypeIds = new ArrayList<>();
		for (HotelRoomType roomType : roomTypes) {
			Long id = roomType.getId();
			roomTypeIds.add(id);
		}
		List<RoomAndRoomTypeVO> roomList = new ArrayList<>();
		int pageSize = 10;
		Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
		List<Room> rooms = roomRepository.findRoomsByRoomTypeId(pageable, roomTypeIds);
		for (Room room : rooms) {
			RoomAndRoomTypeVO roomAndRoomTypeVO = new RoomAndRoomTypeVO();
			roomAndRoomTypeVO.setId(room.getId());
			roomAndRoomTypeVO.setName(room.getName());
			roomAndRoomTypeVO.setHotelRoomType(room.getHotelRoomType().getName());
			roomAndRoomTypeVO.setLocation(room.getLocation());
			roomAndRoomTypeVO.setAvailability(room.getAvailability());
			roomList.add(roomAndRoomTypeVO);
		}
		return roomList;
	}

	@Override
	public void deleteRoomById(Long roomId) {
		Room room = roomRepository.findById(roomId).orElse(null);
		Long roomTypeId = room.getHotelRoomType().getId();
		HotelRoomType roomType = hotelRoomTypeRepository.findById(roomTypeId)
				.orElseThrow(() -> new EntityNotFoundException("Roomtype Not Found"));
		if (Boolean.TRUE.equals(room.getAvailability())) {
			roomType.setAvailableRooms(roomType.getAvailableRooms() - 1);
		}
		roomType.setTotalRooms(roomType.getTotalRooms() - 1);
		hotelRoomTypeRepository.save(roomType);
		roomRepository.delete(room);
	}

}
