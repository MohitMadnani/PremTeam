package com.pt.premier_team.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/player")
public class PlayerController   {
    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public List<Player> getPlayers (
            @RequestParam(required = false) String team,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String nation,
            @RequestParam(required = false) String pos) {

        if (team != null && pos != null) {
            return playerService.getPlayersByTeam(team);
        } else if (name != null) {
            return playerService.getPlayersByName(name);
        } else if (nation != null) {
            return playerService.getPlayersByNation(nation);
        } else if (pos != null) {
            return playerService.getPlayersByPos(pos);
        } else if (team != null) {
            return playerService.getPlayersByTeam(team);
        } else {
            return playerService.getPlayers();
        }
    }

    @PostMapping
    public ResponseEntity<Player> addPlayer(@RequestBody Player player) {
        Player createdNewPlayer = playerService.addPlayer(player);
        return new ResponseEntity<>(createdNewPlayer, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Player> updatePlayer(@RequestBody Player player) {
        Player newPlayer = playerService.updatePlayer(player);

        if (newPlayer != null) {
            return new ResponseEntity<>(newPlayer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/{playerName}")
    public ResponseEntity<Player> deletePlayer(@PathVariable String playerName) {
        playerService.deletePlayer(playerName);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
