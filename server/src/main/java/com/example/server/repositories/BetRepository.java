package com.example.server.repositories;

import com.example.server.keys.BetId;
import com.example.server.models.Bet;
import org.hibernate.metamodel.model.convert.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BetRepository extends JpaRepository<Bet, BetId> {
}
