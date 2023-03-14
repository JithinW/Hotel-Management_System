package com.system.hotel.booking.serviceImplementation;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.system.hotel.booking.entity.HotelRoomType;
import com.system.hotel.booking.entity.User;
import com.system.hotel.booking.repository.UserRepository;
import com.system.hotel.booking.services.UserService;

@Service
public class UserServiceImplementation implements UserService {

	@Autowired
    private final UserRepository userRepository;

    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }
    
    @Override
    public User authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return null;
        }
        if (!user.getPassword().equals(password)) {
            return null;
        }
        return user;
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Override
    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
        if (existingUser != null) {
            user.setId(existingUser.getId());
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

	@Override
	public List<User> getAllUsers(int pageNumber) {
		int pageSize = 10;
		Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
		return userRepository.findAllUsersByPage(pageable);
	}
	
}
