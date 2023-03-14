package com.system.hotel.booking.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.system.hotel.booking.entity.Payment;
import com.system.hotel.booking.services.PaymentService;

@RestController
@CrossOrigin
@RequestMapping("/payment")
public class PaymentController {

	@Autowired
	private PaymentService paymentService;

	@PostMapping("/create")
	public ResponseEntity<?> createPayment(@RequestBody Payment payment, @RequestParam("bookingId") Long bookingId,
			@RequestParam("roomIds") List<Long> roomIds) {
		try {
			paymentService.createPayment(payment, bookingId, roomIds);
			return ResponseEntity.status(HttpStatus.CREATED).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
