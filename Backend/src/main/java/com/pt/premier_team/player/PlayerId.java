package com.pt.premier_team.player;

import java.io.Serializable;
import java.util.Objects;

public class PlayerId implements Serializable {
    
    private String playerName;
    private String team;

    public PlayerId() {}

    public PlayerId(String playerName, String team) {
        this.playerName = playerName;
        this.team = team;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlayerId playerId = (PlayerId) o;
        return Objects.equals(playerName, playerId.playerName) && Objects.equals(team, playerId.team);
    }

    @Override
    public int hashCode() {
        return Objects.hash(playerName, team);
    }
}
