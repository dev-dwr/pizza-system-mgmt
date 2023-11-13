package com.pwr.edu.backend.repository;

import com.pwr.edu.backend.domain.pizza.Pizza;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface PizzaRepository extends JpaRepository<Pizza, Long> {
    Optional<Pizza> findPizzaByName(String name);

    @Query("SELECT p FROM Pizza p WHERE p.user.email = :email")
    List<Pizza> findPizzasByUserEmail(@Param("email") String email);

    List<Pizza> findAll();

    @Transactional
    @Modifying
    @Query("UPDATE Pizza p " + "SET p.price = ?1 " + "WHERE p.id = ?2")
    void updatePizzaPrice(int price, Long id);
}
