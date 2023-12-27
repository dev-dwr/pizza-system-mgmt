package com.pwr.edu.backend.repository;

import com.pwr.edu.backend.domain.pizza.Bucket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Optional;

public interface BucketRepository extends JpaRepository<Bucket, Long> {
    @Query("SELECT o FROM Bucket o WHERE o.email = ?1")
    Optional<Bucket> findBucketByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE Bucket o SET o.price = ?1 WHERE o.id = ?2")
    void updatePrice(int price,  Long id);
}