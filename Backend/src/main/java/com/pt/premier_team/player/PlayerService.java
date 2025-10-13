package com.pt.premier_team.player;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
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
        return playerRepository.findByTeam(teamName);
    }

    public List<Player> getPlayersByName(String playerName) {
        return playerRepository.findByPlayerNameContainingIgnoreCase(playerName);
    }

    public List<Player> getPlayersByPos(String pos) {
        return playerRepository.findByPositionContaining(pos);
    }

    public List<Player> getPlayersByNation(String nation) {
        return playerRepository.findByNation(nation);
    }

    public List<Player> getPlayersByTeamAndPos(String team, String pos) {
        return playerRepository.findByTeamAndPositionContaining(team, pos);
    }

    public List<String> getAllTeams() {
        return playerRepository.findAllTeams();
    }

    public List<String> getAllPositions() {
        return playerRepository.findAllPositions();
    }

    public Player addPlayer(Player player) {
        return playerRepository.save(player);
    }

    public Player updatePlayer(String playerName, String team, Player newPlayer) {
        PlayerId playerId = new PlayerId(playerName, team);
        Optional<Player> existingPlayer = playerRepository.findById(playerId);

        if (existingPlayer.isPresent()) {
            Player playerUpdate = existingPlayer.get();
            playerUpdate.setNation(newPlayer.getNation());
            playerUpdate.setPos(newPlayer.getPos());
            playerUpdate.setAge(newPlayer.getAge());
            playerUpdate.setMp(newPlayer.getMp());
            playerUpdate.setStarts(newPlayer.getStarts());
            playerUpdate.setMin(newPlayer.getMin());
            playerUpdate.setGls(newPlayer.getGls());
            playerUpdate.setAst(newPlayer.getAst());
            playerUpdate.setPk(newPlayer.getPk());
            playerUpdate.setCrdy(newPlayer.getCrdy());
            playerUpdate.setCrdr(newPlayer.getCrdr());
            playerUpdate.setXg(newPlayer.getXg());
            playerUpdate.setXag(newPlayer.getXag());

            return playerRepository.save(playerUpdate);
        }
        return null;
    }

    @Transactional
    public void deletePlayer(String playerName, String team) {
        PlayerId playerId = new PlayerId(playerName, team);
        playerRepository.deleteById(playerId);
    }

    public Optional<Player> getPlayerByNameAndTeam(String playerName, String team) {
        PlayerId playerId = new PlayerId(playerName, team);
        return playerRepository.findById(playerId);
    }

    public long getTotalPlayerCount() {
        return playerRepository.count();
    }
}
