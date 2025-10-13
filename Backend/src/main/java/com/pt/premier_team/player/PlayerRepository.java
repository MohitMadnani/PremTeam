package com.pt.premier_team.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, PlayerId> {

    List<Player> findByTeam(String team);

    @Query("SELECT p FROM Player p WHERE p.pos LIKE %:position%")
    List<Player> findByPositionContaining(@Param("position") String position);

    @Query("SELECT p FROM Player p WHERE LOWER(p.playerName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Player> findByPlayerNameContainingIgnoreCase(@Param("name") String name);

    List<Player> findByNation(String nation);

    @Query("SELECT p FROM Player p WHERE p.team = :team AND p.pos LIKE %:position%")
    List<Player> findByTeamAndPositionContaining(@Param("team") String team, @Param("position") String position);

    @Query("SELECT DISTINCT p.team FROM Player p ORDER BY p.team")
    List<String> findAllTeams();

    @Query("SELECT DISTINCT p.pos FROM Player p ORDER BY p.pos")
    List<String> findAllPositions();

    @Query("SELECT p FROM Player p WHERE p.playerName = :playerName")
    List<Player> findAllByPlayerName(@Param("playerName") String playerName);

    @Query("SELECT p FROM Player p WHERE p.gls >= :minGoals ORDER BY p.gls DESC")
    List<Player> findTopScorers(@Param("minGoals") Integer minGoals);

    @Query("SELECT p FROM Player p WHERE p.ast >= :minAssists ORDER BY p.ast DESC")
    List<Player> findTopAssisters(@Param("minAssists") Integer minAssists);
}


