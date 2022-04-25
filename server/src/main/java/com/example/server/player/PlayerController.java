package com.example.server.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/player")
public class PlayerController {
    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("get")
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @GetMapping(value = "get", params = "id")
    public Player getPlayerById(@RequestParam Long id) {
        return playerService.getPlayerById(id);
    }

    @PostMapping("add")
    public void addPlayer(@RequestBody Player player) {
        playerService.addPlayer(player);
    }
}
