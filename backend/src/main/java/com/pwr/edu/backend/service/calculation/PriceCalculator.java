package com.pwr.edu.backend.service.calculation;


import com.pwr.edu.backend.domain.pizza.Pizza;
import com.pwr.edu.backend.domain.pizza.Size;
import com.pwr.edu.backend.service.calculation.decorator.LoggingDecorator;

public class PriceCalculator {
    private final SwitchCalculationStrategy switchCalculationStrategy;

    public PriceCalculator(SwitchCalculationStrategy switchCalculationStrategy) {
        this.switchCalculationStrategy = switchCalculationStrategy;
    }

    public int calculatePrice(Pizza pizza) {
        Size size = pizza.getSize();

        PizzaPriceCalculator pizzaPriceCalculator = obtainDecorator(size);

        return pizzaPriceCalculator.calculate(pizza);
    }


    private PizzaPriceCalculator obtainDecorator(Size size) {
        return new LoggingDecorator(switchCalculationStrategy.switchStrategy(size));
    }
}
