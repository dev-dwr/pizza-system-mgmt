package com.pwr.edu.backend.service.calculation;


import com.pwr.edu.backend.domain.pizza.Pizza;

public class SmallPizzaCalculator implements PizzaPriceCalculator{
    public int calculate(Pizza pizza){
        int price;
        if(pizza.getIngredientsList().size() <= 2){
            price = 18;
        }else{
            price = 22;
        }
        return price;
    }
}
