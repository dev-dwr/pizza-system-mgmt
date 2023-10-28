package com.pwr.edu.backend.domain.dto;

import com.pwr.edu.backend.domain.pizza.Dough;
import com.pwr.edu.backend.domain.pizza.Ingredients;
import com.pwr.edu.backend.domain.pizza.Sauce;
import com.pwr.edu.backend.domain.pizza.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class PizzaDto {
    private Long id;
    private String name;
    private Dough dough;
    private Sauce sauce;
    private Size size;
    private int price;
    private List<Ingredients> ingredientsList;
}