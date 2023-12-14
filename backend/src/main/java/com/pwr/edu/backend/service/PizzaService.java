package com.pwr.edu.backend.service;

import com.pwr.edu.backend.domain.dto.PizzaDto;
import com.pwr.edu.backend.domain.pizza.Pizza;
import com.pwr.edu.backend.domain.pizza.Status;
import com.pwr.edu.backend.domain.security.AppUser;
import com.pwr.edu.backend.domain.security.AppUserRole;
import com.pwr.edu.backend.domain.security.ConfirmationToken;
import com.pwr.edu.backend.email.EmailSender;
import com.pwr.edu.backend.repository.PizzaRepository;
import com.pwr.edu.backend.repository.security.ConfirmationTokenRepository;
import com.pwr.edu.backend.service.calculation.PriceCalculator;
import com.pwr.edu.backend.service.calculation.SwitchCalculationStrategy;
import com.pwr.edu.backend.util.EmailBuilder;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.pwr.edu.backend.exceptions.NotFoundException;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PizzaService {
    private final PizzaRepository pizzaRepository;
    private final ConfirmationTokenRepository confirmationTokenRepository;

//    private final OrderRepository orderRepository;

    private final EmailBuilder emailBuilder;
    private final EmailSender emailSender;

    @Transactional
    public Pizza createPizza(Pizza pizza, String jwt) {
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(jwt).orElseThrow(NotFoundException::new);
        pizza.setUser(confirmationToken.getAppUser());
        pizzaRepository.save(pizza);
//        Pizza pizzaById = pizzaRepository.findById(pizza.getId()).get();
//        orderRepository.save(new Order(List.of(pizzaById), confirmationToken.getAppUser()));
        return pizza;
    }

    public List<PizzaDto> findAllPizza() {
        return pizzaRepository.findAll().stream()
                .map(this::pizzaToPizzaDto)
                .collect(Collectors.toList());
    }

    public Pizza findPizzaById(Long id) {
        return pizzaRepository.findById(id)
                .orElseThrow(NotFoundException::new);
    }

    public List<PizzaDto> findUsersAllPizzas(String jwt) {
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(jwt).orElseThrow(NotFoundException::new);

        return pizzaRepository.findPizzasByUserEmail(confirmationToken.getAppUser().getEmail())
                .stream().map(this::pizzaToPizzaDto).collect(Collectors.toList());

    }

    public void deletePizzaById(Long id, String jwt) {
        Pizza pizza = pizzaRepository.findById(id).orElseThrow(NotFoundException::new);
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(jwt).orElseThrow(NotFoundException::new);

        if (Objects.equals(confirmationToken.getAppUser().getAppUserRole(), AppUserRole.EMPLOYEE) ||
                Objects.equals(pizza.getUser().getEmail(), confirmationToken.getAppUser().getEmail())) {
            pizzaRepository.deleteById(id);
        } else {
            throw new IllegalStateException("You cannot delete not your own pizza");
        }
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

//    public void changePizzaStatus(Long id, Pizza pizza) {
//        Pizza wantedPizza = pizzaRepository.findById(id)
//                .orElseThrow(NotFoundException::new);
//        wantedPizza.setCurrentStatus(pizza.getCurrentStatus());
//        pizzaRepository.save(wantedPizza);
//
//        emailSender.send(
//                wantedPizza.getUser().getEmail(),
//                emailBuilder.changedStatusEmail(pizza.getCurrentStatus())
//        );
//
//    }

    public AppUser getCurrentUser(String jwt) {
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(jwt).orElseThrow(NotFoundException::new);
        return confirmationToken.getAppUser();
    }

    public int getCurrentPizzaPrice(List<Pizza> pizza) {
        PriceCalculator priceCalculator = new PriceCalculator(new SwitchCalculationStrategy());
        AtomicInteger sum = new AtomicInteger();
        pizza.forEach(el -> sum.addAndGet(priceCalculator.calculatePrice(el)));
        return sum.get();
    }

//    public void updateOrder(Order order, String jwt) {
//        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(jwt).orElseThrow(NotFoundException::new);
//        Order orderByUserEmail = pizzaRepository.findOrderByUserEmail(confirmationToken.getAppUser().getEmail());
//        orderRepository.updateOrderStatus(order.getCurrentStatus(), order.getDelivery(), Collections.emptyList(), orderByUserEmail.getId());
//    }
//
//    public Order getUserOrder(String jwt) {
//        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(jwt).orElseThrow(NotFoundException::new);
//        return pizzaRepository.findOrderByUserEmail(confirmationToken.getAppUser().getEmail());
//    }
}
