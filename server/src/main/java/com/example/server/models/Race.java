package com.example.server.models;

import javax.persistence.*;
import java.time.LocalDate;

@Entity (name = "Race")
@Table(name = "race")
public class Race {
    @SequenceGenerator(
            name = "race_sequence",
            sequenceName = "race_sequence",
            allocationSize = 1
    )
    @GeneratedValue (
            strategy = GenerationType.AUTO,
            generator = "race_sequence"
    )
    @Id
    private Long id;

    @Column (
            name = "date",
            nullable = false
    )
    private LocalDate date;

    @Column (
            name = "place"
    )
    private String place;


    @ManyToOne
    @JoinColumn(
            name = "player_id",
            nullable = false,
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "player_id_fk")
    )
    private Player creator;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public Player getCreator() {
        return creator;
    }

    public void setCreator(Player creator) {
        this.creator = creator;
    }

    public Race() {
    }

    public Race(LocalDate date, String place, Player creator) {
        this.date = date;
        this.place = place;
        this.creator = creator;
    }

    public Race(Long id, LocalDate date, String place, Player creator) {
        this.id = id;
        this.date = date;
        this.place = place;
        this.creator = creator;
    }
}
