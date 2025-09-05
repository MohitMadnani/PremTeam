package com.pt.premier_team.player;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class PlayerService {
    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayers() {
        return playerRepository.findAll();
    }

    public List<Player> getPlayersByTeam(String teamName) {
        return playerRepository.findAll().stream()
                .filter(player -> teamName.equals(player.getTeam()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByName(String playerName) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getPlayerName().toLowerCase().contains(playerName.toLowerCase()))
                .collect(Collectors.toList());

    }

    public List<Player> getPlayersByPos(String pos) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getPos().toLowerCase().contains(pos.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByNation(String nation) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getNation().toLowerCase().contains(nation.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Player> getPlayersByTeamAndPos(String team, String pos) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getTeam().equals(team) && player.getPos().equals(pos))
                .collect(Collectors.toList());
    }

    public Player addPlayer(Player player) {
        playerRepository.save(player);
        return player;
    }

    public Player updatePlayer(Player newPlayer) {
        Optional<Player> existPlayer = playerRepository.findByPlayerName(newPlayer.getPlayerName());

        if (existPlayer.isPresent()) {
            Player playerUpdate = existPlayer.get();
            playerUpdate.setPlayerName(newPlayer.getPlayerName());
            playerUpdate.setNation(newPlayer.getNation());
            playerUpdate.setPos(newPlayer.getPos());
            playerUpdate.setTeam(newPlayer.getTeam());

            playerRepository.save(playerUpdate);
            return playerUpdate;
        }
        return null;
    }

    @Transactional
    public void deletePlayer(String playerName) {
        playerRepository.deleteByPlayerName(playerName);
    }

}
