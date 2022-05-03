package com.example.server.models;

import com.example.server.keys.HorseInRaceId;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity (name = "HorseInRace")
@Table (name = "horse_in_race")
public class HorseInRace {
    @EmbeddedId
    private HorseInRaceId id;

    @ManyToOne
    @MapsId("horseId")
    @JoinColumn(name = "horse_id")
    private Horse horse;

    @ManyToOne
    @MapsId("raceId")
    @JoinColumn(name = "race_id")
    private Race race;

    public HorseInRaceId getId() {
        return id;
    }

    public void setId(HorseInRaceId id) {
        this.id = id;
    }

    @JsonBackReference(value = "horse-horseInRace")
    public Horse getHorse() {
        return horse;
    }

    public void setHorse(Horse horse) {
        this.horse = horse;
    }

    @JsonBackReference(value = "race-horseInRace")
    public Race getRace() {
        return race;
    }

    public void setRace(Race race) {
        this.race = race;
    }

    public HorseInRace() {
    }

    public HorseInRace(Horse horse, Race race) {
        this.horse = horse;
        this.race = race;
    }

    public HorseInRace(HorseInRaceId id, Horse horse, Race race) {
        this.id = id;
        this.horse = horse;
        this.race = race;
    }
}
