package com.pwr.edu.backend.repository;

import com.pwr.edu.backend.domain.pizza.Bucket;
import com.pwr.edu.backend.domain.pizza.Delivery;
import com.pwr.edu.backend.domain.pizza.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Bucket, Long> {
    @Query("SELECT o FROM Bucket o WHERE o.email = ?1")
    Optional<Bucket> findBucketByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE Bucket o SET o.currentStatus = ?1, o.delivery = ?2, o.price = ?3 WHERE o.id = ?4")
    void updateOrderStatus(Status status, Delivery delivery, int price,  Long id);
}