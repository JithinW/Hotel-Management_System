package com.system.hotel.booking.services;

import java.util.List;

import com.system.hotel.booking.entity.Payment;

public interface PaymentService {

	Payment createPayment(Payment payment, Long bookingId, List<Long> roomId);
}
