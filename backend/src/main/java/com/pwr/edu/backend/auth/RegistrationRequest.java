package com.pwr.edu.backend.auth;

import lombok.Data;


public record RegistrationRequest(String firstname, String lastname, String password, String email) {}