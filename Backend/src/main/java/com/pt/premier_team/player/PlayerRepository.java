package com.pt.premier_team.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, String> {

    List<Player> findByTeam(String team);

    List<Player> findByNationIgnoreCase(String nation);

    List<Player> findByPosIgnoreCase(String position);

    List<Player> findByNameContainingIgnoreCase(String name);

    @Query("SELECT new com.pt.premier_team.player.TeamInfo(p.team, p.teamCode) FROM Player p GROUP BY p.team, p.teamCode ORDER BY p.team")
    List<TeamInfo> findAllTeams();

    @Query("SELECT new com.pt.premier_team.player.NationInfo(p.nation, COUNT(p)) FROM Player p WHERE p.nation IS NOT NULL GROUP BY p.nation ORDER BY COUNT(p) DESC, p.nation")
    List<NationInfo> findAllNations();

    @Query("SELECT DISTINCT p.pos FROM Player p ORDER BY p.pos")
    List<String> findAllPositions();
}
