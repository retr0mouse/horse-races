package com.example.server.controllers;

import com.example.server.keys.BetId;
import com.example.server.models.Bet;
import com.example.server.services.BetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api/v1/bet")
public class BetController {
    private final BetService betService;

    @Autowired
    public BetController(BetService betService) {
        this.betService = betService;
    }

    @GetMapping("get")
    public List<Bet> getAllBets() {
        return betService.getAllBets();
    }

    @PostMapping(value = "add", params = "amount")
    public void addBet(@RequestBody BetId betId, @RequestParam String amount) {
        if (!amount.matches("^([+-]?\\d*\\.?\\d*)$")) {
            throw new IllegalStateException("Please provide an amount of float type");
        }
        betService.addBet(betId, amount);
    }
}
