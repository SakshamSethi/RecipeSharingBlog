package com.food.controllers;

import com.food.config.JwtProvider;
import com.food.model.User;
import com.food.repository.UserRepository;
import com.food.request.LoginRequest;
import com.food.response.AuthResponse;
import com.food.services.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/auth")

public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public AuthResponse createUser(@RequestBody User user) throws Exception{
    String email = user.getEmail();
    String password = user.getPassword();
    String fullName = user.getFullname();

    //verify email

        User isExistEmail = userRepository.findByEmail(email);

        if(isExistEmail!=null)
        {
            // user already exist
            throw new Exception("User already exist with the provided email with another account");
        }

        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setFullname(fullName);

        userRepository.save(createdUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(email,password);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);

        AuthResponse res = new AuthResponse();

        res.setJwt(token);
        res.setMessage("signup success");
        return res;

    }

    @PostMapping("/signin")
    public AuthResponse signinHandler(@RequestBody LoginRequest loginRequest){

        String userName = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticate(userName,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);

        AuthResponse res = new AuthResponse();

        res.setJwt(token);
        res.setMessage("signin success");
        return res;

    }

    private Authentication authenticate(String userName, String password) {

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(userName);

        if(userDetails==null)
            throw new BadCredentialsException("Bad Credentials ! user not found");

        if(!passwordEncoder.matches(password,userDetails.getPassword()))
            throw  new BadCredentialsException("invalid Password");

        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }


}
