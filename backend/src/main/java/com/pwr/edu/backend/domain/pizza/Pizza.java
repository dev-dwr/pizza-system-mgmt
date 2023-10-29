package com.pwr.edu.backend.domain.pizza;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pwr.edu.backend.domain.security.AppUser;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Pizza {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pizza_generator")
    @SequenceGenerator(name = "pizza_generator", sequenceName = "pizza_seq", allocationSize = 1)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Dough dough;
    @Enumerated(EnumType.STRING)
    private Sauce sauce;
    @Enumerated(EnumType.STRING)
    private Size size;

    @Enumerated(EnumType.STRING)
    private Status currentStatus = Status.INIT;

    @Enumerated(EnumType.STRING)
    @ElementCollection(targetClass = Ingredients.class)
    private List<Ingredients> ingredientsList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "app_user")
    @ApiModelProperty(hidden = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private AppUser user;


    private int price;

    public Pizza(String name, Dough dough, Sauce sauce, Size size, List<Ingredients> ingredientsList) {
        this.name = name;
        this.dough = dough;
        this.sauce = sauce;
        this.size = size;
        this.ingredientsList = ingredientsList;
    }

    public static PizzaBuilder builder(){
        return new PizzaBuilder();
    }


}
