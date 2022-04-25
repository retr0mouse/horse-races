package com.example.server.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Player getPlayerById(Long id) {
        return playerRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "Player with id (" + id + ") does not exist"
                ));
    }

    public void addPlayer(Player player) {
        var playerOptional = playerRepository.findPlayerByUsername(player.getUsername());
        if (playerOptional.isPresent()) {
            throw new IllegalStateException("This username is already in use");
        }
        playerOptional = playerRepository.findPlayerByEmail(player.getEmail());
        if (playerOptional.isPresent()) {
            throw new IllegalStateException("This email is already in use");
        }
        playerRepository.save(player);
    }
}
