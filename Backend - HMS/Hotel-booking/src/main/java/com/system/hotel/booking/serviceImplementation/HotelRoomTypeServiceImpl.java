package com.system.hotel.booking.serviceImplementation;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.system.hotel.booking.common.RoomAndRoomTypeVO;
import com.system.hotel.booking.entity.HotelRoomType;
import com.system.hotel.booking.entity.Room;
import com.system.hotel.booking.repository.HotelRoomTypeRepository;
import com.system.hotel.booking.services.HotelRoomTypeService;

@Service
public class HotelRoomTypeServiceImpl implements HotelRoomTypeService{
	
	@Autowired
	public final HotelRoomTypeRepository hotelRoomTypeRepository;
	
	public HotelRoomTypeServiceImpl(HotelRoomTypeRepository hotelRoomTypeRepository) {
		this.hotelRoomTypeRepository = hotelRoomTypeRepository;
	}

	@Override
	public HotelRoomType createHotelRoomType(HotelRoomType hotelRoomType) {
		return hotelRoomTypeRepository.save(hotelRoomType);
	}

	@Override
    public List<HotelRoomType> getHotelRoomTypesByHotelId(Long hotelId) {
        return hotelRoomTypeRepository.findByHotelId(hotelId);
    }
	
	@Override
    public HotelRoomType getHotelRoomTypeById(Long hotelRoomTypeId) {
        return hotelRoomTypeRepository.findById(hotelRoomTypeId).orElseThrow(() -> new EntityNotFoundException("Room Type not found"));
    }

	@Override
	public List<HotelRoomType> getRoomTypesByPage(int pageNumber, Long hotelId) {
		int pageSize = 10;
		Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
		return hotelRoomTypeRepository.findHotelRoomTypesByHotelId(pageable, hotelId);
	}
	
	@Override
	public void deleteRoomTypeById(Long roomTypeId) {
		HotelRoomType roomType = hotelRoomTypeRepository.findById(roomTypeId).orElse(null);
		if (roomType != null) {
			hotelRoomTypeRepository.deleteById(roomTypeId);
		}
	}

}
