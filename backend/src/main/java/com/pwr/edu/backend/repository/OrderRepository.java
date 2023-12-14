//package com.pwr.edu.backend.repository;
//
//import com.pwr.edu.backend.domain.pizza.Delivery;
//import com.pwr.edu.backend.domain.pizza.Order;
//import com.pwr.edu.backend.domain.pizza.Pizza;
//import com.pwr.edu.backend.domain.pizza.Status;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//public interface OrderRepository extends JpaRepository<Pizza, Long> {
//    @Transactional
//    @Modifying
//    @Query("UPDATE Order o " + "SET o.currentStatus = ?1, o.delivery = ?2, o.pizza = ?3" + "WHERE o.id = ?4")
//    void updateOrderStatus(Status status, Delivery delivery, List<Pizza> pizza, Long id);
//}
