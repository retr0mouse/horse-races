package com.example.server.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

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

    public Player getPlayerByUsernameAndPassword(String username, String password) {
        return playerRepository.findPlayerByUsernameAndPassword(username, password)
                .orElseThrow(() -> new IllegalStateException(
                        "Credentials are wrong"
                ));
    }

    public void addPlayer(Player player) {
        var playerOptional = playerRepository.findPlayerByUsername(player.getUsername());
        if (playerOptional.isPresent()) {
            throw new IllegalStateException("Username " + player.getUsername() + " is already in use");
        }
        playerOptional = playerRepository.findPlayerByEmail(player.getEmail());
        if (playerOptional.isPresent()) {
            throw new IllegalStateException("Email " + player.getEmail() + " is already in use");
        }
        playerRepository.save(player);
    }

    public void deletePlayer(Long id) {
        playerRepository.findById(id).orElseThrow(() -> new IllegalStateException(
                "Player with id (" + id + ") does not exist"
        ));
        playerRepository.deleteById(id);
    }

    public void updatePlayer(Long id, String username, String firstname, String lastname, String email, String password, Double balance, Integer winnings) {
        var player = playerRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Player with id (" + id + ") does not exist"));
        if (username != null && username.length() > 0 && !Objects.equals(username, player.getUsername())) {
            if (playerRepository.findPlayerByUsername(username).isPresent()) {
                throw new IllegalStateException("Username " + username + " is already in use");
            }
            player.setUsername(username);
        }
        if (firstname != null && firstname.length() > 0 && !Objects.equals(firstname, player.getFirstname())) {
            player.setFirstname(firstname);
        }
        if (lastname != null && lastname.length() > 0 && !Objects.equals(lastname, player.getLastname())) {
            player.setLastname(lastname);
        }
        if (email != null && email.length() > 0 && !Objects.equals(email, player.getEmail())) {
            if (playerRepository.findPlayerByEmail(email).isPresent()) {
                throw new IllegalStateException("Email " + email + " is already in use");
            }
             player.setEmail(email);
        }
        if (password != null && password.length() > 0 && !Objects.equals(password, player.getPassword())) {
            player.setPassword(password);
        }
        if (balance != null && balance != player.getBalance()) {
            player.setBalance(balance);
        }
        if (winnings != null && winnings != player.getWinnings()) {
            player.setWinnings(winnings);
        }
        playerRepository.save(player);
    }
}
