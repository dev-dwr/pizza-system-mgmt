package com.pwr.edu.backend.controller;

import com.pwr.edu.backend.auth.LoginRequest;
import com.pwr.edu.backend.auth.LoginResponse;
import com.pwr.edu.backend.domain.security.TokenRequest;
import com.pwr.edu.backend.service.security.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1")
public class LoginController {

    private final LoginService loginService;


    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public LoginResponse login(@RequestBody LoginRequest request) {
        return loginService.loginUser(request);
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.OK)
    public String logoutUser(@RequestBody TokenRequest token) {
        loginService.logoutUser(token);
        return "logged out";
    }
}
