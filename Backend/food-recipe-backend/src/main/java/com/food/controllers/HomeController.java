package com.food.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/home")

public class HomeController {

    @GetMapping()
    public String homeController()
    {
        return "welcome back !";
    }
}
