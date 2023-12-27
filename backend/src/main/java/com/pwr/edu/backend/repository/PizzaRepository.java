package com.pwr.edu.backend.repository;

import com.pwr.edu.backend.domain.pizza.Dough;
import com.pwr.edu.backend.domain.pizza.Pizza;
import com.pwr.edu.backend.domain.pizza.Sauce;
import com.pwr.edu.backend.domain.pizza.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface PizzaRepository extends JpaRepository<Pizza, Long> {
    @Query("""
                SELECT p FROM Pizza p WHERE p.name = :name and p.dough = :dough and p.size = :size and p.sauce = :sauce 
            """)
    List<Pizza> findPizzaByName(String name, Dough dough, Size size, Sauce sauce);

    @Query("SELECT p FROM Pizza p WHERE p.user.email = :email")
    List<Pizza> findPizzasByUserEmail(@Param("email") String email);

    @Query("SELECT p FROM Pizza p WHERE p.price = 0")
    List<Pizza> findPizzaWithZeroPrice();

    List<Pizza> findAll();


    @Transactional
    @Modifying
    @Query("UPDATE Pizza p " + "SET p.price = ?1 " + "WHERE p.id = ?2")
    void updatePizzaPrice(int price, Long id);

    @Transactional
    @Modifying
    @Query("UPDATE Pizza p " + "SET p.price = ?1 " + "WHERE p.id = ?2")
    void updatePizzaQuantity(int quantity, Long id);
}
