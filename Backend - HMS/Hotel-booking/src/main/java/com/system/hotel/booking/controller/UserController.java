package com.system.hotel.booking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.system.hotel.booking.common.UserAndHotelIdVO;
import com.system.hotel.booking.common.UserRole;
import com.system.hotel.booking.entity.Hotel;
import com.system.hotel.booking.entity.User;
import com.system.hotel.booking.services.HotelService;
import com.system.hotel.booking.services.UserService;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

	private final UserService userService;

	@Autowired
	private final HotelService hotelService;

	public UserController(UserService userService, HotelService hotelService) {
		this.userService = userService;
		this.hotelService = hotelService;
	}

	@PostMapping("/signup")
	public ResponseEntity<User> signUp(@RequestBody User user) {
		try {
			User createdUser = userService.createUser(user);
			return ResponseEntity.ok(createdUser);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		try {
			User authenticatedUser = userService.authenticateUser(user.getEmail(), user.getPassword());
			if (authenticatedUser != null) {
				if (authenticatedUser.getRole().equals(UserRole.HOTEL_ADMIN)) {
					Hotel hotel = hotelService.getHotelByUserId(authenticatedUser.getId());
					UserAndHotelIdVO userAndHotelIdVO = new UserAndHotelIdVO();
					return ResponseEntity.ok(userAndHotelIdVO.convert(authenticatedUser, hotel.getId()));
				} else {
					return ResponseEntity.ok(authenticatedUser);
				}
			} else {
				return ResponseEntity.notFound().build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		try {
			User user = userService.getUserById(id);
			if (user != null) {
				return ResponseEntity.ok(user);
			} else {
				return ResponseEntity.notFound().build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
		try {
			User updatedUser = userService.updateUser(id, user);
			if (updatedUser != null) {
				return ResponseEntity.ok(updatedUser);
			} else {
				return ResponseEntity.notFound().build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		try {
			userService.deleteUser(id);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@GetMapping("/page/{pageNumber}")
	public ResponseEntity<List<User>> getUsers(@PathVariable int pageNumber) {
		try {
			List<User> users = userService.getAllUsers(pageNumber);
			return ResponseEntity.ok(users);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
