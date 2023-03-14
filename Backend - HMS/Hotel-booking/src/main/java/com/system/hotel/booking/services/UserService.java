package com.system.hotel.booking.services;

import java.util.List;

import com.system.hotel.booking.entity.User;

public interface UserService {

    User createUser(User user);
    
    User authenticateUser(String email, String password);

    User getUserById(Long id);

    User updateUser(Long id, User user);

    void deleteUser(Long id);
    
    List<User> getAllUsers(int pageNumber);
}

