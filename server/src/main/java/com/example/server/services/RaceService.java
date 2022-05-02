package com.example.server.services;

import com.example.server.models.Horse;
import com.example.server.models.Race;
import com.example.server.repositories.HorseRepository;
import com.example.server.repositories.PlayerRepository;
import com.example.server.repositories.RaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class RaceService {
    private final RaceRepository raceRepository;
    private final PlayerRepository playerRepository;
    private final HorseRepository horseRepository;

    @Autowired
    public RaceService(RaceRepository raceRepository, PlayerRepository playerRepository, HorseRepository horseRepository) {
        this.raceRepository = raceRepository;
        this.playerRepository = playerRepository;
        this.horseRepository = horseRepository;
    }

    public List<Race> getAllRaces() {
        return raceRepository.findAll();
    }

    public Race getRaceById(Long id) {
        return raceRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "Race with id (" + id + ") does not exist"
                ));
    }

    public void addRace(Race race, String username) {
        var creator = playerRepository.findPlayerByUsername(username)
                .orElseThrow(() -> new IllegalStateException(
                        "Player with username (" + username + ") does not exist"
                ));
        creator.addRace(race);
        playerRepository.save(creator);
    }

    public void deleteRace(Long id) {
        var race = raceRepository.findById(id).orElseThrow(() -> new IllegalStateException(
                "Race with id (" + id + ") does not exist"
        ));
        raceRepository.delete(race);
    }

    @Transactional
    public void updateRace(Long id, String date, String place) {
        var race = raceRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "Race with id (" + id + ") does not exist"
                ));
        if (date != null && date.length() > 0 && !Objects.equals(date, race.getDate().toString())) {
            race.setDate(LocalDate.parse(date));
        }
        if (place != null && place.length() > 0 && !Objects.equals(race.getPlace(), place)) {
            race.setPlace(place);
        }
    }

    @Transactional
    public void addHorseToRace(Long horseId, Long raceId) {
        var horse = horseRepository.findById(horseId)
                .orElseThrow(() -> new IllegalStateException(
                        "Horse with id (" + horseId + ") does not exist"
                ));
        var race = raceRepository.findById(raceId).orElseThrow(() -> new IllegalStateException(
                "Race with id (" + raceId + ") does not exist"
        ));
        if (race.getHorses().contains(horse)) {
            throw new IllegalStateException(
                    "This horse in race relation does already exist"
            );
        }
        race.addHorse(horse);
    }

    public List<Race> getRacesByCreatorId(Long creatorId) {
        var player = playerRepository.findById(creatorId)
                .orElseThrow(() -> new IllegalStateException(
                        "Player with id (" + creatorId + ") does not exist"
                ));
        return player.getRaces();
    }

    public List<Horse> getHorsesByRace(Long raceId) {
        var race = raceRepository.findById(raceId).orElseThrow(() -> new IllegalStateException(
                "Race with id (" + raceId + ") does not exist"
        ));
        return race.getHorses();
    }

    public List<Horse> getAvailableHorses(Long raceId) {
        var race = raceRepository.findById(raceId).orElseThrow(() -> new IllegalStateException(
                "Race with id (" + raceId + ") does not exist"
        ));
        var horses = horseRepository.findAll();
        var horsesNotInRace = new ArrayList<Horse>();
        for (Horse horse: horses) {
            if(!race.getHorses().contains(horse)) {
                horsesNotInRace.add(horse);
            }
        }
        return horsesNotInRace;
    }
}
