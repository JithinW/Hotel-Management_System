package com.system.hotel.booking.serviceImplementation;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.system.hotel.booking.common.BookingAndUserNameVO;
import com.system.hotel.booking.common.BookingIdAndRoomIds;
import com.system.hotel.booking.entity.Booking;
import com.system.hotel.booking.entity.HotelRoomType;
import com.system.hotel.booking.entity.Room;
import com.system.hotel.booking.entity.User;
import com.system.hotel.booking.repository.BookingRepository;
import com.system.hotel.booking.repository.HotelRoomTypeRepository;
import com.system.hotel.booking.repository.RoomRepository;
import com.system.hotel.booking.repository.UserRepository;
import com.system.hotel.booking.services.BookingService;

@Service
public class BookingServiceImplementation implements BookingService {

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private RoomRepository roomRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private HotelRoomTypeRepository hotelRoomTypeRepository;

	@Override
	public Long getAvailableRoomsByRoomTypeIdAndCheckInAndCheckOutDates(Long roomTypeId, Date checkInDate,
			Date checkOutDate) {

		List<Booking> existingBookings = bookingRepository
				.findBookingsByCheckInAndCheckOutDates(checkInDate, checkOutDate);
		List<Room> availableRooms = roomRepository.findByHotelRoomTypeIdAndAvailabilityTrue(roomTypeId);
		Set<Long> bookedRoomIds = new HashSet<>();
		for (Booking b : existingBookings) {
			List<Room> rooms = b.getRooms();
			for (Room room : rooms) {
				Long id = room.getId();
				bookedRoomIds.add(id);
			}
		}

		int count = 0;
		if (!availableRooms.isEmpty()) {
			for (Room room : availableRooms) {
				if (bookedRoomIds.contains(room.getId())) {
					count++;
				}
			}
		}
		return (long) (availableRooms.size() - count);

	}

	@Override
	public BookingIdAndRoomIds createBooking(Booking booking, Long hotelRoomTypeId, Long userId) {
		BookingIdAndRoomIds bookingIdAndRoomIds = new BookingIdAndRoomIds();
		List<Room> bookedRooms = new ArrayList<Room>();
		HotelRoomType hotelRoomType = hotelRoomTypeRepository.findById(hotelRoomTypeId).orElseThrow(()-> new EntityNotFoundException("Room Type not found"));
		booking.setHotelId(hotelRoomType.getHotel().getId());
		List<Booking> existingBookings = bookingRepository
				.findBookingsByCheckInAndCheckOutDates(booking.getCheckInDate(),
						booking.getCheckOutDate());
		List<Room> availableRooms = roomRepository.findByHotelRoomTypeIdAndAvailabilityTrue(hotelRoomTypeId);
		Set<Long> bookedRoomIds = new HashSet<>();
		if (!existingBookings.isEmpty()) {
			for (Booking b : existingBookings) {
				List<Room> rooms = b.getRooms();
				for (Room room : rooms) {
					Long id = room.getId();
					bookedRoomIds.add(id);
				}
			}
		}
		if (!availableRooms.isEmpty()) {
			Iterator<Room> iterator = availableRooms.iterator();
			while (iterator.hasNext()) {
				Room room = iterator.next();
				if (bookedRoomIds.contains(room.getId())) {
					iterator.remove();
				}
			}	
		}
		List<Long> currentlyBookedRoomIds = new ArrayList<>();
		if (booking.getNumOfRooms() <= availableRooms.size()) {
			bookedRooms = availableRooms.subList(0, booking.getNumOfRooms().intValue());
			for (Room room : bookedRooms) {
				currentlyBookedRoomIds.add(room.getId());
			}
		} else {
			return bookingIdAndRoomIds;
		}
		booking.setRooms(bookedRooms);
		Optional<User> optionalUser = userRepository.findById(userId);
		User user = optionalUser.orElse(null);
		booking.setUser(user);
		booking.setPaymentStatus(false);
		Booking createdBooking = bookingRepository.save(booking);
		bookingIdAndRoomIds.setBookingId(createdBooking.getId());
		bookingIdAndRoomIds.setRoomIds(currentlyBookedRoomIds);
		return bookingIdAndRoomIds;
	}

