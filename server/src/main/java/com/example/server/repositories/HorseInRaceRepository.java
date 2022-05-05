package com.example.server.repositories;

import com.example.server.keys.HorseInRaceId;
import com.example.server.models.HorseInRace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HorseInRaceRepository extends JpaRepository<HorseInRace, HorseInRaceId> {
}
