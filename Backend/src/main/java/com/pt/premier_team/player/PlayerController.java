package com.pt.premier_team.player;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/player")
public class PlayerController {

    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public List<Player> getPlayers(@RequestParam(required = false) String team,
                                   @RequestParam(required = false) String nation,
                                   @RequestParam(required = false) String position,
                                   @RequestParam(required = false) String name) {
        return playerService.findPlayers(team, nation, position, name);
    }

    @GetMapping("/teams")
    public List<TeamInfo> getTeams() {
        return playerService.getAllTeams();
    }

    @GetMapping("/nations")
    public List<NationInfo> getNations() {
        return playerService.getAllNations();
    }

    @GetMapping("/positions")
    public List<String> getPositions() {
        return playerService.getAllPositions();
    }
}
