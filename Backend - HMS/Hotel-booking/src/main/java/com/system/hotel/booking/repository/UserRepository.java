package com.system.hotel.booking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.system.hotel.booking.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	User findByEmail(String email);

	Optional<User> findById(Long id);

	@Query("SELECT u FROM User u ORDER BY u.id DESC")
	List<User> findAllUsersByPage(Pageable pageable);

}
