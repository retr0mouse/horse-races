package com.example.server.services;

import com.example.server.models.Race;
import com.example.server.repositories.PlayerRepository;
import com.example.server.repositories.RaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RaceService {
    private final RaceRepository raceRepository;
    private final PlayerRepository playerRepository;

    @Autowired
    public RaceService(RaceRepository raceRepository, PlayerRepository playerRepository) {
        this.raceRepository = raceRepository;
        this.playerRepository = playerRepository;
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
}
