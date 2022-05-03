package com.example.server.services;

import com.example.server.keys.HorseInRaceId;
import com.example.server.models.Horse;
import com.example.server.models.HorseInRace;
import com.example.server.models.Race;
import com.example.server.repositories.HorseInRaceRepository;
import com.example.server.repositories.HorseRepository;
import com.example.server.repositories.RaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class HorseInRaceService {
    private final HorseInRaceRepository horseInRaceRepository;
    private final HorseRepository horseRepository;
    private final RaceRepository raceRepository;

    @Autowired
    public HorseInRaceService(HorseInRaceRepository horseInRaceRepository, HorseRepository horseRepository, RaceRepository raceRepository) {
        this.horseInRaceRepository = horseInRaceRepository;
        this.horseRepository = horseRepository;
        this.raceRepository = raceRepository;
    }

    public List<HorseInRace> getAllHorsesInRaces() {
        return horseInRaceRepository.findAll();
    }

    public void addHorseInRace(HorseInRaceId horseInRaceId) {
        Optional<HorseInRace> horseInRace = horseInRaceRepository.findById(horseInRaceId);
        Optional<Horse> horse = horseRepository.findById(horseInRaceId.getHorseId());
        Optional<Race> race = raceRepository.findById(horseInRaceId.getRaceId());
        if (horse.isEmpty()) {
            throw new IllegalStateException("The horse with id (" +
                    horseInRaceId.getHorseId() + ") is not in the database");
        }
        if (race.isEmpty()) {
            throw new IllegalStateException("The race with id (" +
                    horseInRaceId.getRaceId() + ") is not in the database");
        }
        if (horseInRace.isPresent()) {
            throw new IllegalStateException(
                    "The 'horse in race' field with id (" +
                            horseInRaceId.getHorseId() + "," +
                            horseInRaceId.getRaceId() + ") is already in the database"
            );
        }
        horseInRaceRepository.save(new HorseInRace(
                new HorseInRaceId(horseInRaceId.getHorseId(), horseInRaceId.getRaceId()),
                horse.get(),
                race.get())
        );
    }

    @Transactional
    public void addPosition(Long horseId, Long raceId, Integer placement) {
        var horseInRace = horseInRaceRepository.findById(new HorseInRaceId(horseId, raceId))
                .orElseThrow(() -> new IllegalStateException(
                        "Inserted relation: (horseId: " + horseId + ", raceId: " + raceId + ") does not exist"));
        if (placement != null && placement > 0) {
            horseInRace.setPosition(placement);
        }
    }
}
