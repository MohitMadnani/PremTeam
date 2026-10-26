package com.pt.premier_team.player;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    /** Applies the first non-blank filter, in the order team, nation, position, name; no filter returns everyone. */
    public List<Player> findPlayers(String team, String nation, String position, String name) {
        if (hasText(team)) return playerRepository.findByTeam(team);
        if (hasText(nation)) return playerRepository.findByNationIgnoreCase(nation);
        if (hasText(position)) return playerRepository.findByPosIgnoreCase(position);
        if (hasText(name)) return playerRepository.findByNameContainingIgnoreCase(name);
        return playerRepository.findAll();
    }

    public List<TeamInfo> getAllTeams() {
        return playerRepository.findAllTeams();
    }

    public List<NationInfo> getAllNations() {
        return playerRepository.findAllNations();
    }

    public List<String> getAllPositions() {
        return playerRepository.findAllPositions();
    }

    private static boolean hasText(String s) {
        return s != null && !s.isBlank();
    }
}
