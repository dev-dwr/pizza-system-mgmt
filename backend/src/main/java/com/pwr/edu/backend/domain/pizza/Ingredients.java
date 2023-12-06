package com.pwr.edu.backend.domain.pizza;

import lombok.Getter;

@Getter
public enum Ingredients {
    HAM(true),
    BACON(true),
    SALAMI(true),
    MUSHROOMS(false),
    TOMATO(false),
    PINEAPPLE(false),
    CHILI(false),
    ;

    private final boolean meat;

    Ingredients(boolean meat) {
        this.meat = meat;
    }

}
