package com.pt.premier_team.player;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, String> {
    void deleteByPlayerName(String playerName);
    Optional<Player> findByPlayerName(String playerName);
}


