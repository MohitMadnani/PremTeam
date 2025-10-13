package com.pt.premier_team.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "https://*.vercel.app"})
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Backend is working! 🚀");
    }

    @GetMapping
    public List<Player> getAllPlayers() {
        return playerService.getPlayers();
    }

    @GetMapping("/team/{teamName}")
    public List<Player> getPlayersByTeam(@PathVariable String teamName) {
        return playerService.getPlayersByTeam(teamName);
    }

    @GetMapping("/position/{position}")
    public List<Player> getPlayersByPosition(@PathVariable String position) {
        return playerService.getPlayersByPos(position);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchPlayersByName(@RequestParam String name) {
        try {
            List<Player> players = playerService.getPlayersByName(name);
            return ResponseEntity.ok(players);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("❌ Search error: " + e.getMessage() + " | Cause: " + e.getCause());
        }
    }

    @GetMapping("/nation/{nation}")
    public List<Player> getPlayersByNation(@PathVariable String nation) {
        return playerService.getPlayersByNation(nation);
    }

    @GetMapping("/teams")
    public List<String> getAllTeams() {
        return playerService.getAllTeams();
    }

    @GetMapping("/positions")
    public List<String> getAllPositions() {
        return playerService.getAllPositions();
    }

    @GetMapping("/team/{team}/position/{position}")
    public List<Player> getPlayersByTeamAndPosition(@PathVariable String team, @PathVariable String position) {
        return playerService.getPlayersByTeamAndPos(team, position);
    }

    @GetMapping("/{playerName}/{team}")
    public ResponseEntity<Player> getPlayerByNameAndTeam(@PathVariable String playerName, @PathVariable String team) {
        Optional<Player> player = playerService.getPlayerByNameAndTeam(playerName, team);
        return player.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        long totalPlayers = playerService.getTotalPlayerCount();
        List<String> teams = playerService.getAllTeams();
        List<String> positions = playerService.getAllPositions();
        
        Map<String, Object> stats = Map.of(
            "totalPlayers", totalPlayers,
            "totalTeams", teams.size(),
            "totalPositions", positions.size(),
            "teams", teams,
            "positions", positions
        );
        
        return ResponseEntity.ok(stats);
    }

    @PostMapping
    public ResponseEntity<Player> addPlayer(@RequestBody Player player) {
        Player savedPlayer = playerService.addPlayer(player);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPlayer);
    }

    @PutMapping("/{playerName}/{team}")
    public ResponseEntity<Player> updatePlayer(@PathVariable String playerName, 
                                             @PathVariable String team, 
                                             @RequestBody Player player) {
        Player updatedPlayer = playerService.updatePlayer(playerName, team, player);
        if (updatedPlayer != null) {
            return ResponseEntity.ok(updatedPlayer);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{playerName}/{team}")
    public ResponseEntity<Void> deletePlayer(@PathVariable String playerName, @PathVariable String team) {
        playerService.deletePlayer(playerName, team);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/debug")
    public ResponseEntity<String> debugDatabase() {
        try {
            // Test basic count first
            long count = playerService.getTotalPlayerCount();
            return ResponseEntity.ok("✅ Database connected! Total players: " + count);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("❌ Database error: " + e.getMessage() + " | Cause: " + e.getCause());
        }
    }
}
