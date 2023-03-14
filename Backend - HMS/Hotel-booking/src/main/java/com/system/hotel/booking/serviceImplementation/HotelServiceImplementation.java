package com.system.hotel.booking.serviceImplementation;

import java.util.List;

import javax.mail.MessagingException;
import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.system.hotel.booking.entity.Hotel;
import com.system.hotel.booking.entity.HotelRoomType;
import com.system.hotel.booking.entity.Room;
import com.system.hotel.booking.entity.User;
import com.system.hotel.booking.repository.HotelRepository;
import com.system.hotel.booking.repository.HotelRoomTypeRepository;
import com.system.hotel.booking.repository.UserRepository;
import com.system.hotel.booking.services.HotelService;
import com.system.hotel.booking.common.RoomAndBookingCountsVO;
import com.system.hotel.booking.common.UserRole;

@Service
public class HotelServiceImplementation implements HotelService {

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private final HotelRepository hotelRepository;

	@Autowired
	private final UserRepository userRepository;

	@Autowired
	private HotelRoomTypeRepository hotelRoomTypeRepository;

	public HotelServiceImplementation(HotelRepository hotelRepository, UserRepository userRepository) {
		this.hotelRepository = hotelRepository;
		this.userRepository = userRepository;
	}

	@Override
	public Hotel createHotel(Hotel hotel) {
		return hotelRepository.save(hotel);
	}

	@Override
	public User createHotelUser(Hotel hotel) {
		String password = generatePassword(hotel.getName());
		try {
			sendPassword(hotel.getEmail(), password);
		} catch (MessagingException e) {
			throw new RuntimeException("Failed to send password email", e);
		}
		User user = new User();
		user.setName(hotel.getName());
		user.setEmail(hotel.getEmail());
		user.setPassword(password);
		user.setRole(UserRole.HOTEL_ADMIN);
		return userRepository.save(user);
	}

	public void sendPassword(String recipientEmail, String password) throws MessagingException {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("montanasurf123@gmail.com");
		message.setTo(recipientEmail);
		message.setSubject("Thank you for being a part of Montana Surfs");
		message.setText("Please use the password " + password + "to sign in");
		mailSender.send(message);
	}

	private String generatePassword(String name) {
		return (name + "@123");
	}

	@Override
	public List<Hotel> getAllHotels() {
		return hotelRepository.findAll();
	}

	@Override
	public Hotel getHotelById(Long hotelId) {
		return hotelRepository.findById(hotelId).orElseThrow(() -> new EntityNotFoundException("Hotel not found"));
	}

	@Override
	public List<Hotel> getHotelsByLocationAndName(String location, String name) {
		return hotelRepository.findByLocationAndName(location, name);
	}

	@Override
	public Hotel getHotelByUserId(Long userId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
		return hotelRepository.findByUser(user);
	}

	@Override
	public List<Hotel> getHotelsByName(String name) {
		return hotelRepository.findByName(name);
	}

	@Override
	public List<Hotel> getHotelsByLocation(String location) {
		return hotelRepository.findByLocation(location);
	}

	@Override
	public List<Hotel> getHotelsByPage(int pageNumber) {
		int pageSize = 10;
		Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
		return hotelRepository.findHotelsByPage(pageable);
	}

	@Override
	public void deleteHotelById(Long hotelId) {
		Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
		User user = userRepository.findByEmail(hotel.getEmail());
		if (user != null && hotel != null) {
			userRepository.delete(user);
			hotelRepository.deleteById(hotelId);
		}
	}

	@Override
	public RoomAndBookingCountsVO getRoomsAndBookingCounts(Long hotelId) {
		RoomAndBookingCountsVO roomAndBookingCountsVO = new RoomAndBookingCountsVO();
		List<HotelRoomType> hotelRoomTypes = hotelRoomTypeRepository.findByHotelId(hotelId);
		int totalRooms = 0;
		int activeRooms = 0;
		int bookingCounts = 0;
		for (HotelRoomType roomType : hotelRoomTypes) {
			totalRooms = totalRooms + roomType.getTotalRooms();
			activeRooms = activeRooms + roomType.getAvailableRooms();
			bookingCounts = bookingCounts + roomType.getBookedCount();
		}
		roomAndBookingCountsVO.setTotalRooms(totalRooms);
		roomAndBookingCountsVO.setAvailableRooms(activeRooms);
		roomAndBookingCountsVO.setBookingCounts(bookingCounts);
		return roomAndBookingCountsVO;
	}

}
