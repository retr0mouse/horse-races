package com.example.server.player;

import com.example.server.role.Role;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity (name = "Player")
@Table (
        name = "player",
        uniqueConstraints = {
                @UniqueConstraint(name="username_unique", columnNames = "username"),
                @UniqueConstraint(name="email_unique", columnNames = "email")
        })
public class Player {
    @Id
    @SequenceGenerator (
            name = "player_sequence",
            sequenceName = "player_sequence",
            allocationSize = 1
    )
    @GeneratedValue (
            strategy = GenerationType.AUTO,
            generator = "player_sequence"
    )
    @Column (
            name = "id",
            updatable = false,
            nullable = false
    )
    private Long id;

    @Column (
            name = "username",
            nullable = false
    )
    private String username;

    @Column (
            name = "firstname",
            nullable = false
    )
    private String firstname;

    @Column (
            name = "lastname",
            nullable = false
    )
    private String lastname;

    @Column (
            name = "email",
            nullable = false
    )
    private String email;

    @Column (
            name = "password",
            nullable = false
    )
    private String password;

    @Column (
            name = "balance",
            nullable = false
    )
    private double balance;

    @Column (
            name = "winnings"
    )
    private int winnings;

    @ManyToMany (fetch = FetchType.EAGER)   // with lazy type authorization didn't work
    @JoinTable (
            name = "player_to_role",
            joinColumns = @JoinColumn(name = "player_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id",
            foreignKey = @ForeignKey(name = "player_id_fk"))
    )
    private Set<Role> roles = new HashSet<>();

    public Player() {
    }

    public Player(String username, String firstname, String lastname, String email, String password, double balance) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.balance = balance;
    }

    public Player(Long id, String username, String firstname, String lastname, String email, String password, double balance, int winnings) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.balance = balance;
        this.winnings = winnings;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public int getWinnings() {
        return winnings;
    }

    public void setWinnings(int winnings) {
        this.winnings = winnings;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
