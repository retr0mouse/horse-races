package com.example.server.services;

import com.example.server.models.Horse;
import com.example.server.repositories.HorseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class HorseService {
    private final HorseRepository horseRepository;

    @Autowired
    public HorseService(HorseRepository horseRepository) {
        this.horseRepository = horseRepository;
    }

    public List<Horse> getAllHorses() {
        return horseRepository.findAll();
    }

    public Horse getHorseById(Long id) {
        return horseRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "Horse with id (" + id + ") does not exist"
                ));
    }

    public void addHorse(Horse horse) {
        if (horseRepository.findByColorAndName(horse.getColor(), horse.getName()).isPresent()) {
            throw new IllegalStateException(
                    "Horse with same name and color already exists");
        }
        horseRepository.save(horse);
    }

    public void deleteHorse(Long id) {
        var horse = horseRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "Horse with id (" + id + ") does not exist"
                ));
        horseRepository.delete(horse);
    }

    @Transactional
    public void updateHorse(Long id, String name, String color) {
        var horse = horseRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException(
                        "Horse with id (" + id + ") does not exist"
                ));
        if (horseRepository.findByColorAndName(color, name).isPresent()) {
            throw new IllegalStateException(
                    "Horse with same name and color already exists");
        }
        if (name != null && name.length() > 0 && !Objects.equals(horse.getName(), name)) {
            horse.setName(name);
        }
        if (color != null && color.length() > 0 && !Objects.equals(horse.getColor(), color)) {
            horse.setColor(color);
        }
    }
}
