package com.example.server.keys;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class BetId implements Serializable {
    @Column (name = "player_id")
    private Long playerId;

    @Column (name = "horse_in_race_id")
    private HorseInRaceId horseInRaceId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BetId betId = (BetId) o;
        return Objects.equals(playerId, betId.playerId) && Objects.equals(horseInRaceId, betId.horseInRaceId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(playerId, horseInRaceId);
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public BetId() {
    }

    @JsonBackReference(value = "horse-in-race-bet")
    public HorseInRaceId getHorseInRaceId() {
        return horseInRaceId;
    }

    public void setHorseInRaceId(HorseInRaceId horseInRaceId) {
        this.horseInRaceId = horseInRaceId;
    }

    public BetId(Long playerId, HorseInRaceId horseInRaceId) {
        this.playerId = playerId;
        this.horseInRaceId = horseInRaceId;
    }
}
