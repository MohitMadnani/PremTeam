package com.pt.premier_team.player;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.Immutable;

/** One row of the {@code player_stats} view: a player's stats for the latest loaded season. */
@Entity
@Immutable
@Table(name = "player_stats")
public class Player {
    @Id
    private String id;
    private String name;
    private String nation;
    private String pos;
    private Integer age;
    private Integer mp;
    private Integer starts;
    private Integer min;
    private Integer gls;
    private Integer ast;
    private Integer pensMissed;
    private Integer crdy;
    private Integer crdr;
    private Double xg;
    private Double xag;
    private String team;
    private Integer teamCode;
    private String season;

    protected Player() {
    }

    public Player(String id, String name, String nation, String pos, Integer age, Integer mp, Integer starts, Integer min, Integer gls, Integer ast, Integer pensMissed, Integer crdy, Integer crdr, Double xg, Double xag, String team, Integer teamCode, String season) {
        this.id = id;
        this.name = name;
        this.nation = nation;
        this.pos = pos;
        this.age = age;
        this.mp = mp;
        this.starts = starts;
        this.min = min;
        this.gls = gls;
        this.ast = ast;
        this.pensMissed = pensMissed;
        this.crdy = crdy;
        this.crdr = crdr;
        this.xg = xg;
        this.xag = xag;
        this.team = team;
        this.teamCode = teamCode;
        this.season = season;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getNation() {
        return nation;
    }

    public String getPos() {
        return pos;
    }

    public Integer getAge() {
        return age;
    }

    public Integer getMp() {
        return mp;
    }

    public Integer getStarts() {
        return starts;
    }

    public Integer getMin() {
        return min;
    }

    public Integer getGls() {
        return gls;
    }

    public Integer getAst() {
        return ast;
    }

    public Integer getPensMissed() {
        return pensMissed;
    }

    public Integer getCrdy() {
        return crdy;
    }

    public Integer getCrdr() {
        return crdr;
    }

    public Double getXg() {
        return xg;
    }

    public Double getXag() {
        return xag;
    }

    public String getTeam() {
        return team;
    }

    public Integer getTeamCode() {
        return teamCode;
    }

    public String getSeason() {
        return season;
    }
}
