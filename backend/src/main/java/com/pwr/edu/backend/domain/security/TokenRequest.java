package com.pwr.edu.backend.domain.security;

public class TokenRequest {
    private String token;
    public TokenRequest() {}
    public TokenRequest(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

}
