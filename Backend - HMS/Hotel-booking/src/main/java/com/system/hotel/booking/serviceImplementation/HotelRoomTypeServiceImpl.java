package com.system.hotel.booking.serviceImplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.hotel.booking.entity.HotelRoomType;
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

}
