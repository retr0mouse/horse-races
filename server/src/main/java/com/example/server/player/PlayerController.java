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

//    @GetMapping(value = "get", params = {"username", "password"})
//    public Token getPlayerByUsernameAndPassword(@RequestParam String username, @RequestParam String password) {
//        var player = playerService.getPlayerByUsernameAndPassword(username, password);
//        if (player != null) {
//            return Generator.generateToken(10, player.getId());
//        }
//        throw new IllegalStateException("Credentials are wrong");
//    }
//
//    @PostMapping("login")
//    public Player login(@RequestParam("username") String username, @RequestParam("password") String password) {
//        var player = playerService.getPlayerByUsernameAndPassword(username, password);
//        if (player != null) {
//            String token = Generator.generateToken(username);
//        }
//        else {
//            throw new IllegalStateException("Credentials are wrong");
//        }
//        return player;
//    }

//    @PostMapping("add")
//    public void addPlayer(@RequestBody Player player) {
//        playerService.addPlayer(player);
//    }

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
