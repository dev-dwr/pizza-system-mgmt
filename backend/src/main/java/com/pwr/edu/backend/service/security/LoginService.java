package com.pwr.edu.backend.service.security;

import com.pwr.edu.backend.auth.EmailValidator;
import com.pwr.edu.backend.auth.LoginRequest;
import com.pwr.edu.backend.auth.LoginResponse;
import com.pwr.edu.backend.domain.security.AppUser;
import com.pwr.edu.backend.domain.security.ConfirmationToken;
import com.pwr.edu.backend.domain.security.TokenRequest;
import com.pwr.edu.backend.exceptions.NotFoundException;
import com.pwr.edu.backend.repository.security.AppUserRepository;
import com.pwr.edu.backend.repository.security.ConfirmationTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
@AllArgsConstructor
public class LoginService {
    private final AppUserRepository repository;
    private final EmailValidator emailValidator;
    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public LoginResponse loginUser(LoginRequest request) {
        String email = request.email();

        boolean isValidEmail = emailValidator.test(email);
        if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }
        AppUser user = repository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException(String.format("%s was not found in database", email)));

        if(!user.isEnabled()){
            throw new IllegalStateException("Please confirm your e-mail");
        }

        if (!bCryptPasswordEncoder.matches(request.password(), user.getPassword())){
            throw new IllegalStateException("Invalid password");
        }

        user.setLoggedIn(true);
        ConfirmationToken token = confirmationTokenRepository.findConfirmationTokenByAppUser(user);
        return new LoginResponse(user.getLoggedIn(), token.getToken());
    }

    public void logoutUser(TokenRequest token) {
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(token.getToken()).orElseThrow(() ->
                new UsernameNotFoundException((String.format("%s token was not found in database", token.getToken()))));
        AppUser appUser = confirmationToken.getAppUser();
        appUser.setLoggedIn(false);
    }
}