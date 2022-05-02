package com.example.server.controllers;

import com.example.server.models.Player;
import com.example.server.security.services.PlayerDetailsServiceImpl;
import com.example.server.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/player")
public class PlayerController {
    private final PlayerService playerService;
    private final PlayerDetailsServiceImpl playerDetailsService;

    @Autowired
    public PlayerController(PlayerService playerService, PlayerDetailsServiceImpl playerDetailsService) {
        this.playerService = playerService;
        this.playerDetailsService = playerDetailsService;
    }

    @GetMapping("get")
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @GetMapping(value = "get", params = "id")
    public UserDetails getPlayerById(@RequestParam Long id) {
        return playerDetailsService.loadUserById(id);
    }

    @GetMapping(value = "getByJwt")
    public UserDetails getUsernameFromJwt() {
        return (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @GetMapping(value = "get", params = "username")
    public UserDetails getPlayerByUsername(@RequestParam String username) {
        return playerDetailsService.loadUserByUsername(username);
    }

    @DeleteMapping(path = "{id}")
    public void deletePlayer(@PathVariable("id") Long id) {
        playerService.deletePlayer(id);
    }

    @PutMapping(path = "{id}")
    public void updatePlayer(@PathVariable("id") Long id,
                             @RequestParam(required = false) String username,
                             @RequestParam(required = false) String firstname,
                             @RequestParam(required = false) String lastname,
                             @RequestParam(required = false) String email,
                             @RequestParam(required = false) String password,
                             @RequestParam(required = false) Double balance,
                             @RequestParam(required = false) Integer winnings) {
        playerService.updatePlayer(id, username, firstname, lastname, email, password, balance, winnings);
    }
}
