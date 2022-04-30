package com.example.server.repositories;

import com.example.server.models.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    Optional<Player> findPlayerByUsername(String username);
    Optional<Player> findPlayerByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
