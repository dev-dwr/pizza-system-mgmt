package com.pwr.edu.backend.service;

import com.pwr.edu.backend.domain.dto.PizzaDto;
import com.pwr.edu.backend.domain.pizza.Pizza;
import com.pwr.edu.backend.domain.security.ConfirmationToken;
import com.pwr.edu.backend.repository.PizzaRepository;
import com.pwr.edu.backend.repository.security.ConfirmationTokenRepository;
import com.pwr.edu.backend.service.calculation.PriceCalculator;
import com.pwr.edu.backend.service.calculation.SwitchCalculationStrategy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.pwr.edu.backend.exceptions.NotFoundException;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PizzaService {
    private final PizzaRepository pizzaRepository;
    private final ConfirmationTokenRepository confirmationTokenRepository;

    @Transactional
    public Pizza createPizza(Pizza pizza, String jwt) {
        PriceCalculator priceCalculator = new PriceCalculator(new SwitchCalculationStrategy());

        int price = priceCalculator.calculatePrice(pizza);
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(jwt).orElseThrow(NotFoundException::new);
        pizza.setUser(confirmationToken.getAppUser());
        pizzaRepository.save(pizza);
        pizzaRepository.updatePizzaPrice(price, pizza.getId());
        return pizza;

    }

    public List<PizzaDto> findAllPizza() {
        return pizzaRepository.findAll().stream()
                .map(this::pizzaToPizzaDto)
                .collect(Collectors.toList());
    }

    public PizzaDto findPizzaById(Long id) {
        Pizza wantedPizza = pizzaRepository.findById(id)
                .orElseThrow(NotFoundException::new);

        return pizzaToPizzaDto(wantedPizza);
    }

    public List<PizzaDto> findUsersAllPizzas(String jwt) {
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(jwt).orElseThrow(NotFoundException::new);

        return pizzaRepository.findPizzasByUserEmail(confirmationToken.getAppUser().getEmail())
                .stream().map(this::pizzaToPizzaDto).collect(Collectors.toList());

    }

    private PizzaDto pizzaToPizzaDto(Pizza pizza) {
        return PizzaDto.builder()
                .appUser(pizza.getUser())
                .dough(pizza.getDough())
                .size(pizza.getSize())
                .sauce(pizza.getSauce())
                .ingredientsList(pizza.getIngredientsList())
                .name(pizza.getName())
                .price(pizza.getPrice())
                .id(pizza.getId())
                .build();
    }

    public void deletePizzaById(Long id, String jwt) {
        Pizza pizza = pizzaRepository.findById(id).orElseThrow(NotFoundException::new);
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(jwt).orElseThrow(NotFoundException::new);
        if (Objects.equals(pizza.getUser().getEmail(), confirmationToken.getAppUser().getEmail())) {
            pizzaRepository.deleteById(id);
        } else {
            throw new IllegalStateException("You cannot delete not your own pizza");
        }
    }
}