	@Override
	public List<BookingAndUserNameVO> getBookingsByPage(int pageNumber, Long hotelId) {
		List<BookingAndUserNameVO> bookingList = new ArrayList<>();
		int pageSize = 10;
		Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
		List<Booking> bookings = bookingRepository.findBookingsByPage(pageable, hotelId);
		for (Booking booking : bookings) {
			BookingAndUserNameVO bookingAndUserNameVO = new BookingAndUserNameVO();
			bookingAndUserNameVO.setId(booking.getId());
			bookingAndUserNameVO.setName(booking.getUser().getName());
			bookingAndUserNameVO.setCheckInDate(booking.getCheckInDate());
			bookingAndUserNameVO.setCheckOutDate(booking.getCheckOutDate());
			bookingAndUserNameVO.setNumOfRooms(booking.getNumOfRooms());
			bookingAndUserNameVO.setCost(booking.getCost());
			bookingList.add(bookingAndUserNameVO);
		}
        return bookingList;
	}

	@Override
	public void deleteBookingById(Long bookingId) {
		Long roomTypeId = (long) 0;
		Booking booking = bookingRepository.findById(bookingId).orElse(null);
        List<Room> rooms = booking.getRooms();
        for (Room room : rooms) {
        	roomTypeId = room.getHotelRoomType().getId();
        }
        HotelRoomType roomType = hotelRoomTypeRepository.findById(roomTypeId).orElseThrow(() -> new EntityNotFoundException("Roomtype Not Found"));
        roomType.setBookedCount(roomType.getBookedCount() - 1);
        hotelRoomTypeRepository.save(roomType);
        bookingRepository.delete(booking);	
	}

	@Override
	public List<BookingAndUserNameVO> getMyBookingsByPage(int pageNumber, Long userId) {
		List<BookingAndUserNameVO> bookingList = new ArrayList<>();
		int pageSize = 10;
		Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
		List<Booking> bookings = bookingRepository.findMyBookingsByPage(pageable, userId);
		for (Booking booking : bookings) {
			BookingAndUserNameVO bookingAndUserNameVO = new BookingAndUserNameVO();
			bookingAndUserNameVO.setId(booking.getId());
			bookingAndUserNameVO.setName(booking.getUser().getName());
			bookingAndUserNameVO.setCheckInDate(booking.getCheckInDate());
			bookingAndUserNameVO.setCheckOutDate(booking.getCheckOutDate());
			bookingAndUserNameVO.setNumOfRooms(booking.getNumOfRooms());
			bookingAndUserNameVO.setCost(booking.getCost());
			bookingList.add(bookingAndUserNameVO);
		}
        return bookingList;
	}

	@Override
	public List<BookingAndUserNameVO> getAllBookingsByPage(int pageNumber) {
		List<BookingAndUserNameVO> bookingList = new ArrayList<>();
		int pageSize = 10;
		Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
		List<Booking> bookings = bookingRepository.findAllBookingsByPage(pageable);
		for (Booking booking : bookings) {
			BookingAndUserNameVO bookingAndUserNameVO = new BookingAndUserNameVO();
			bookingAndUserNameVO.setId(booking.getId());
			bookingAndUserNameVO.setName(booking.getUser().getName());
			bookingAndUserNameVO.setCheckInDate(booking.getCheckInDate());
			bookingAndUserNameVO.setCheckOutDate(booking.getCheckOutDate());
			bookingAndUserNameVO.setNumOfRooms(booking.getNumOfRooms());
			bookingAndUserNameVO.setCost(booking.getCost());
			bookingList.add(bookingAndUserNameVO);
		}
        return bookingList;
	}

}
