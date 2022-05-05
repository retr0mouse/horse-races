package com.example.server.keys;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class HorseInRaceId implements Serializable {
    @Column (name = "horse_id")
    private Long horseId;

    @Column(name = "race_id")
    private Long raceId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HorseInRaceId that = (HorseInRaceId) o;
        return Objects.equals(horseId, that.horseId) && Objects.equals(raceId, that.raceId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(horseId, raceId);
    }

    public Long getHorseId() {
        return horseId;
    }

    public void setHorseId(Long horseId) {
        this.horseId = horseId;
    }

    public Long getRaceId() {
        return raceId;
    }

    public void setRaceId(Long raceId) {
        this.raceId = raceId;
    }

    public HorseInRaceId() {
    }

    public HorseInRaceId(Long horseId, Long raceId) {
        this.horseId = horseId;
        this.raceId = raceId;
    }
}
