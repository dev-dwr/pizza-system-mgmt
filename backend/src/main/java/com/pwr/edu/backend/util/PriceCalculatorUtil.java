package com.pwr.edu.backend.util;

import com.pwr.edu.backend.domain.pizza.Ingredients;

import java.util.List;

public class PriceCalculatorUtil {
    public static double getMeatIngredientPercentage(List<Ingredients> ingredients){
        long count = ingredients.stream()
                .filter(Ingredients::isMeat)
                .count();
        return ((double) count / ingredients.size()) * 100;
    }
}
