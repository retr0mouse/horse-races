package com.example.server.models;

import com.example.server.keys.BetId;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity (name = "Bet")
@Table(name = "bet")
public class Bet {
    @EmbeddedId
    private BetId id;

    @ManyToOne
    @MapsId ("horseInRaceId")
    @JoinColumns({
            @JoinColumn(name = "horse_id", referencedColumnName= "horse_id"),
            @JoinColumn(name ="race_id", referencedColumnName = "race_id")
    })
    private HorseInRace horseInRace;

    @ManyToOne
    @MapsId ("playerId")
    @JoinColumn (name = "player_id")
    private Player player;

    @Column (
            name = "amount",
            nullable = false
    )
    private float amount;

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public BetId getId() {
        return id;
    }

    public void setId(BetId id) {
        this.id = id;
    }

    @JsonBackReference (value = "horse-in-race-bet")
    public HorseInRace getHorseInRace() {
        return horseInRace;
    }

    @JsonBackReference (value = "player-bet")
    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Bet() {
    }

    public void setHorseInRace(HorseInRace horseInRace) {
        this.horseInRace = horseInRace;
    }

    public Bet(HorseInRace horseInRace, Player player, float amount) {
        this.horseInRace = horseInRace;
        this.player = player;
        this.amount = amount;
    }

    public Bet(BetId id, HorseInRace horseInRace, Player player, float amount) {
        this.id = id;
        this.horseInRace = horseInRace;
        this.player = player;
        this.amount = amount;
    }
}
