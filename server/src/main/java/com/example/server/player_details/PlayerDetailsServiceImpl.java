package com.example.server.player_details;

import com.example.server.player.Player;
import com.example.server.player.PlayerRepository;
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
}
