package com.pwr.edu.backend.service.calculation;


import com.pwr.edu.backend.domain.pizza.Dough;
import com.pwr.edu.backend.domain.pizza.Ingredients;
import com.pwr.edu.backend.domain.pizza.Pizza;

import static com.pwr.edu.backend.util.PriceCalculatorUtil.getMeatIngredientPercentage;

public class LargePizzaCalculator implements PizzaPriceCalculator {
    @Override
    public int calculate(Pizza pizza) {
        int price;

        if (pizza.getIngredientsList().size() <= 3) {
            if (getMeatIngredientPercentage(pizza.getIngredientsList()) < 40) {
                price = 30;
            } else {
                price = 35;
            }
        } else {
            if (pizza.getIngredientsList().contains(Ingredients.PINEAPPLE)) {
                price = 37;
            } else {
                price = 40;
            }
        }
        if (pizza.getDough() == Dough.POLISH) {
            price += 5;
        }
        return price;
    }
}

