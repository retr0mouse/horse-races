package com.example.server.controllers;

import com.example.server.models.Horse;
import com.example.server.repositories.HorseRepository;
import com.example.server.services.HorseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/horse")
public class HorseController {
    private final HorseService horseService;

    @Autowired
    public HorseController(HorseService horseService) {
        this.horseService = horseService;
    }

    @GetMapping("get")
    public List<Horse> getAllHorses() {
        return horseService.getAllHorses();
    }

    @GetMapping(value = "get", params = "id")
    public Horse getHorseById(@RequestParam Long id) {
        return horseService.getHorseById(id);
    }

    @PostMapping("add")
    public void addHorse(@RequestBody Horse horse) {
        horseService.addHorse(horse);
    }

    @DeleteMapping(path = "{id}")
    public void deleteHorse(@PathVariable("id") Long id) {
        horseService.deleteHorse(id);
    }

    @PutMapping(path = "{id}")
    public void updateHorse(@PathVariable("id") Long id,
                            @RequestParam(required = false) String name,
                            @RequestParam(required = false) String color) {
        horseService.updateHorse(id, name, color);
    }
}
