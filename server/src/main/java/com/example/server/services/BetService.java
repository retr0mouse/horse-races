package com.example.server.services;

import com.example.server.keys.BetId;
import com.example.server.keys.HorseInRaceId;
import com.example.server.models.*;
import com.example.server.repositories.BetRepository;
import com.example.server.repositories.HorseInRaceRepository;
import com.example.server.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class BetService {
    private final BetRepository betRepository;
    private final PlayerRepository playerRepository;
    private final HorseInRaceRepository horseInRaceRepository;

    @Autowired
    public BetService(BetRepository betRepository, PlayerRepository playerRepository, HorseInRaceRepository horseInRaceRepository) {
        this.betRepository = betRepository;
        this.playerRepository = playerRepository;
        this.horseInRaceRepository = horseInRaceRepository;
    }

    public List<Bet> getAllBets() {
        return betRepository.findAll();
    }


    @Transactional
    public void addBet(BetId betId, String amount) {
        Optional<Bet> bet = betRepository.findById(betId);
        Optional<HorseInRace> horseInRace = horseInRaceRepository.findById(betId.getHorseInRaceId());
        Optional<Player> player = playerRepository.findById(betId.getPlayerId());
        if (horseInRace.isEmpty()) {
            throw new IllegalStateException("The horse with id (" +
                    betId.getHorseInRaceId().getHorseId() + ") does not participate in race with id (" +
                    betId.getHorseInRaceId().getRaceId() + ")");
        }
        if (player.isEmpty()) {
            throw new IllegalStateException("The player with id (" +
                    betId.getPlayerId() + ") is not in the database");
        }
        if (bet.isPresent()) {
            throw new IllegalStateException(
                    "The player with id (" +
                            betId.getPlayerId() + ") already betted for field (race: " +
                            betId.getHorseInRaceId().getRaceId() + ", horse: " +
                            betId.getHorseInRaceId().getHorseId() +
                            ")"
            );
        }
        try {
            var newAmount = Float.parseFloat(amount);
            player.get().setBalance(player.get().getBalance() - newAmount);
            betRepository.save(new Bet(betId, horseInRace.get(), player.get(), newAmount));
        } catch (RuntimeException e) {
            throw new RuntimeException("Problem occurred: " + e);
        }
    }
}
