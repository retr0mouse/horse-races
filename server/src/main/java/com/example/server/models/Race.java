package com.example.server.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity (name = "Race")
@Table(name = "race")
public class Race {
    @SequenceGenerator(
            name = "race_sequence",
            sequenceName = "race_sequence",
            allocationSize = 1
    )
    @GeneratedValue (
            strategy = GenerationType.IDENTITY,
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

    @ManyToMany (fetch = FetchType.EAGER)
    @JoinTable (
            name = "horse_in_race",
            joinColumns = @JoinColumn(
                    name = "horse_id",
                    foreignKey = @ForeignKey(name = "horse_id_fk")
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "race_id",
                    foreignKey = @ForeignKey(name = "race_id_fk")
            )
    )
    private Set<Horse> horses = new HashSet<>();

    public void addHorse(Horse horse) {
        if (!this.horses.contains(horse)) {
            this.horses.add(horse);
            horse.getRaces().add(this);
        }
    }

    public void removeHorse(Horse horse) {
        if (!this.horses.contains(horse)) {
            this.horses.remove(horse);
            horse.getRaces().remove(this);
        }
    }

    public Set<Horse> getHorses() {
        return horses;
    }

    public void setHorses(Set<Horse> horses) {
        this.horses = horses;
    }

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
