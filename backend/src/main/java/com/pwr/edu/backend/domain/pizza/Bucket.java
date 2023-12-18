package com.pwr.edu.backend.domain.pizza;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Bucket {

    public Bucket(String email) {
        this.email = email;
    }

    @Id
    @ApiModelProperty(hidden = true)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bucket_generator")
    @SequenceGenerator(name = "bucket_generator", sequenceName = "bucket_seq", allocationSize = 1)
    private Long id;

    @Column(name = "email")
    private String email;


    @OneToMany(mappedBy = "bucket", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Pizza> pizza = new ArrayList<>();


    @Enumerated(EnumType.STRING)
    private Status currentStatus = Status.INIT;

    @Enumerated(EnumType.STRING)
    private Delivery delivery = Delivery.ON_PIZZA_PLACE;

    private int price = 0;

    public void addPizza(Pizza pizza) {
        pizza.setBucket(this);
        this.pizza.add(pizza);
    }
}