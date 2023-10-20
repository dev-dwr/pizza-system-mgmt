package com.pwr.edu.backend.service.security;


import com.pwr.edu.backend.auth.EmailValidator;
import com.pwr.edu.backend.auth.RegistrationRequest;
import com.pwr.edu.backend.domain.security.AppUser;
import com.pwr.edu.backend.domain.security.AppUserRole;
import com.pwr.edu.backend.email.EmailSender;
import com.pwr.edu.backend.util.EmailBuilder;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.pwr.edu.backend.domain.security.ConfirmationToken;

import java.time.LocalDateTime;


@Service
@AllArgsConstructor
public class RegistrationService {
    private final EmailValidator emailValidator;
    private final AppUserService appUserService;
    private final ConfirmationTokenService tokenService;
    private final EmailBuilder emailBuilder;
    private final EmailSender emailSender;
    private static final String REGISTRATION_LINK = "http://localhost:8080/api/v1/registration/confirm?token=";

    public String register(RegistrationRequest request) {
        validateEmail(request);
        String token = createToken(request);
        String link = REGISTRATION_LINK + token;

        emailSender.send(
                request.email(),
                emailBuilder.buildEmail(request.firstname(), link)
        );

        return token;
    }


    private String createToken(RegistrationRequest request) {
        return appUserService.signUpUser(new AppUser(
                request.firstname(),
                request.lastname(),
                request.email(),
                request.password(),
                AppUserRole.USER
        ));

    }

    private void validateEmail(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.email());
        if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }
    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = tokenService.getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        tokenService.setConfirmedAt(token);
        appUserService.enableAppUser(
                confirmationToken.getAppUser().getEmail());

        return "confirmed";
    }

}
