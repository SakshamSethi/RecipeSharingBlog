package com.food.controllers;

import com.food.model.User;
import com.food.repository.UserRepository;
import com.food.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/api/user/profile")
    public User findUserByJwt(@RequestHeader("Authorization") String jwt ) throws  Exception
    {
        return this.userService.findUserByJwt(jwt);

    }


}
