package com.pwr.edu.backend.domain.pizza;

public enum Status {
    INIT("Odebraliśmy twoje zamówienie"),
    START("Zaczęliśmy robić twoje zamówienie"),
    FINISH("Skończyliśmy twoje zamówienie"),
    ;

    private final String description;

    Status(String description) {
        this.description = description;
    }
}
