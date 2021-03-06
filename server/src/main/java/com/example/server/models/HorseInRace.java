package com.example.server.models;

import com.example.server.keys.HorseInRaceId;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @Column (
            name = "position",
            nullable = false
    )
    private Integer position;

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public HorseInRaceId getId() {
        return id;
    }

    @OneToMany (
            mappedBy = "horseInRace",
            cascade = CascadeType.ALL
    )
    private List<Bet> bets = new ArrayList<>();

    public void addBet(Bet bet) {
        if (!bets.contains(bet)) {
            bets.add(bet);
        }
    }

    public void removeBet(Bet bet) {
        bets.remove(bet);
    }

    public List<Bet> getBets() {
        return bets;
    }

    public void setBets(List<Bet> bets) {
        this.bets = bets;
    }

    public void setId(HorseInRaceId id) {
        this.id = id;
    }

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

    public HorseInRace(HorseInRaceId id, Horse horse, Race race, Integer position) {
        this.id = id;
        this.horse = horse;
        this.race = race;
        this.position = position;
    }

    @Override
    public String toString() {
        return "HorseInRace{" +
                "id=" + id +
                ", horse=" + horse +
                ", race=" + race +
                ", position=" + position +
                ", bets=" + bets +
                '}';
    }
}
