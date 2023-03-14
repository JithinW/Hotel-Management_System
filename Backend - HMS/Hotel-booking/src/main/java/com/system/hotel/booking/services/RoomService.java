package com.system.hotel.booking.services;

import java.util.List;
import java.util.Map;

import com.system.hotel.booking.common.RoomAndRoomTypeVO;
import com.system.hotel.booking.entity.Room;

public interface RoomService {
	
	Room saveRoom(Room room, Long hotelRoomTypeId);
	
	Map<Long,String> getRoomsByHotelRoomTypeId(Long hotelRoomTypeId);
	
	List<RoomAndRoomTypeVO> getRoomsByPage(int page, Long hotelId);
	
	void deleteRoomById(Long roomId);

}
