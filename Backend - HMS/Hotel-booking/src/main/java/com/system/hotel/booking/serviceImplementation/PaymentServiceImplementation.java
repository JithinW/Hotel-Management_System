package com.system.hotel.booking.serviceImplementation;

import java.util.List;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.system.hotel.booking.entity.Booking;
import com.system.hotel.booking.entity.HotelRoomType;
import com.system.hotel.booking.entity.Payment;
import com.system.hotel.booking.entity.Room;
import com.system.hotel.booking.repository.BookingRepository;
import com.system.hotel.booking.repository.HotelRoomTypeRepository;
import com.system.hotel.booking.repository.PaymentRepository;
import com.system.hotel.booking.repository.RoomRepository;
import com.system.hotel.booking.services.PaymentService;

@Service
public class PaymentServiceImplementation implements PaymentService {

	@Autowired
	private RoomRepository roomRepository;
	
	@Autowired
	private BookingRepository bookingRepository;
	
	@Autowired
	private PaymentRepository paymentRepository;
	
	@Autowired
	private HotelRoomTypeRepository hotelRoomTypeRespository;

	@Override
	public Payment createPayment(Payment payment, Long bookingId, List<Long> roomIds) {
		for(Long roomId : roomIds) {
			Room room = new Room();
			room = roomRepository.findById(roomId).orElseThrow(()->new EntityNotFoundException("Room not found"));
			HotelRoomType hotelRoomType = hotelRoomTypeRespository.findById(room.getHotelRoomType().getId()).orElseThrow(()-> new EntityNotFoundException("Room Type not found"));
			hotelRoomType.setBookedCount(hotelRoomType.getBookedCount() + 1);
			hotelRoomTypeRespository.save(hotelRoomType);
		}
		Booking booking = bookingRepository.findById(bookingId).orElseThrow(()-> new EntityNotFoundException("Booking not found"));
		booking.setPaymentStatus(true);
		bookingRepository.save(booking);
		payment.setBooking(booking);
		return paymentRepository.save(payment);
	}

}
