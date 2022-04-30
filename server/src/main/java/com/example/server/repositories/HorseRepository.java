package com.example.server.repositories;

import com.example.server.models.Horse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HorseRepository extends JpaRepository<Horse, Long> {
    Optional<Horse> findByColorAndName(String color, String name);
}
