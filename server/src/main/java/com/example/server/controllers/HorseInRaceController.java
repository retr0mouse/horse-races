package com.example.server.controllers;

import com.example.server.keys.HorseInRaceId;
import com.example.server.models.HorseInRace;
import com.example.server.services.HorseInRaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/horseInRace")
public class HorseInRaceController {
    private final HorseInRaceService horseInRaceService;

    @Autowired
    public HorseInRaceController(HorseInRaceService horseInRaceService) {
        this.horseInRaceService = horseInRaceService;
    }

    @GetMapping("get")
    public List<HorseInRace> getAllHorsesInRaces() {
        return horseInRaceService.getAllHorsesInRaces();
    }

    @PostMapping("add")
    public void addHorseInRace(@RequestBody HorseInRaceId horseInRaceId) {
        horseInRaceService.addHorseInRace(horseInRaceId);
    }

//    @DeleteMapping(path = "{horseId}/{raceId}")
//    public void deleteHorseInRace(@PathVariable("horseId") Long horseId, @PathVariable("raceId") Long raceId) {
//        horseInRaceService.deleteHorseInRace(horseId, raceId);
//    }
}
