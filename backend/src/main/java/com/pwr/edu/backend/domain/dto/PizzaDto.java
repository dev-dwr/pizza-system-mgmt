package com.pwr.edu.backend.domain.dto;

import com.pwr.edu.backend.domain.pizza.*;
import com.pwr.edu.backend.domain.security.AppUser;
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
    private int quantity;
    private AppUser appUser;
    private List<Ingredients> ingredientsList;
    private String currentStatus;
}