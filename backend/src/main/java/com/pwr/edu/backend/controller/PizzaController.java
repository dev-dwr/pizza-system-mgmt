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
    public Pizza createPizza(@RequestBody Pizza pizza, @RequestHeader("Authorization") String bearerToken) {
        String jwt = getJwt(bearerToken);
        return pizzaService.createPizza(pizza, jwt);
    }

    @GetMapping("/pizza/all")
    public List<PizzaDto> getAllPizzas() {
        return pizzaService.findAllPizza();
    }

    @GetMapping("/pizza/{id}")
    public PizzaDto getPizzaById(@PathVariable Long id) {
        return pizzaService.findPizzaById(id);
    }

    @GetMapping("/pizza/own")
    public List<PizzaDto> getUsersAllPizzas(@RequestHeader("Authorization") String bearerToken) {
        return pizzaService.findUsersAllPizzas(getJwt(bearerToken));
    }

    @DeleteMapping("/pizza/delete/{id}")
    public void deletePizzaById(@PathVariable Long id, @RequestHeader("Authorization") String bearerToken) {
        String jwt = getJwt(bearerToken);
        pizzaService.deletePizzaById(id, jwt);
    }

    private String getJwt(String bearerToken) {
        String jwt = null;
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            jwt = bearerToken.substring(7);
        } else {
            throw new IllegalStateException("You have to be login");
        }
        return jwt;
    }
}
