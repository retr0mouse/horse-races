package com.example.server.controllers;

import com.example.server.payload.request.LoginRequest;
import com.example.server.payload.request.SignupRequest;
import com.example.server.payload.response.JwtResponse;
import com.example.server.payload.response.MessageResponse;
import com.example.server.models.Player;
import com.example.server.repositories.PlayerRepository;
import com.example.server.security.services.PlayerDetailsImpl;
import com.example.server.enums.ERole;
import com.example.server.models.Role;
import com.example.server.repositories.RoleRepository;
import com.example.server.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticatePlayer(@Valid @RequestBody LoginRequest loginRequest) throws AuthenticationException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        PlayerDetailsImpl userDetails = (PlayerDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles
        ));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (playerRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken"));
        }

        if (playerRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use"));
        }

        // create new user's account
        var player = new Player(
                signUpRequest.getUsername(),
                signUpRequest.getFirstname(),
                signUpRequest.getLastname(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getBalance()
                );

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
//            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
//                    .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
            Optional<Role> userRole = roleRepository.findByName(ERole.ROLE_USER);
            if (userRole.isPresent()) {
                roles.add(userRole.get());
            }
            else {
                var role = new Role(ERole.ROLE_USER);
                roleRepository.save(role);
                roles.add(role);
            }
        }
        else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
//                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
//                                .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
//                        roles.add(adminRole);
                        Optional<Role> userRole = roleRepository.findByName(ERole.ROLE_ADMIN);
                        if (userRole.isPresent()) {
                            roles.add(userRole.get());
                        }
                        else {
                            var roleAdmin = new Role(ERole.ROLE_ADMIN);
                            roleRepository.save(roleAdmin);
                            roles.add(roleAdmin);
                        }
                        break;
                    case "mod":
//                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
//                                .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
//                        roles.add(modRole);
                        Optional<Role> userRole1 = roleRepository.findByName(ERole.ROLE_MODERATOR);
                        if (userRole1.isPresent()) {
                            roles.add(userRole1.get());
                        }
                        else {
                            var roleModerator = new Role(ERole.ROLE_MODERATOR);
                            roleRepository.save(roleModerator);
                            roles.add(roleModerator);
                        }
                        break;
                    default:
//                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
//                                .orElseThrow(() -> new RuntimeException("Error: Role is not found"));
//                        roles.add(userRole);
                        Optional<Role> userRole2 = roleRepository.findByName(ERole.ROLE_USER);
                        if (userRole2.isPresent()) {
                            roles.add(userRole2.get());
                        }
                        else {
                            var roleAdmin = new Role(ERole.ROLE_USER);
                            roleRepository.save(roleAdmin);
                            roles.add(roleAdmin);
                        }
                }
            });
        }

        player.setRoles(roles);
        playerRepository.save(player);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
