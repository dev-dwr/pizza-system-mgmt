package com.pwr.edu.backend.service.calculation;


import com.pwr.edu.backend.domain.pizza.Dough;
import com.pwr.edu.backend.domain.pizza.Pizza;

public class MegaLargePizzaCalculator implements PizzaPriceCalculator{
    @Override
    public int calculate(Pizza pizza) {

        int price;

        if (pizza.getIngredientsList().size() <= 2) {
            price = 40;
        } else {
            price = 50;
        }
        if (pizza.getDough() == Dough.POLISH) {
            price += 10;
        }
        return price;
    }
}
