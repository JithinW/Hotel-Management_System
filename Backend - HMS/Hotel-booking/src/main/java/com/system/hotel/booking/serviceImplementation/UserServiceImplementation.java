package com.system.hotel.booking.serviceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
        // Retrieve user from database using the email
        User user = userRepository.findByEmail(email);

        // If user is not found, return null
        if (user == null) {
            return null;
        }

        // If password is incorrect, return null
        if (!user.getPassword().equals(password)) {
            return null;
        }

        // Authentication successful, return user
        return user;
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id).orElse(null);
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
}
