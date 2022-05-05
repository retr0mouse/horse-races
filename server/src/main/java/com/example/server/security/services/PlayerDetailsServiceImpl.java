package com.example.server.security.services;

import com.example.server.models.Player;
import com.example.server.repositories.PlayerRepository;
import com.example.server.security.services.PlayerDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class PlayerDetailsServiceImpl implements UserDetailsService {
    @Autowired
    PlayerRepository playerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Player player = playerRepository.findPlayerByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Player with username (" + username + ") is not found"));
        return PlayerDetailsImpl.build(player);
    }

    public UserDetails loadUserById(Long id) throws UsernameNotFoundException {
        Player player = playerRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Player with id (" + id + ") is not found"));
        return PlayerDetailsImpl.build(player);
    }
}
