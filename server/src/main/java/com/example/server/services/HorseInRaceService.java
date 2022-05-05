package com.example.server.services;

import com.example.server.keys.HorseInRaceId;
import com.example.server.models.*;
import com.example.server.repositories.HorseInRaceRepository;
import com.example.server.repositories.HorseRepository;
import com.example.server.repositories.RaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
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
                race.get(),
                0)
        );
    }

    @Transactional
    public void addPosition(Long horseId, Long raceId, Integer placement) {
        System.out.println(placement);
        var horseInRace = horseInRaceRepository.findById(new HorseInRaceId(horseId, raceId))
                .orElseThrow(() -> new IllegalStateException(
                        "Inserted relation: (horseId: " + horseId + ", raceId: " + raceId + ") does not exist"));
        if (placement != null && placement > 0) {
            horseInRace.setPosition(placement);
            if (placement == 1) {
                payThePlayers(horseInRace);
            }
        }
        else {
            horseInRace.setPosition(0);
        }
    }

    @Transactional
    public void payThePlayers(HorseInRace horseInRace) {
        var raceId = horseInRace.getRace().getId();
        var horse = horseInRace.getHorse();
        var allBiddersCount = raceRepository.getById(raceId).getHorseInRaces().size();
        var rightBidders = horseInRace.getBets().stream().map(Bet::getPlayer).toList();
        float coefficient = 1 / ((float) rightBidders.size() / (float) allBiddersCount);
        for (Player bidder: rightBidders) {
            var balance = bidder.getBalance();
            var bid = bidder.getBets().stream().filter(bet -> Objects.equals(bet.getHorseInRace().getHorse(),horse)).toList();
            bidder.setBalance(balance + bid.get(0).getAmount() * coefficient);
        }
    }
}
