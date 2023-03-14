package com.system.hotel.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.system.hotel.booking.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
