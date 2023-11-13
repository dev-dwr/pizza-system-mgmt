package com.pwr.edu.backend.auth;

import com.pwr.edu.backend.domain.security.AppUserRole;



public record RegistrationRequest(String firstname, String lastname, String password, String email, AppUserRole userRole) {}