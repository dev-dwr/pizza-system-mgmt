package com.pwr.edu.backend.auth;

import com.pwr.edu.backend.domain.security.AppUser;
import com.pwr.edu.backend.domain.security.AppUserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private boolean isLoggedIn;
    private String token;
    private AppUserRole appUserRole;
    private AppUser user;
}