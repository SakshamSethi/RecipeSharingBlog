package com.food.services;

import com.food.config.JwtProvider;
import com.food.model.User;
import com.food.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImplementation implements  UserService{

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserRepository userRepository;
    @Override
    public User findUserById(Long userId) throws Exception {
         Optional<User> opt = userRepository.findById(userId);

         if(opt.isPresent()) return opt.get();
         else
             throw  new Exception("User not found with the id "+userId);
    }

    @Override
    public User findUserByJwt(String jwt) throws Exception {
        String email = this.jwtProvider.getEmailFromJwtToken(jwt);
        if(email==null) throw new Exception("Token is not valid please provide a valid jwt token");

        User user = this.userRepository.findByEmail(email);

        if(user == null) throw new Exception("User not found with the email "+email);

        return user;

    }
}
