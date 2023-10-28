package com.pwr.edu.backend.controller;

import com.pwr.edu.backend.domain.dto.PizzaDto;
import com.pwr.edu.backend.domain.pizza.Pizza;
import com.pwr.edu.backend.service.PizzaService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("api/v1")
public class PizzaController {
    private final PizzaService pizzaService;

    @PostMapping("/pizza/create")
    public Pizza createPizza(@RequestBody Pizza pizza){
        return pizzaService.createPizza(pizza);
    }

    @GetMapping("/pizza/all")
    public List<PizzaDto> getAllPizzas(){
        return pizzaService.findAllPizza();
    }

    @GetMapping("/pizza/{id}")
    public PizzaDto getPizzaById(@PathVariable Long id){
        return pizzaService.findPizzaById(id);
    }

    @DeleteMapping("/pizza/delete/{id}")
    public void deletePizzaById(@PathVariable Long id){
        pizzaService.deletePizzaById(id);
    }
}
