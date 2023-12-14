package com.pwr.edu.backend.domain.pizza;

import com.pwr.edu.backend.domain.security.AppUser;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

//@Entity
//@Getter
//@Setter
//@ToString
//@NoArgsConstructor
//public class Order {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pizza_generator")
//    @SequenceGenerator(name = "pizza_generator", sequenceName = "pizza_seq", allocationSize = 1)
//    private Long id;
//
////    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
////    private List<Pizza> pizza = new ArrayList<>();
//
//
//    @OneToOne(fetch = FetchType.EAGER)
//    private AppUser user;
//
//
//    @Enumerated(EnumType.STRING)
//    private Status currentStatus = Status.INIT;
//
//    @Enumerated(EnumType.STRING)
//    private Delivery delivery = Delivery.ON_PIZZA_PLACE;
//
//    public Order(List<Pizza> pizza, AppUser appUser) {
////        this.pizza = pizza;
//        this.user = appUser;
//    }
//}
