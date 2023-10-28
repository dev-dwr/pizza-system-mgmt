package com.pwr.edu.backend.service.calculation;


import com.pwr.edu.backend.domain.pizza.Pizza;

public interface PizzaPriceCalculator {
    int calculate(Pizza pizza);
}
