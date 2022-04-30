package com.example.server.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table (name = "horse")
@Entity(name = "Horse")
public class Horse {
    @SequenceGenerator(
            name = "horse_sequence",
            sequenceName = "horse_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.IDENTITY,
            generator = "horse_sequence"
    )
    @Id
    private Long id;

    @Column (
            name = "name",
            nullable = false
    )
    private String name;

    @Column (
            name = "color",
            nullable = false
    )
    private String color;

    @ManyToMany(
            mappedBy = "horses"
    )
    private List<Race> races = new ArrayList<>();

    @JsonBackReference
    public List<Race> getRaces() {
        return races;
    }

    public void setRaces(List<Race> races) {
        this.races = races;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Horse() {
    }

    public Horse(String name, String color) {
        this.name = name;
        this.color = color;
    }

    public Horse(Long id, String name, String color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}
