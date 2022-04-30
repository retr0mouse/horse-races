package com.example.server.controllers;

import com.example.server.models.Race;
import com.example.server.services.RaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/race")
public class RaceController {
    private final RaceService raceService;

    @Autowired
    public RaceController(RaceService raceService) {
        this.raceService = raceService;
    }

    @GetMapping("get")
    public List<Race> getAllRaces() {
        return raceService.getAllRaces();
    }

    @GetMapping(value = "get", params = "id")
    public Race getRaceById(@RequestParam Long id) {
        return raceService.getRaceById(id);
    }

    @PostMapping(value = "add", params = "creator")
    public void addRace(@RequestBody Race race, @RequestParam String creator) {
        raceService.addRace(race, creator);
    }

    @DeleteMapping(path = "{id}")
    public void deleteRace(@PathVariable("id") Long id) {
        raceService.deleteRace(id);
    }

    @PutMapping(path = "{id}")
    public void updateRace(@PathVariable("id") Long id,
                           @RequestParam(required = false) String date,
                           @RequestParam(required = false) String place) {
        raceService.updateRace(id, date, place);
    }

    @PostMapping(path = "addHorse/{horseId}/{raceId}")
    public void addHorseToRace(@PathVariable("horseId") Long horseId, @PathVariable("raceId") Long raceId) {
        raceService.addHorseToRace(horseId, raceId);
    }
}
