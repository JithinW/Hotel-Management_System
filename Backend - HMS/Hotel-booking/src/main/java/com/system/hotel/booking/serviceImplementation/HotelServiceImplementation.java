package com.system.hotel.booking.serviceImplementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.hotel.booking.entity.Hotel;
import com.system.hotel.booking.repository.HotelRepository;
import com.system.hotel.booking.services.HotelService;

@Service
public class HotelServiceImplementation implements HotelService {
	
	@Autowired
    private final HotelRepository hotelRepository;

    public HotelServiceImplementation(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

	@Override
	public Hotel createHotel(Hotel hotel) {
		return hotelRepository.save(hotel);
	}
	
	@Override
	public List<Hotel> getAllHotels() {
		return hotelRepository.findAll();
	}

	@Override
	public List<Hotel> getHotelsByLocationAndName(String location, String name) {
		return hotelRepository.findByLocationAndName(location, name);
	}

	@Override
	public List<Hotel> getHotelsByName(String name) {
		return hotelRepository.findByName(name);
	}

	@Override
	public List<Hotel> getHotelsByLocation(String location) {
		return hotelRepository.findByLocation(location);
	}
	
}
