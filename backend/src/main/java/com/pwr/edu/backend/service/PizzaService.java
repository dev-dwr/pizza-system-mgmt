package com.pwr.edu.backend.service;

import com.pwr.edu.backend.domain.dto.PizzaDto;
import com.pwr.edu.backend.domain.pizza.Bucket;
import com.pwr.edu.backend.domain.pizza.Delivery;
import com.pwr.edu.backend.domain.pizza.Pizza;
import com.pwr.edu.backend.domain.security.AppUser;
import com.pwr.edu.backend.domain.security.AppUserRole;
import com.pwr.edu.backend.domain.security.ConfirmationToken;
import com.pwr.edu.backend.email.EmailSender;
import com.pwr.edu.backend.repository.OrderRepository;
import com.pwr.edu.backend.repository.PizzaRepository;
import com.pwr.edu.backend.repository.security.ConfirmationTokenRepository;
import com.pwr.edu.backend.service.calculation.PriceCalculator;
import com.pwr.edu.backend.service.calculation.SwitchCalculationStrategy;
import com.pwr.edu.backend.util.EmailBuilder;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.pwr.edu.backend.exceptions.NotFoundException;

import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

//TODO update order and (change bucket status)
//TODO usuwanie pizzy z bucketa

@Service
@AllArgsConstructor
public class PizzaService {
    private final PizzaRepository pizzaRepository;
    private final ConfirmationTokenRepository confirmationTokenRepository;
    private final OrderRepository bucketRepository;

    private final EmailBuilder emailBuilder;
    private final EmailSender emailSender;

    @Transactional
    public Pizza createPizza(Pizza pizza, String jwt) {
        PriceCalculator priceCalculator = new PriceCalculator(new SwitchCalculationStrategy());
        int price = priceCalculator.calculatePrice(pizza);

        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(jwt).orElseThrow(NotFoundException::new);
        pizza.setUser(confirmationToken.getAppUser());

        Bucket bucketByEmail = bucketRepository.findBucketByEmail(confirmationToken.getAppUser().getEmail()).orElse(null);
        if (bucketByEmail == null) {
            bucketByEmail = new Bucket(confirmationToken.getAppUser().getEmail());
        }
        bucketByEmail.addPizza(pizza);
        bucketByEmail.setPrice(price);
        pizza.setBucket(bucketByEmail);

        bucketRepository.save(bucketByEmail);
        pizzaRepository.save(pizza);
        pizzaRepository.updatePizzaPrice(price, pizza.getId());

        List<Pizza> pizzaWithZeroPrice = pizzaRepository.findPizzaWithZeroPrice();
        pizzaWithZeroPrice.forEach(el -> pizzaRepository.deleteById(el.getId()));

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

    public void changeBucketStatus(Long id, Bucket recBucket) {
        Bucket bucket = bucketRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        bucket.setCurrentStatus(recBucket.getCurrentStatus());
        bucketRepository.save(bucket);

        emailSender.send(
                bucket.getEmail(),
                emailBuilder.changedStatusEmail(recBucket.getCurrentStatus())
        );

    }

    public AppUser getCurrentUser(String jwt) {
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(jwt).orElseThrow(NotFoundException::new);
        return confirmationToken.getAppUser();
    }

    @Transactional
    public Bucket updateOrder(Bucket order, String jwt) {
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(jwt).orElseThrow(NotFoundException::new);
        Bucket bucket = bucketRepository.findBucketByEmail(confirmationToken.getAppUser().getEmail()).orElse(null);
        assert bucket != null;
        Bucket newBuck = null;
        if (order.getDelivery() == Delivery.ON_YOUR_HOME) {
            int price = getCurrentPizzaPrice(bucket.getPizza()) + 15;
            bucket.setPrice(price);
            bucket.setDelivery(order.getDelivery());
            newBuck = bucketRepository.save(bucket);
        }
        if (order.getDelivery() == Delivery.ON_PIZZA_PLACE) {
            int price = getCurrentPizzaPrice(bucket.getPizza()) - 15;
            bucket.setDelivery(order.getDelivery());
            bucket.setPrice(price);
            newBuck = bucketRepository.save(bucket);
        }
        
        return newBuck;
    }

    @Transactional
    public Bucket getUserOrder(String jwt) {
        ConfirmationToken confirmationToken = confirmationTokenRepository.findByToken(jwt).orElseThrow(NotFoundException::new);
        List<Pizza> pizzasByUserEmail = pizzaRepository.findPizzasByUserEmail(confirmationToken.getAppUser().getEmail());
        Integer currentPizzaPrice = getCurrentPizzaPrice(pizzasByUserEmail);
        Bucket bucket = bucketRepository.findBucketByEmail(confirmationToken.getAppUser().getEmail()).orElse(null);
        bucket.setPrice(currentPizzaPrice.intValue());
        bucketRepository.save(bucket);
        return bucket;
    }

    public Integer getCurrentPizzaPrice(List<Pizza> pizza) {
        PriceCalculator priceCalculator = new PriceCalculator(new SwitchCalculationStrategy());
        AtomicInteger sum = new AtomicInteger();
        pizza.forEach(el -> sum.addAndGet(priceCalculator.calculatePrice(el)));
        return sum.get();
    }

}
