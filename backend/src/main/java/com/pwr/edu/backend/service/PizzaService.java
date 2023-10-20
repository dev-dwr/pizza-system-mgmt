//package com.pwr.edu.backend.service;
//
//import com.pwr.edu.backend.domain.dto.PizzaDto;
//import com.pwr.edu.backend.domain.pizza.Pizza;
//import com.pwr.edu.backend.repository.PizzaRepository;
//import lombok.AllArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import com.pwr.edu.backend.exceptions.NotFoundException;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//@AllArgsConstructor
//public class PizzaService {
//    private final PizzaRepository pizzaRepository;
//
//    @Transactional
//    public Pizza createPizza(Pizza pizza) {
//        PriceCalculator priceCalculator = new PriceCalculator(new SwitchCalculationStrategy());
//
//        Pizza createdPizza = new Pizza(pizza.getName(), pizza.getDough(), pizza.getSauce(),
//                pizza.getSize(), pizza.getIngredientsList());
//
//        pizzaRepository.save(createdPizza);
//
//        Pizza neededPizzaForPriceUpdate = pizzaRepository.findPizzaByName(createdPizza.getName())
//                .orElseThrow(NotFoundException::new);
//
//        int price = priceCalculator.calculatePrice(createdPizza);
//
//        pizzaRepository.updatePizzaPrice(price, neededPizzaForPriceUpdate.getId());
//
//
//        return neededPizzaForPriceUpdate;
//
//    }
//
//    public List<PizzaDto> findAllPizza() {
//        return pizzaRepository.findAll().stream()
//                .map(mapper::pizzaToPizzaDto)
//                .collect(Collectors.toList());
//    }
//
//    public PizzaDto findPizzaById(Long id) {
//        Pizza wantedPizza = pizzaRepository.findById(id)
//                .orElseThrow(NotFoundException::new);
//
//        return mapper.pizzaToPizzaDto(wantedPizza);
//    }
//
//    public void deletePizzaById(Long id) {
//        pizzaRepository.deleteById(id);
//    }
//}
