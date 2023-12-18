package com.pwr.edu.backend.bootstrap;

import com.pwr.edu.backend.repository.OrderRepository;
import com.pwr.edu.backend.repository.PizzaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class PizzaBootstrap implements ApplicationListener<ContextRefreshedEvent> {
    private final PizzaRepository pizzaRepository;
    private final OrderRepository orderRepository;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
//        var pizza1 = Pizza.builder()
//                .withDough("ITALIAN")
//                .withName("first pizza example")
//                .withSauce("TOMATO")
//                .withSize("LARGE")
//                .withIngredients(List.of(Ingredients.valueOf("HAM"), Ingredients.valueOf("BACON")))
//                .build();
//        pizzaRepository.save(pizza1);
//        var pizza2 = Pizza.builder()
//                .withDough("ITALIAN")
//                .withName("second pizza example")
//                .withSauce("TOMATO")
//                .withSize("LARGE")
//                .withIngredients(List.of(Ingredients.valueOf("HAM"), Ingredients.valueOf("BACON")))
//                .build();
//        pizzaRepository.save(pizza2);
//        var pizza3 = Pizza.builder()
//                .withDough("ITALIAN")
//                .withName("third pizza example")
//                .withSauce("TOMATO")
//                .withSize("LARGE")
//                .withIngredients(List.of(Ingredients.valueOf("HAM"), Ingredients.valueOf("BACON")))
//                .build();
//        pizzaRepository.save(pizza3);
    }
}
