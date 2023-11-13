package com.pwr.edu.backend.service.calculation;


import com.pwr.edu.backend.domain.pizza.Size;


public class SwitchCalculationStrategy {

    public PizzaPriceCalculator switchStrategy(Size size) {
        return switch (size) {
            case SMALL -> new SmallPizzaCalculator();
            case MEDIUM -> new MediumPizzaCalculator();
            case LARGE -> new LargePizzaCalculator();
            case MEGA_LARGE -> new MegaLargePizzaCalculator();
            default -> throw new IllegalStateException("Unknown pizza size= " + size);
        };
    }
}
